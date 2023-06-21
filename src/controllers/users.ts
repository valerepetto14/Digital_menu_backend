import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { USER_NOT_FOUND } from "../utils/errors";
import { AuthRequest } from "./auth";

export const validateUser = async (req:AuthRequest, res:Response, next:NextFunction) => {
    try {
        const user = req.user;
        if(user){
            const userData = await User.findOne({
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
        const user = await User.findByPk(id);
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
        const user = await User.findByPk(id);

        if(user){
            await user.update({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                type: req.body.type
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
        const users = await User.findAll();
        return res.status(200).json({message: "Users found", users: users});
    } catch (error) {
        next(error);
    }
}