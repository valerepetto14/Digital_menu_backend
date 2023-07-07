import { Request, Response, NextFunction } from 'express';
import { Ticket } from '../models/ticket';
import { OrderRow } from '../models/orderRow';
import { Product } from '../models/product';
import { Table } from '../models/table';
import { TABLE_NOT_FOUND, TICKET_NOT_FOUND } from '../utils/errors';

// export const addTicket = async (req: Request, res: Response, next: NextFunction) => {
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
