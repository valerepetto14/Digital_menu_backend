import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { USER_NOT_FOUND } from "../utils/errors";
import { AuthRequest } from "./auth";


export const validateUser = async (request:AuthRequest, response:Response, next:NextFunction) => {
    try {
        const user = request.user;
        if(user){
            const userData = await User.findOne({
                where: {
                    email: user.email
                }
            });
            if(userData){
                return response.status(200).json({message: "User found", user: userData});
            }
        }
        throw USER_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const id = request.params.id;
        const user = await User.findByPk(id);
        if(user){
            await user.destroy();
            return response.status(200).json({message: "User deleted"});
        }
        throw USER_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const id = request.params.id;
        const user = await User.findByPk(id);
        if(user){
            const { email, firstName, lastName, phoneNumber, type } = request.body;
            const userUpdated = await user.update({
                email,
                firstName,
                lastName,
                phoneNumber,
                type
            });
            return response.status(200).json({message: "User updated"});
        }
        throw USER_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const users = await User.findAll();
        return response.status(200).json({message: "Users found", users: users});
    } catch (error) {
        next(error);
    }
}