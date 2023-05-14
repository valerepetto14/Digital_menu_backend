import * as Joi from 'joi';

export const addSubCategorySchema = Joi.object({
    title : Joi.string().required(),
    status : Joi.boolean().required(),
    categoryId : Joi.string().required()
})