import * as Joi from 'joi';

export const addTicketSchema = Joi.object({
    tableId: Joi.string().required(),
    products: Joi.array().items(Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
        optIngredients: Joi.array().items(Joi.object({
            optIngredientId: Joi.string().required(),
            quantity: Joi.number().required(),
        }))
    })).required()
});