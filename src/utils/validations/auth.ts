import * as Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    firstName : Joi.string().min(3).required(),
    lastName : Joi.string().min(3).required(),
    phoneNumber : Joi.string().min(9).required(),
    type : Joi.string().min(6).valid('employee','admin').required(),
    password: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})