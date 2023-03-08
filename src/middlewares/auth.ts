import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SessionModel } from '../models/session';
import { UserModel } from '../models/user';
import { UNAUTHORIZED } from '../utils/errors';

export const isAuthenticated = async (req:Request, res: Response, next: NextFunction) => {
    try {
        console.log('start middleware isAuthenticated', req.url)
        if(req.url === '/auth/signin' || req.url === '/auth/signup'){
            return next();
        }
        const token = req.cookies.token;
        if (token){
            const payload = verify(token, process.env.TOKEN_SIGN as string);
            console.log('token', token);
            const session = await SessionModel.findAll({
                where: {
                    token: token,
                }
            });
            console.log('session', session);
            if (session.length > 0) {
                console.log('session found', session);
                if(new Date(session[0].expiration) > new Date()){
                    const user = await UserModel.findAll({
                        where: {
                            id: session[0].userId
                        },
                        attributes: ['id', 'email', 'firstName', 'lastName', 'type']
                    });
                    if(user){
                        req.user = user[0];
                    }
                    return next();
                }
                else {
                    await SessionModel.destroy({
                        where: {
                            token: token
                        }
                    });
                }
            }
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