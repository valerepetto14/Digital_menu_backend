import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/user';
import { UNAUTHORIZED } from '../utils/errors';
import { AuthRequest } from '../controllers/auth';
import { UserTypes } from '../utils/types/interfaces';

export const isAuthenticated = async (request: AuthRequest, response: Response, next: NextFunction) => {
    try {
        const bearerToken = request.headers.authorization as string;
        if (!bearerToken) {
            throw UNAUTHORIZED;
        }

        const token = bearerToken.split(' ')[1];
        const payload = verify(token, process.env.TOKEN_SIGN as string) as any;

        const user = await User.findOne({
            where: {
                email: payload.email,
            },
        });
        if (!user) throw UNAUTHORIZED;

        //check type of user
        response.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export const isAdmin = async (request: AuthRequest, response: Response, next: NextFunction) => {
    try {
        const user = response.locals.user;
        if (user.type !== UserTypes.ADMIN) throw UNAUTHORIZED;
        next();
    } catch (error) {
        next(error);
    }
};
