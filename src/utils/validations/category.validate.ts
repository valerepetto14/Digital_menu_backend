import * as Joi from 'joi';

export const categoryAddSchema = Joi.object({
    title: Joi.string().min(3).required(),
})

export const categoryUpdateSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.base': `The title must be a type of string`,
    }),
})

