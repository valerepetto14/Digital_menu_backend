import * as Joi from 'joi';

export const orderAddSchema = Joi.object({
    cardId: Joi.string().required().messages({
        'string.base': `The cardId must be a type of string`,
        'string.empty': `The cardId cannot be an empty field`,
        'any.required': `The cardId is a required field`,
    }),
    tableId: Joi.string().required().messages({
        'string.base': `The tableId must be a type of string`,
        'string.empty': `The tableId cannot be an empty field`,
        'any.required': `The tableId is a required field`,
    }),
    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string().required().messages({
                    'string.base': `The productId must be a type of string`,
                    'string.empty': `The productId cannot be an empty field`,
                    'any.required': `The productId is a required field`,
                }),
                quantity: Joi.number().required().messages({
                    'number.base': `The quantity must be a type of number`,
                    'number.empty': `The quantity cannot be an empty field`,
                    'any.required': `The quantity is a required field`,
                }),
                optIngredients: Joi.array()
                    .items(
                        Joi.object({
                            optIngredientId: Joi.string().required().messages({
                                'string.base': `The optIngredientId must be a type of string`,
                                'string.empty': `The optIngredientId cannot be an empty field`,
                                'any.required': `The optIngredientId is a required field`,
                            }),
                            quantity: Joi.number().required().messages({
                                'number.base': `The quantity must be a type of number`,
                                'number.empty': `The quantity cannot be an empty field`,
                                'any.required': `The quantity is a required field`,
                            }),
                        })
                    )
                    .optional()
                    .messages({
                        'array.base': `The optIngredients must be a type of array`,
                        'array.empty': `The optIngredients cannot be an empty field`,
                    }),
            })
        )
        .required()
        .messages({
            'array.base': `The products must be a type of array`,
            'array.empty': `The products cannot be an empty field`,
            'any.required': `The products is a required field`,
        }),
});
