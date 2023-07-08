import { Request, Response, NextFunction, response } from 'express';
import { Ticket } from '../models/ticket';
import { Table } from '../models/table';
import { TABLE_NOT_FOUND, TICKET_NOT_FOUND } from '../utils/errors';

export const createTicket = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { tableId, cardId } = request.body;
        let ticketActive = await Ticket.findOne({
            where: {
                tableId: tableId,
                status: 'IN_PROGRESS',
            },
        });
        if (!ticketActive) {
            const table = await Table.findByPk(tableId);
            if (table) {
                ticketActive = await Ticket.create({
                    tableId: table.id,
                    cardId: cardId,
                });
            } else {
                throw TABLE_NOT_FOUND;
            }
        }

        response.locals.ticket = ticketActive;
        next();
    } catch (error) {
        next(error);
    }
};

export const getTicket = async (request: Request, _response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const ticket = await Ticket.findByPk(id, {
            attributes: ['id', 'status', 'createdAt'],
        });
        if (ticket) {
            const ticketRows = await ticket.getTicketRows();
            const response = {
                ...ticket.toJSON(),
                ticketRows: ticketRows,
            };
            return response.status(200).json({
                message: 'Ticket found',
                ticket: response,
            });
            // if (ticket && ticket.length > 0) {
            //     const totalPrice = ticket[0].products.reduce((total, product) => {
            //         return total + product.TicketRowModel.unitPrice;
            //     }, 0);

            //     ticket[0].setDataValue('totalPrice', totalPrice);
            //     return res.status(200).json({
            //         message: 'Ticket found',
            //         ticket: ticket[0]
            //     });
        } else {
            throw TICKET_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

