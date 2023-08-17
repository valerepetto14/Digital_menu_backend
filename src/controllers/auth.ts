import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import uuid4 from 'uuid4';
import jwt from 'jsonwebtoken';
import { checkIfUserExists } from '../utils/checks';
import { INCORRECT_CREDENTIALS, USER_ALREADY_EXISTS, UNAUTHORIZED } from '../utils/errors';

export interface AuthRequest extends Request {
    user?: any;
    token?: string;
}

export const signUp = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const body = request.body;
        const userExists = await checkIfUserExists(body.email);
        if (!userExists) {
            const passHash = await hash(body.password, 10);
            const newUser = await User.create({
                id: uuid4(),
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                phoneNumber: body.phoneNumber,
                type: body.type,
                password: passHash,
            });
            const responseBody = {
                message: 'User created',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    phoneNumber: newUser.phoneNumber,
                    type: newUser.type,
                },
            };
            return response.status(201).json(responseBody);
        } else {
            throw USER_ALREADY_EXISTS;
        }
    } catch (error) {
        return next(error);
    }
};

export const signIn = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const body = request.body;
        const user = await User.findOne({ where: { email: body.email } });
        if (user) {
            const passMatch = await compare(body.password, user.password);
            if (passMatch) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: user.type,
                    },
                    process.env.TOKEN_SIGN ? process.env.TOKEN_SIGN : 'HOLA'
                );
                const responseBody = {
                    message: 'User logged in',
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: user.type,
                    },
                    token: token,
                };
                return response.status(200).json(responseBody);
            } else {
                throw INCORRECT_CREDENTIALS;
            }
        } else {
            throw INCORRECT_CREDENTIALS;
        }
    } catch (error) {
        return next(error);
    }
};

export const signOut = async (request: AuthRequest, response: Response, next: NextFunction) => {
    try {
        response.clearCookie('token').status(200).json({ message: 'User logged out' });
    } catch (error) {
        next(error);
    }
};
