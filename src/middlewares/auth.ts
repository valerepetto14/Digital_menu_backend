import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SessionModel } from '../models/session';
import { UserModel } from '../models/user';
import { UNAUTHORIZED } from '../utils/errors';


export const isAuthenticated = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const headerToken = req.headers.authorization;
        if (headerToken){
            const token = headerToken.split(' ')[1];
            const payload = verify(token, process.env.TOKEN_SIGN as string);
            console.log('token', token);
            const session = await SessionModel.findAll({
                where: {
                    token: token,
                }
            });
            console.log('session',session);
            if (session.length > 0) {
                if(new Date(session[0].expiration) > new Date()){
                    const user = await UserModel.findAll({
                        where: {
                            id: session[0].userId
                        },
                        attributes: ['id', 'email', 'firstName', 'lastName', 'type']
                    });
                    if(user){
                        console.log(user[0]);
                        Object.assign(req, user[0]);
                    }
                    next();
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
        const header = req.headers.authorization;
        if (header){
            const token = header.split(' ')[1];
            const payload = verify(token, process.env.TOKEN_SIGN as string);
            const session = await SessionModel.findAll({
                where: {
                    token: token,
                }
            })
            if (session.length > 0) {
                const user = await UserModel.findAll({
                    where: {
                        id: session[0].userId
                    }
                })
                if(user[0].type === 'admin'){
                    next();
                }
            }
        }
        throw UNAUTHORIZED;
    } catch (error) {
        next(error);
    }
}