import * as Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': `The email must be a type of string`,
        'string.empty': `The email cannot be an empty field`,
        'string.email': `The email must be a valid email`,
        'any.required': `The email is a required field`
    }),
    firstName : Joi.string().min(3).required().messages({
        'string.base': `The firstName must be a type of string`,
        'string.empty': `The firstName cannot be an empty field`,
        'string.min': `The firstName must have a minimum length of 3`,
        'any.required': `The firstName is a required field`
    }),
    lastName : Joi.string().min(3).required().messages({
        'string.base': `The lastName must be a type of string`,
        'string.empty': `The lastName cannot be an empty field`,
        'string.min': `The lastName must have a minimum length of 3`,
        'any.required': `The lastName is a required field`
    }),
    phoneNumber : Joi.string().min(9).required().messages({
        'string.base': `The phoneNumber must be a type of string`,
        'string.empty': `The phoneNumber cannot be an empty field`,
        'string.min': `The phoneNumber must have a minimum length of 9`,
        'any.required': `The phoneNumber is a required field`
    }),
    type : Joi.string().min(6).valid('employee','admin').required().messages({
        'string.base': `The type must be a type of string`,
        'string.empty': `The type cannot be an empty field`,
        'string.min': `The type must have a minimum length of 6`,
        'any.required': `The type is a required field`
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': `The password must be a type of string`,
        'string.empty': `The password cannot be an empty field`,
        'string.min': `The password must have a minimum length of 6`,
        'any.required': `The password is a required field`
    }),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})