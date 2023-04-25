import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { UNAUTHORIZED } from '../utils/errors';

export const isAuthenticated = async (req:Request, res: Response, next: NextFunction) => {
    try {
        console.log('start middleware isAuthenticated', req.url)
        if(req.url === '/auth/signin' || req.url === '/auth/signup'){
            return next();
        }
        const token = req.cookies.token;
        const payload = verify(token, process.env.TOKEN_SIGN as string) as any;

        console.log('token', token);
        const user = await UserModel.findOne({
            where: {
                email: payload.email
            }
        })
        if(user){
            req.user = user;
            return next();
        }
        throw UNAUTHORIZED;
    } catch (error) {
        next(error);
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user){
            if(user.type === 'admin'){
                next();
            }
        }
        throw UNAUTHORIZED;
    } catch (error) {
        next(error);
    }
}