import {  Request, Response, NextFunction } from "express";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode) {
        res.status(err.statusCode)
        res.json({ error: err.message })
    } else {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
}