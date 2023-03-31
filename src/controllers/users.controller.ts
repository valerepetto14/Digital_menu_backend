import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/errors";
import { USER_NOT_FOUND } from "../utils/errors";
import { userUpdateSchema } from "../utils/validations/users";

export const validateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = req.user;
        console.log('user', user);
        if(user){
            const userData = await UserModel.findOne({
                where: {
                    email: user.email
                }
            });
            if(userData){
                return res.status(200).json({message: "User found", user: userData});
            }
        }
        throw USER_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByPk(id);
        if(user){
            await user.destroy();
            return res.status(200).json({message: "User deleted"});
        }
        throw USER_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByPk(id);
        if(user){
            const {error, value} = userUpdateSchema.validate(req.body);
            if (error){
                throw new errorResponse(error.message, 400);
            }
            const userUpdated = await user.update({
                email: value.email,
                firstName: value.firstName,
                lastName: value.lastName,
                phoneNumber: value.phoneNumber,
                type: value.type
            });
            return res.status(200).json({message: "User updated"});
        }
        throw USER_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}


export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await UserModel.findAll();
        return res.status(200).json({message: "Users found", users: users});
    } catch (error) {
        next(error);
    }
}