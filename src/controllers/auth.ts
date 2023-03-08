import { UserModel, User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import { registerSchema, loginSchema } from "../utils/validations/auth";
import uuid4 from "uuid4";
import jwt from "jsonwebtoken"
import { checkIfUserExists } from "../utils/checks";
import { errorResponse } from "../models/errors"
import { INCORRECT_CREDENTIALS, USER_ALREADY_EXISTS } from "../utils/errors";
import { SessionModel } from "../models/session";

export const signUp = async (req:Request, res:Response, next:NextFunction) => {
    try {
        console.log('start signup');
        const {error, value } = registerSchema.validate(req.body);
        if (error){
            throw new errorResponse(error.message, 400);
        }
        const userExists = await checkIfUserExists(value.email);
        if(!userExists){
            const passHash = await hash(value.password, 10);
            const newUser = await UserModel.create({
                id: uuid4(),
                email: value.email,
                firstName: value.firstName,
                lastName: value.lastName,
                phoneNumber: value.phoneNumber,
                type: value.type,
                password: passHash
            })
            return res.status(201).json({message: "User created", user: newUser});
        } else {
            throw USER_ALREADY_EXISTS;
        }
    } catch (error) {
        return next(error);
    }
}

export const signIn = async (req:Request, res:Response, next:NextFunction) => {
    try {
        console.log('start signin');
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            console.log(process.env.TOKEN_SIGN);
            throw new errorResponse(error.message, 400);
        }
        const user = await UserModel.findOne({where: {email: value.email}});
        if(user){
            const passMatch = await compare(value.password, user.password);
            if(passMatch){
                const token = jwt.sign({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                }, process.env.TOKEN_SIGN ? process.env.TOKEN_SIGN : "HOLA" )
                console.log(process.env.TOKEN_SIGN);
                const newSession = await SessionModel.create({
                    id: uuid4(),
                    userId: user.id,
                    token: token,
                    expiration: new Date(Date.now() + 3600000)
                })
                const response = {
                    userId : user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                    token: token
                };
                return res.status(200).cookie("token", token, {httpOnly: true}).json({message: "User logged in", user: response});
            } else {
                throw INCORRECT_CREDENTIALS
            }
        } else {
            throw INCORRECT_CREDENTIALS
        }
    } catch (error) {
        return next(error);
    }
}

export const signOut = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = req.user;
        if(user){
            await SessionModel.destroy({
                where: {
                    userId: user.id
                }
            })
            res.status(200).clearCookie("token").json({message: "User logged out"});
        }
    } catch (error) {
        next(error);
    }
}
