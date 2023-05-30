import { Request, Response, NextFunction } from "express";
import CardModel from "../models/card";

export const addCard = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const card = await CardModel.create({});
        return res.status(201).json({
            message: 'Card created successfully',
            card: card
        }); 
    } catch (error) {
        next(error);
    }
}