import { Request, Response, NextFunction } from "express";
import { Ticket } from "../models/ticket";
import { TicketRow } from "../models/ticketsRow";
import { Product } from "../models/product";
import { OptIngredient } from "../models/optIngredient";
import { Table } from "../models/table";
import { TABLE_NOT_FOUND, TICKET_NOT_FOUND } from "../utils/errors";
import { Category } from "../models/category";
import { SubCategory } from "../models/subCategory";
import { OptIngredientProductTicketRow }  from "../utils/types/interfaces";

export const addTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tableId, products } = req.body;
        const table = await Table.findByPk(tableId);
        if (table != null) {
            const ticket = await Ticket.create({
                tableId: table.id,
                status: 'send'
            });
            for (const product of products) {
                const productFound = await Product.findByPk(product.productId);
                console.log(productFound);
                if (productFound) {
                    const ticketRow = await TicketRow.create({
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
        const ticket = await Ticket.findAll({
            where: {
              id: id,
            },
            attributes: ['id', 'status', 'createdAt'],
            include: [
                {
                    model: Table,
                    as: 'table',
                    attributes: ['number'],
                },
                {
                    model: Product,
                    as : 'products',
                    attributes: ['id', 'name', 'description', 'currentPrice', 'status'],
                    through: { attributes: [
                        'quantity',
                        'unitPrice',
                        'optIngredients'
                    ] },
                    include: [
                        {
                            model: Category,
                            attributes: ['id', 'title'],
                        },
                        {
                            model: SubCategory,
                            attributes: ['id', 'title'],
                            as: 'subCategory'
                        }
                    ],
                },
            ],
        });
        if (ticket && ticket.length > 0) {
            const totalPrice = ticket[0].products.reduce((total, product) => {
                return total + product.TicketRowModel.unitPrice;
            }, 0);

            ticket[0].setDataValue('totalPrice', totalPrice);
            return res.status(200).json({
                message: 'Ticket found',
                ticket: ticket[0]
            });
        } else {
            throw TICKET_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

const getOptingredientToTicketRow = async (optIngredients: Array<OptIngredientProductTicketRow>) => {
    try {
        const response:Array<OptIngredientProductTicketRow> = [];
        for (const optIngredient of optIngredients) {
            const optIngredientFound = await OptIngredient.findByPk(optIngredient.optIngredientId);
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