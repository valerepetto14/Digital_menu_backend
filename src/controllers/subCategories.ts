import { SubCategory } from "../models/subCategory";
import { Request, Response, NextFunction } from "express";
import { Category } from "../models/category";
import { CATEGORY_NOT_FOUND, SUB_CATEGORY_NOT_FOUND, SUB_CATEGORY_ALREADY_EXISTS } from "../utils/errors";

export const addSubCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, categoryId, status } = request.body;
        const subCategories = await SubCategory.findAll({
            where: { title: title }
        });
        if(subCategories.length < 1){
            const category = await Category.findByPk(categoryId);
            if(category){
                const subCategory = await SubCategory.create(
                { 
                    title,
                    categoryId,
                    status 
                });
                return response.status(201).json({ message: "Sub category created", subCategory: subCategory });
            }
            throw CATEGORY_NOT_FOUND;
        }
        throw SUB_CATEGORY_ALREADY_EXISTS;
    } catch (error) {
        next(error)
    }
}

export const getSubCategories = async (request: Request, response: Response, next: NextFunction) => {
    try {
        let { status } = request.query as any;
        status = status === 'true' ? true : (status === 'false' ? false : null);
        let where = {};
        if(status != null){
            where = { status: status };
        }
        console.log(where);
        const subCategories = await SubCategory.findAll({
            where: where,
        });
        return response.status(200).json({ message: "Sub categories found", subCategories: subCategories });
    } catch (error) {
        next(error)
    }
}

export const getSubCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const subCategory = await SubCategory.findByPk(id);
        if(subCategory){
            return response.status(200).json({ message: "Sub category found", subCategory: subCategory });
        }
        throw SUB_CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error)
    }
}

export const deleteSubCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const subCategory = await SubCategory.findByPk(id);
        if (subCategory) {
            await subCategory.update({ status: false });
            return response.status(200).json({ message: "Sub category deleted" });
        }
        throw SUB_CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error)
    }
}

export const updateSubCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const { title, categoryId, status } = request.body;
        const subCategory = await SubCategory.findByPk(id);
        if(subCategory){
            await subCategory.update({
                title,
                categoryId,
                status
            });
            return response.status(200).json({ message: "Sub category updated", subCategory: subCategory });
        }
        throw SUB_CATEGORY_NOT_FOUND;
    } catch (error) {
        next(error)
    }
}