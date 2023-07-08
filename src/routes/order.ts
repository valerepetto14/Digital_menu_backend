import { Router } from "express";
import { createTicket } from "../controllers/ticket";
import { createOrder } from "../controllers/order";
import { addProductsToOrder } from "../controllers/order";

export const orderRouter = Router();

orderRouter.post('/', createTicket, createOrder, addProductsToOrder);