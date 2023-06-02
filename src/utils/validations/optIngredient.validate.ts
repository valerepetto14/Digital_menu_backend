import * as Joi from 'joi';

export const optIngredientAddSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.base': `The name must be a type of string`,
        'string.empty': `The name cannot be an empty field`,
        'string.min': `The name must have a minimum length of 3`,
        'any.required': `The name is a required field`
    }),
    price: Joi.string().required().messages({
        'string.base': `The price must be a type of string`,
        'string.empty': `The price cannot be an empty field`,
        'any.required': `The price is a required field`,
        'number.base': `The price must be a type of number`,
    }),
    addOrRem: Joi.string().valid('ADD','REMOVE').required().messages({
        'string.base': `The addOrRem must be a type of string`,
        'string.empty': `The addOrRem cannot be an empty field`,
        'any.required': `The addOrRem is a required field`,
        'any.only': `The addOrRem must be ADD or REMOVE`,
    }),
    status: Joi.boolean().required().messages({
        'boolean.base': `The status must be a type of boolean`,
        'any.required': `The status is a required field`,
    }),
})

export const optIngredientDeleteSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.base': `The id must be a type of string`,
        'string.empty': `The id cannot be an empty field`,
        'any.required': `The id is a required field`,
    }),
})

export const optIngredientUpdateParamSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.base': `The id must be a type of string`,
        'string.empty': `The id cannot be an empty field`,
        'any.required': `The id is a required field`,
    }),
})

export const optIngredientUpdateBodySchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.base': `The name must be a type of string`,
        'string.empty': `The name cannot be an empty field`,
        'string.min': `The name must have a minimum length of 3`,
        'any.required': `The name is a required field`
    }),
    price: Joi.number().messages({
        'number.base': `The price must be a type of number`,
    }),
    addOrRem: Joi.string().valid('ADD','REMOVE').required().messages({
        'string.base': `The addOrRem must be a type of string`,
        'string.empty': `The addOrRem cannot be an empty field`,
        'any.required': `The addOrRem is a required field`,
        'any.only': `The addOrRem must be ADD or REMOVE`,
    }),
    status: Joi.boolean().required().messages({
        'boolean.base': `The status must be a type of boolean`,
        'any.required': `The status is a required field`,
    }),
})
