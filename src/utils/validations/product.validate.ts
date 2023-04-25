import * as Joi from 'joi';

export const productAddSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    currentPrice: Joi.string().required(),
    status: Joi.boolean().required(),
    available: Joi.boolean().required(),
    categoryId: Joi.string().required(),
    optIngredientsId: Joi.array().items(Joi.string())
})

export const productDeleteSchema = Joi.object({
    id: Joi.string().required()
})

export const productUpdateParamSchema = Joi.object({
    id: Joi.string().required()
})

export const productUpdateBodySchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    currentPrice: Joi.string().required(),
    status: Joi.boolean().required(),
    available: Joi.boolean().required(),
    categoryId: Joi.string().required()
})