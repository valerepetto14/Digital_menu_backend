import { Request, Response, NextFunction } from "express";
import { Card } from "../models/card";

export const addCard = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const card = await Card.create({});
        return res.status(201).json({
            message: 'Card created successfully',
            card: card
        }); 
    } catch (error) {
        next(error);
    }
}