import Joi from "joi";

export const addReviewSchema = Joi.object({
    ticketId: Joi.string().uuid().required(),
    service: Joi.number().integer().min(1).max(5).required(),
    attention: Joi.number().integer().min(1).max(5).required(),
    environment: Joi.number().integer().min(1).max(5).required(),
    food: Joi.number().integer().min(1).max(5).required()
})