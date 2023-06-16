import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/user';
import { UNAUTHORIZED } from '../utils/errors';
import { AuthRequest } from "../controllers/auth";

export const isAuthenticated = async (req:AuthRequest, res: Response, next: NextFunction) => {
    try {
        console.log('start middleware isAuthenticated', req.url)
        if(req.url === '/auth/signin' || req.url === '/auth/signup'){
            return next();
        }
        const token = req.cookies.token;
        if(!token){
            throw UNAUTHORIZED;
        }
        const payload = verify(token, process.env.TOKEN_SIGN as string) as any;

        console.log('token', token);
        const user = await User.findOne({
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

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
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