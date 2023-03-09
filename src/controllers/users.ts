import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/errors";
import { SessionModel } from "../models/session";
import { USER_NOT_FOUND } from "../utils/errors";

export const validateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = req.user;
        if(user){
            const session = await SessionModel.findAll({
                where: {
                    userId: user.id
                },
                include: [UserModel]
            });
            console.log('session', session);
            if(session.length > 0){
                if(new Date(session[0].expiration) > new Date()){
                    return res.status(200).json({message: "User found", user: {
                        id: session[0].user.id,
                        email: session[0].user.email,
                        firstName: session[0].user.firstName,
                        lastName: session[0].user.lastName,
                        type: session[0].user.type,
                        token: session[0].token
                    }});
                }
            }
        }
        throw USER_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}


const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
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


export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await UserModel.findAll();
        return res.status(200).json({message: "Users found", users: users});
    } catch (error) {
        next(error);
    }
}