import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/user';
import { UNAUTHORIZED } from '../utils/errors';
import { AuthRequest } from "../controllers/auth";
import { UserTypes } from '../utils/types/interfaces';

export const isAuthenticated = async (req:AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if(!token){
            throw UNAUTHORIZED;
        }
        const payload = verify(token, process.env.TOKEN_SIGN as string) as any;

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })
        if (!user)
            throw UNAUTHORIZED;

        //check type of user
        if (user.type === UserTypes.ADMIN) {
            res.locals.userAdmin = user; 
        } else {
            res.locals.userEmployee = user;
        }
        next();
    } catch (error) {
        next(error);
    }
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userAdmin = res.locals.userAdmin;
        if (!userAdmin)
            throw UNAUTHORIZED;
        next();
    } catch (error) {
        next(error);
    }
}