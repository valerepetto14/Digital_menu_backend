import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import uuid4 from "uuid4";
import jwt from "jsonwebtoken"
import { checkIfUserExists } from "../utils/checks";
import { INCORRECT_CREDENTIALS, USER_ALREADY_EXISTS } from "../utils/errors";
import { extend } from "joi";


export interface AuthRequest extends Request {
    user?: any;
    token?: string;
}


export const signUp = async (req:Request, res:Response, next:NextFunction) => {
    try {
    
        const body = req.body;
        const userExists = await checkIfUserExists(body.email);
        if(!userExists){
            const passHash = await hash(body.password, 10);
            const newUser = await UserModel.create({
                id: uuid4(),
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                phoneNumber: body.phoneNumber,
                type: body.type,
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
        const body = req.body;
        const user = await UserModel.findOne({where: {email: body.email}});
        if(user){
            const passMatch = await compare(body.password, user.password);
            if(passMatch){
                const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                }, process.env.TOKEN_SIGN ? process.env.TOKEN_SIGN : "HOLA" )
                console.log(process.env.TOKEN_SIGN);
                
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

export const signOut = async (req:AuthRequest, res:Response, next:NextFunction) => {
    try {
        const user = req.user;
        if(user){
            res.clearCookie("token").status(200).json({message: "User logged out"});
        }
    } catch (error) {
        next(error);
    }
}
