import { Category, CategoryModel } from "../models/category";
import { Request, Response, NextFunction } from "express";
import { categoryAddSchema, categoryDeleteSchema, categoryUpdateSchema } from "../utils/validations/category.validate";
import { errorResponse } from "../models/errors";
import uuid4 from "uuid4";
import { CATEGORY_NOT_FOUND, CATEGORY_ALREADY_EXIST } from "../utils/errors";


export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const existCategory = await CategoryModel.findOne({where: {name: req.body.name}});
        if(!existCategory){
            const newCategory = await CategoryModel.create({
                id: uuid4(),
                name: req.body.name
            })
            return res.status(201).json({message: "Category created", category: newCategory});
        }
        throw CATEGORY_ALREADY_EXIST;
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getCategory = await CategoryModel.findByPk(req.params.id);
        if (getCategory){
            await getCategory.destroy();
            return res.status(200).json({message: "Category deleted"});
        } 
        throw CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}


export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const getCategory = await CategoryModel.findOne({where: {id: id}});
        if (getCategory){
            const categoryUpdated = await getCategory.update({
                name: req.body.name
            });
            return res.status(200).json({message: "Category updated"});
        } else {
            throw CATEGORY_NOT_FOUND;
        } 
    } catch (error) {
        next(error);
    }
}

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await CategoryModel.findAll();
        return res.status(200).json({message: "Categories found", categories: categories});
    } catch (error) {
        next(error);
    }
}