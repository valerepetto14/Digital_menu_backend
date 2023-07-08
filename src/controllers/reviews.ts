import { Request, Response, NextFunction } from "express";
import { Review } from "../models/review";
import { Ticket } from "../models/ticket";
import { TICKET_NOT_FOUND } from "../utils/errors";


export const createReview = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const ticketId = request.params.id;
        const ticket = await Ticket.findByPk(ticketId);
        if(ticket){
            const { service, food, environment, comment, rating } = request.body;
            const review = await Review.create({
                ticketId: ticket.id,
                service: service,
                food: food,
                environment: environment,
                comment: comment,
                rating: rating
            });
            return response.status(201).json({message: "Review created"});
        }
        throw TICKET_NOT_FOUND
    } catch (error) {
        next(error);
    }
}