import * as Joi from 'joi';

export const productAddSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.base': `The name must be a type of string`,
        'string.empty': `The name cannot be an empty field`,
        'string.min': `The name must have a minimum length of 3`,
        'any.required': `The name is a required field`
    }),
    description: Joi.string().min(3).required().messages({
        'string.base': `The description must be a type of string`,
        'string.empty': `The description cannot be an empty field`,
        'string.min': `The description must have a minimum length of 3`,
        'any.required': `The description is a required field`
    }),
    currentPrice: Joi.string().required().messages({
        'string.base': `The currentPrice must be a type of string`,
        'string.empty': `The currentPrice cannot be an empty field`,
        'any.required': `The currentPrice is a required field`,
        'number.base': `The currentPrice must be a type of number`,
    }),
    status: Joi.boolean().required().messages({
        'boolean.base': `The status must be a type of boolean`,
        'any.required': `The status is a required field`,
    }),
    image: Joi.string().required().messages({
        'string.base': `The image must be a type of string`,
        'string.empty': `The image cannot be an empty field`,
        'any.required': `The image is a required field`,
    }),
    available: Joi.boolean().required().messages({
        'boolean.base': `The available must be a type of boolean`,
        'any.required': `The available is a required field`,
    }),
    categoryId: Joi.string().required().messages({
        'string.base': `The categoryId must be a type of string`,
        'string.empty': `The categoryId cannot be an empty field`,
        'any.required': `The categoryId is a required field`,
    }),
    subCategoryId: Joi.string().required().messages({
        'string.base': `The subCategoryId must be a type of string`,
        'string.empty': `The subCategoryId cannot be an empty field`,
        'any.required': `The subCategoryId is a required field`,
    }),
    optIngredientsId: Joi.array().items(Joi.string()).messages({
        'string.base': `The optIngredientsId must be a type of string`,
        'string.empty': `The optIngredientsId cannot be an empty field`,
        'any.required': `The optIngredientsId is a required field`,
    }),
})

export const productUpdateParamSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.base': `The id must be a type of string`,
        'string.empty': `The id cannot be an empty field`,
        'any.required': `The id is a required field`,
    }),
})

export const productUpdateBodySchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.base': `The name must be a type of string`,
        'string.empty': `The name cannot be an empty field`,
        'string.min': `The name must have a minimum length of 3`,
        'any.required': `The name is a required field`
    }),
    description: Joi.string().min(3).required().messages({
        'string.base': `The description must be a type of string`,
        'string.empty': `The description cannot be an empty field`,
        'string.min': `The description must have a minimum length of 3`,
        'any.required': `The description is a required field`
    }),
    currentPrice: Joi.string().required().messages({
        'string.base': `The currentPrice must be a type of string`,
        'string.empty': `The currentPrice cannot be an empty field`,
        'any.required': `The currentPrice is a required field`,
        'number.base': `The currentPrice must be a type of number`,
    }),
    status: Joi.boolean().required().messages({
        'boolean.base': `The status must be a type of boolean`,
        'any.required': `The status is a required field`,
    }),
    image: Joi.string().required().messages({
        'string.base': `The image must be a type of string`,
        'string.empty': `The image cannot be an empty field`,
        'any.required': `The image is a required field`,
    }),
    available: Joi.boolean().required().messages({
        'boolean.base': `The available must be a type of boolean`,
        'any.required': `The available is a required field`,
    }),
    categoryId: Joi.string().required().messages({
        'string.base': `The categoryId must be a type of string`,
        'string.empty': `The categoryId cannot be an empty field`,
        'any.required': `The categoryId is a required field`,
    }),
    subCategoryId: Joi.string().required().messages({
        'string.base': `The subCategoryId must be a type of string`,
        'string.empty': `The subCategoryId cannot be an empty field`,
        'any.required': `The subCategoryId is a required field`,
    }),
    optIngredientsId: Joi.array().items(Joi.string()).messages({
        'string.base': `The optIngredientsId must be a type of string`,
        'string.empty': `The optIngredientsId cannot be an empty field`,
        'any.required': `The optIngredientsId is a required field`,
    }),
})
