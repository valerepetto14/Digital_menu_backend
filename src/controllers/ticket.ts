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

export const getTicket = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const ticket = await Ticket.findByPk(id, {
            attributes: ['id', 'status', 'createdAt'],
        });
        if (ticket) {
            const orders = await ticket.getOrders();
            const responseBody = {
                ...ticket.toJSON(),
                orders: orders,
            };
            return response.status(200).json({
                message: 'Ticket found',
                ticket: responseBody,
            });
        } else {
            throw TICKET_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};
