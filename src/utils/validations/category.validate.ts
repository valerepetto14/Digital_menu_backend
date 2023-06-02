import * as Joi from 'joi';

export const categoryAddSchema = Joi.object({
    title: Joi.string().min(3).required(),
})

export const categoryUpdateSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.base': `The title must be a type of string`,
        'string.empty': `The title cannot be an empty field`,
        'string.min': `The title must have a minimum length of 3`,
        'any.required': `The title is a required field`
    }),
})

