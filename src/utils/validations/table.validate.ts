import * as Joi from 'joi';

export const addTableSchema = Joi.object({
    number : Joi.number().required().messages({
        'number.base': `The number must be a type of number`,
        'any.required': `The number is a required field`,
    }),
});