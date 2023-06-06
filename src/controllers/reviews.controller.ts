import { Request, Response, NextFunction } from "express";
import { ReviewModel } from "../models/review";
import { TicketModel } from "../models/ticket";
import { TICKET_NOT_FOUND } from "../utils/errors";


export const createReview = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ticketId = req.params.id;
        const ticket = await TicketModel.findByPk(ticketId);
        if(ticket){
            const review = await ReviewModel.create({
                ticketId: ticket.id,
                service : req.body.service,
                food: req.body.food,
                environment: req.body.environment,
                comment: req.body.comment,
                rating: req.body.rating,
            });
            return res.status(201).json({message: "Review created"});
        }
        throw TICKET_NOT_FOUND
    } catch (error) {
        next(error);
    }
}