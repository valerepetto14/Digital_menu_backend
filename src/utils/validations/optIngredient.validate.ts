import * as Joi from 'joi';

export const optIngredientAddSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.string().required(),
    addOrRem: Joi.string().valid('ADD','REMOVE').required(),
    status: Joi.boolean().required()
})

export const optIngredientDeleteSchema = Joi.object({
    id: Joi.string().required()
})

export const optIngredientUpdateParamSchema = Joi.object({
    id: Joi.string().required()
})

export const optIngredientUpdateBodySchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number(),
    addOrRem: Joi.string().valid('ADD','REMOVE').required(),
    status: Joi.boolean().required()
})
