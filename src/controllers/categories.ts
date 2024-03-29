import { Category } from "../models/category";
import { SubCategory } from "../models/subCategory";
import { Request, Response, NextFunction } from "express";
import uuid4 from "uuid4";
import { CATEGORY_NOT_FOUND, CATEGORY_ALREADY_EXIST } from "../utils/errors";


export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existCategory = await Category.findOne({where: {title: req.body.title}});
        if(!existCategory){
            const newCategory = await Category.create({
                id: uuid4(),
                title: req.body.title
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
        const category = await Category.findByPk(req.params.id);
        if (category){
            await category.update({
                status: false
            })
        } 
        throw CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}


export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const getCategory = await Category.findOne({where: {id: id}});
        if (getCategory){
            const categoryUpdated = await getCategory.update({
                title: req.body.title
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
        const categories = await Category.findAll({
            include: [
                {
                    model: SubCategory,
                    as: 'subCategories',
                    attributes: ['id', 'title']
                }
            ]
        });
        return res.status(200).json({message: "Categories found", categories: categories});
    } catch (error) {
        next(error);
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if(id){
            const category = await Category.findOne({where: {id: id}});
            if(category){
                return res.status(200).json({message: "Category found", category: category});
            }
            throw CATEGORY_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
}