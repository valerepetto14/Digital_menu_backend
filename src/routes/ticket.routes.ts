import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middlware";
import bodyValidate from "../middlewares/bodyValidate.middleware";
import { addTicketSchema } from "../utils/validations/ticket.validate";
import { addTicket, getTicket } from "../controllers/ticket.controller";


export const router = Router();

router.get("/:id", isAuthenticated, getTicket)
router.post("/", isAuthenticated, bodyValidate(addTicketSchema), addTicket);