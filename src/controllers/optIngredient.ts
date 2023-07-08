import { OptIngredient } from "../models/optIngredient";
import { Request, Response, NextFunction } from "express";
import uuid4 from "uuid4";
import { OPTINGREDIENT_NOT_FOUND, OPTINGREDIENT_ALREADY_EXIST, INGREDIENT_REMOVED_NOT_ADDED_PRICE } from "../utils/errors";


export const addOptIngredient = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const existOptIngredient = await OptIngredient.findOne({ where: { name: request.body.name } });
        if (!existOptIngredient) {
            const newOptIngredient = await OptIngredient.create({
                name: request.body.name,
                price: request.body.price,
                addOrRem: request.body.addOrRem,  
                status: request.body.status,
                variants: request.body.variants
            })
            return response.status(201).json({ message: "Ingredient created", category: newOptIngredient });
        }
        throw OPTINGREDIENT_ALREADY_EXIST;
    } catch (error) {
        next(error);
    }
}

export const deleteOptIngredient = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const getOptIngredient = await OptIngredient.findByPk(request.params.id);
        if (getOptIngredient) {
            await getOptIngredient.destroy();
            return response.status(204).json({});
        } else {
            throw OPTINGREDIENT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
}
export const updateOptIngredient = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const getOptIngredient = await OptIngredient.findOne({ where: { id: id } });
        const { name, price, addOrRem, status, variants } = request.body;
        if (getOptIngredient) {
            if(addOrRem === 'Remove' && price > 0){
                throw INGREDIENT_REMOVED_NOT_ADDED_PRICE;
            }
            await getOptIngredient.update({
                name: name,
                price: price,
                addOrRem: addOrRem,
                status: status,
                variants: variants
            });
            return response.status(200).json({ message: "Ingredient updated" });

        } else {
            throw OPTINGREDIENT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
}

export const getOptIngredient = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        if(id){
            const getOptIngredient = await OptIngredient.findOne({ where: { id: id } });
            if (getOptIngredient) {
                return response.status(200).json({ message: "Ingredient found", optIngredient: getOptIngredient });
            } else {
                throw OPTINGREDIENT_NOT_FOUND;
            }
        }
        const optIngredients = await OptIngredient.findAll();
        return response.status(200).json({ message: "Ingredients found", optIngredients: optIngredients });
    } catch (error) {
        next(error);
    }
}