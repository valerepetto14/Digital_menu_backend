import { Request, Response, NextFunction } from 'express';
import { Table } from '../models/table';

export const addTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { number } = req.body;
        const table = await Table.create({
            number
        })
        return res.status(201).json({
            message: 'Table created successfully',
            table: table
        });
    } catch (error) {
        next(error);
    }
};