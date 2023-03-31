import { OptIngredient, OptIngredientModel } from "../models/optIngredient";
import { Request, Response, NextFunction } from "express";
import { optIngredientAddSchema, optIngredientDeleteSchema, optIngredientUpdateParamSchema, optIngredientUpdateBodySchema } from "../utils/validations/optIngredient.validate";
import { errorResponse } from "../models/errors";
import uuid4 from "uuid4";
import { OPTINGREDIENT_NOT_FOUND, OPTINGREDIENT_ALREADY_EXIST } from "../utils/errors";


export const addOptIngregient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = optIngredientAddSchema.validate(req.body);
        if (error) {
            throw new errorResponse(error.message, 400);
        }
        console.log('VALUE', value);
        const existOptIngredient = await OptIngredientModel.findOne({ where: { name: value.name } });
        if (!existOptIngredient) {
            const newOptIngredient = await OptIngredientModel.create({
                id: uuid4(),
                name: value.name,
                price: value.price,
                addOrRem: value.addOrRem,
                status: value.status
            })
            return res.status(201).json({ message: "Ingredient created", category: newOptIngredient });
        }
        throw OPTINGREDIENT_ALREADY_EXIST;
    } catch (error) {
        next(error);
    }
}

export const deleteOptIngregient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = optIngredientDeleteSchema.validate(req.params);
        if (error) {
            throw new errorResponse(error.message, 400);
        }
        console.log('VALUE', value);
        const getOptIngredient = await OptIngredientModel.findByPk(value.id);
        if (getOptIngredient) {
            await getOptIngredient.destroy();
            return res.status(204).json({});
        } else {
            throw OPTINGREDIENT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
}
export const updateOptIngregient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const getOptIngredient = await OptIngredientModel.findOne({ where: { id: id } });
        if (getOptIngredient) {
            const { error, value } = optIngredientUpdateBodySchema.validate(req.body);

            if (error) {
                throw new errorResponse(error.message, 400);
            }

            await getOptIngredient.update({
                name: value.name,
                price: value.price,
                addOrRem: value.addOrRem,
                status: value.status
            });

            return res.status(200).json({ message: "Ingredient updated" });

        } else {
            throw OPTINGREDIENT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
}

export const getOptIngregient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if(id){
            const getOptIngredient = await OptIngredientModel.findOne({ where: { id: id } });
            if (getOptIngredient) {
                return res.status(200).json({ message: "Ingredient found", optIngredient: getOptIngredient });
            } else {
                throw OPTINGREDIENT_NOT_FOUND;
            }
        }
        const optIngredients = await OptIngredientModel.findAll();
        return res.status(200).json({ message: "Ingredients found", optIngredients: optIngredients });
    } catch (error) {
        next(error);
    }
}