import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";

export const validateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        console.log(req);
    } catch (error) {
        next(error);
    }
}