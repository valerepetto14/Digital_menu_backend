import * as Joi from 'joi';

export const addTicketSchema = Joi.object({
    tableId: Joi.string().required().messages({
        'string.base': `The tableId must be a type of string`,
        'string.empty': `The tableId cannot be an empty field`,
        'any.required': `The tableId is a required field`,
    }),
    products: Joi.array().items(Joi.object({
        productId: Joi.string().required().messages({
            'string.base': `The productId must be a type of string`,
            'string.empty': `The productId cannot be an empty field`,
            'any.required': `The productId is a required field`,
        }),
        quantity: Joi.number().required().messages({
            'number.base': `The quantity must be a type of number`,
            'any.required': `The quantity is a required field`,
        }),
        optIngredients: Joi.array().items(Joi.object({
            optIngredientId: Joi.string().required().messages({
                'string.base': `The optIngredientId must be a type of string`,
                'string.empty': `The optIngredientId cannot be an empty field`,
                'any.required': `The optIngredientId is a required field`,
            }),
            quantity: Joi.number().required().messages({
                'number.base': `The quantity must be a type of number`,
                'any.required': `The quantity is a required field`,
            }),
        })).required()
    })).required()
});