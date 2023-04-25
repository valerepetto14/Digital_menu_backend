import { OptIngredient, OptIngredientModel } from "../models/optIngredient";
import { Request, Response, NextFunction } from "express";
import uuid4 from "uuid4";
import { OPTINGREDIENT_NOT_FOUND, OPTINGREDIENT_ALREADY_EXIST, INGREDIENT_REMOVED_NOT_ADDED_PRICE } from "../utils/errors";


export const addOptIngredient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existOptIngredient = await OptIngredientModel.findOne({ where: { name: req.body.name } });
        if (!existOptIngredient) {
            const newOptIngredient = await OptIngredientModel.create({
                id: uuid4(),
                name: req.body.name,
                price: req.body.price,
                addOrRem: req.body.addOrRem,
                status: req.body.status
            })
            return res.status(201).json({ message: "Ingredient created", category: newOptIngredient });
        }
        throw OPTINGREDIENT_ALREADY_EXIST;
    } catch (error) {
        next(error);
    }
}

export const deleteOptIngredient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getOptIngredient = await OptIngredientModel.findByPk(req.params.id);
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
export const updateOptIngredient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const getOptIngredient = await OptIngredientModel.findOne({ where: { id: id } });
        const { name, price, addOrRem, status } = req.body;
        if (getOptIngredient) {
            if(addOrRem === 'Remove' && price > 0){
                throw INGREDIENT_REMOVED_NOT_ADDED_PRICE;
            }
            await getOptIngredient.update({
                name: name,
                price: price,
                addOrRem: addOrRem,
                status: status
            });
            return res.status(200).json({ message: "Ingredient updated" });

        } else {
            throw OPTINGREDIENT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
}

export const getOptIngredient = async (req: Request, res: Response, next: NextFunction) => {
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