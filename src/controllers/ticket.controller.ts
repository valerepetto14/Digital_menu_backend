import { Request, Response, NextFunction } from "express";
import { TicketModel } from "../models/ticket";
import { TicketRowModel } from "../models/ticketsRow";
import { ProductModel } from "../models/product";
import { OptIngredientModel } from "../models/optIngredient";
import { OptIngredientProductModel } from "../models/optIngredientProduct";
import { TableModel } from "../models/table";
import { TABLE_NOT_FOUND } from "../utils/errors";
import { CategoryModel } from "../models/category";

export const addTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tableId, products } = req.body;
        const table = await TableModel.findByPk(tableId);
        if (table != null) {
            const ticket = await TicketModel.create({
                tableId: table.id,
                status: 'send'
            });
            for (const product of products) {
                const productFound = await ProductModel.findByPk(product.productId);
                console.log(productFound);
                if (productFound) {
                    const ticketRow = await TicketRowModel.create({
                        ticketId: ticket.id,
                        productId: productFound.id,
                        quantity: product.quantity,
                        unitPrice: productFound.currentPrice,
                        optIngredients: await getOptingredientToTicketRow(product.optIngredients)
                    });
                } else {
                    continue;
                }
            }
            return res.status(201).json({
                message: 'Ticket created successfully',
                ticket: ticket
            });
        } else {
            throw TABLE_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
}

export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const response:any = {};
        const ticket = await TicketModel.findByPk(id)
        response['ticket'] = ticket;
        if (ticket) {
            const ticketRows = await TicketRowModel.findAll({
                where: {
                    ticketId: id
                }
            });
            response.ticket['ticketRows'] = ticketRows;
            return res.status(200).json({
                message: 'Ticket found',
                ticket: response
            });
        } else {
            throw TABLE_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

const getOptingredientToTicketRow = async (optIngredients: Array<OptIngredientRowTicket>) => {
    try {
        const response:Array<OptIngredientRowTicket> = [];
        for (const optIngredient of optIngredients) {
            const optIngredientFound = await OptIngredientModel.findByPk(optIngredient.optIngredientId);
            if (optIngredientFound) {
                response.push({
                    optIngredientId: optIngredient.optIngredientId,
                    quantity: optIngredient.quantity,
                    unitPrice: optIngredientFound.price
                });
            } else {
                continue;
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
};