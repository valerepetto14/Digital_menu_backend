import {  Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/errors";

const bodyValidate = (schema: any) => (req:Request, Res:Response, next:NextFunction) => {
    try {
        const body = req.body;
        const {error, value} = schema.validate(body);
        if (error){
            throw new errorResponse(error.message, 400);
        }
        req.body = value;
        next();
    } catch (error) {
        next(error);
    }
}

export default bodyValidate;