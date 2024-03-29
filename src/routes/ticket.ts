import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middlware";
import bodyValidate from "../middlewares/bodyValidate.middleware";
import { addTicketSchema } from "../utils/validations/ticket.validate";
import { addTicket, getTicket } from "../controllers/ticket";


export const ticketsRouter = Router();

ticketsRouter.get("/:id", isAuthenticated, getTicket)
ticketsRouter.post("/", isAuthenticated, bodyValidate(addTicketSchema), addTicket);