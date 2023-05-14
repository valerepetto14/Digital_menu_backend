import { SubCategoryModel } from "../models/subCategory";
import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../models/category";
import { CATEGORY_NOT_FOUND, SUB_CATEGORY_NOT_FOUND, SUB_CATEGORY_ALREADY_EXISTS } from "../utils/errors";

export const addSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, categoryId, status } = req.body;
        const subCategories = await SubCategoryModel.findAll({
            where: { title: title }
        });
        if(subCategories.length < 1){
            const category = await CategoryModel.findByPk(categoryId);
            if(category){
                const subCategory = await SubCategoryModel.create(
                { 
                    title,
                    categoryId,
                    status 
                });
                return res.status(201).json({ message: "Sub category created", subCategory: subCategory });
            }
            throw CATEGORY_NOT_FOUND;
        }
        throw SUB_CATEGORY_ALREADY_EXISTS;
    } catch (error) {
        next(error)
    }
}

export const getSubCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { status } = req.query as any;
        status = status === 'true' ? true : (status === 'false' ? false : null);
        let where = {};
        if(status != null){
            where = { status: status };
        }
        console.log(where);
        const subCategories = await SubCategoryModel.findAll({
            where: where,
        });
        return res.status(200).json({ message: "Sub categories found", subCategories: subCategories });
    } catch (error) {
        next(error)
    }
}

export const getSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const subCategory = await SubCategoryModel.findByPk(id);
        if(subCategory){
            return res.status(200).json({ message: "Sub category found", subCategory: subCategory });
        }
        throw SUB_CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error)
    }
}

export const deleteSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const subCategory = await SubCategoryModel.findByPk(id);
        if (subCategory) {
            await subCategory.update({ status: false });
            return res.status(200).json({ message: "Sub category deleted" });
        }
        throw SUB_CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error)
    }
}

export const updateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, categoryId, status } = req.body;
        const subCategory = await SubCategoryModel.findByPk(id);
        if(subCategory){
            await subCategory.update({
                title,
                categoryId,
                status
            });
            return res.status(200).json({ message: "Sub category updated", subCategory: subCategory });
        }
        throw SUB_CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error)
    }
}