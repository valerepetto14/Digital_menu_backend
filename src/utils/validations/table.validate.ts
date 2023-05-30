import * as Joi from 'joi';

export const addTableSchema = Joi.object({
    number : Joi.number().required()
});