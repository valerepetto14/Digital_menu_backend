import { Request, Response, NextFunction } from 'express';
import { OrderRow } from '../models/orderRow';
import { Product } from '../models/product';
import { getTable } from '../models/table';
import { Order } from '../models/order';
import { Card, getCard } from '../models/card';
import { IOptIngredientProductOrderRow } from '../utils/types/interfaces';
import { OptIngredient } from '../models/optIngredient';
// export const addOrder = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { tableId, products } = req.body;
//         const table = await Table.findByPk(tableId);
//         if (table != null) {
//             const ticket = await Ticket.create({
//                 tableId: table.id,
//             });
//             for (const product of products) {
//                 const productFound = await Product.findByPk(product.productId);
//                 if (productFound) {
//                     await OrderRow.create({
//                         ticketId: ticket.id,
//                         productId: productFound.id,
//                         quantity: product.quantity,
//                         unitPrice: productFound.currentPrice,
//                         optIngredients: await getOptingredientToTicketRow(product.optIngredients),
//                     });
//                 } else {
//                     continue;
//                 }
//             }
//             return res.status(201).json({
//                 message: 'Ticket created successfully',
//                 ticket: ticket,
//             });
//         } else {
//             throw TABLE_NOT_FOUND;
//         }
//     } catch (error) {
//         next(error);
//     }
// };

export const createOrder = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { tableId, cardId } = request.body;

        const table = await getTable(tableId);
        const card = await getCard(cardId);
        const ticket = response.locals.ticket;
        console.log('ticket', ticket);
        const newOrder = await Order.create({
            ticketId: ticket.id,
            tableId: table.id,
            cardId: card.id,
        });
        response.locals.order = newOrder;
        next();
    } catch (error) {
        next(error);
    }
}

export const addProductsToOrder = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = request.body.products;
        const order = response.locals.order;
        console.log(
            'order', order.id,
        )
        for (const product of products) {
            const productFound = await Product.findByPk(product.productId);
            if (productFound) {
                await OrderRow.create({
                    orderId: order.id,
                    productId: productFound.id,
                    quantity: product.quantity,
                    unitPrice: productFound.currentPrice,
                    optIngredients: await getOptingredientToOrderRow(product.optIngredients),
                });
            } else {
                continue;
            }
        }
        response.status(201).json({
            message: 'Order created successfully'
        });
    } catch (error) {
        next(error);
    }
}

const getOptingredientToOrderRow = async (optIngredients: Array<IOptIngredientProductOrderRow>) => {
    try {
        const response: Array<IOptIngredientProductOrderRow> = [];
        for (const optIngredient of optIngredients) {
            const optIngredientFound = await OptIngredient.findByPk(optIngredient.optIngredientId);
            if (optIngredientFound) {
                response.push({
                    optIngredientId: optIngredientFound.id,
                    name: optIngredientFound.name,
                    quantity: optIngredient.quantity,
                    unitPrice: optIngredientFound.price,
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