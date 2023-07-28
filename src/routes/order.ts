import { Router } from 'express';
import { createTicket } from '../controllers/ticket';
import { createOrder, getOrder } from '../controllers/order';
import { addProductsToOrder } from '../controllers/order';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { orderAddSchema } from '../utils/validations/orders.validate';

export const orderRouter = Router();

orderRouter.post('/', bodyValidate(orderAddSchema), createTicket, createOrder, addProductsToOrder);

orderRouter.get('/:id', getOrder);
