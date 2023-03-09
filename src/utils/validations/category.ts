import * as Joi from 'joi';

export const categoryAddSchema = Joi.object({
    name: Joi.string().min(3).required(),
})

export const categoryDeleteSchema = Joi.object({
    id: Joi.string().required()
})

export const categoryUpdateSchema = Joi.object({
    name: Joi.string().min(3).required(),
})