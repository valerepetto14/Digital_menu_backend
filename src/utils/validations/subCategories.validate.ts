import * as Joi from 'joi';

export const addSubCategorySchema = Joi.object({
    title : Joi.string().required().messages({
        'string.base': `The title must be a type of string`,
        'string.empty': `The title cannot be an empty field`,
        'any.required': `The title is a required field`
    }),
    status : Joi.boolean().required().messages({
        'boolean.base': `The status must be a type of boolean`,
        'any.required': `The status is a required field`,
    }),
    categoryId : Joi.string().required().messages({
        'string.base': `The categoryId must be a type of string`,
        'string.empty': `The categoryId cannot be an empty field`,
        'any.required': `The categoryId is a required field`,
    }),
})