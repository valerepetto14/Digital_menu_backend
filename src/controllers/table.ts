import { Request, Response, NextFunction } from 'express';
import { Table } from '../models/table';

export const addTable = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { number } = request.body;
        const table = await Table.create({
            number
        })
        return response.status(201).json({
            message: 'Table created successfully',
            table: table
        });
    } catch (error) {
        next(error);
    }
};