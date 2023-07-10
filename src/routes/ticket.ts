import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middlware';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { addTicketSchema } from '../utils/validations/ticket.validate';
import { createTicket, getTicket } from '../controllers/ticket';

export const ticketsRouter = Router();

ticketsRouter.get('/:id', getTicket);
ticketsRouter.post('/', isAuthenticated, bodyValidate(addTicketSchema), createTicket);
