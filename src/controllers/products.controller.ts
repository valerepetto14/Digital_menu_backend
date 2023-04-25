import { Product, ProductModel } from "../models/product";
import { CategoryModel } from "../models/category";
import { OptIngredientModel, OptIngredient } from "../models/optIngredient";
import { Request, Response, NextFunction } from "express";
import uuid4 from "uuid4";
import { PRODUCT_NOT_FOUND, PRODUCT_ALREADY_EXIST } from "../utils/errors";
import { pagination } from "../utils/functions";

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, currentPrice, status, available, categoryId, optIngredientsId } = req.body;
        const existProduct = await ProductModel.findOne({where: {name: req.body.name}});
        if(!existProduct){
            const newProduct = await ProductModel.create({
                id: uuid4(),
                name,
                description,
                currentPrice,
                status,
                available,
                categoryId
            })
            if(optIngredientsId && optIngredientsId.length > 0){
                let ingredientsOpt: OptIngredient[] = await Promise.all(optIngredientsId.map(async (ingredientId: string) => {
                    let ingredient = await OptIngredientModel.findByPk(ingredientId);
                    return ingredient!;
                }));
                await newProduct.addOptIngredients(ingredientsOpt);
            }
            return res.status(201).json({message: "Product created", product: newProduct});
        }
        throw PRODUCT_ALREADY_EXIST;
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getProduct = await ProductModel.findByPk(req.params.id);
        if (getProduct){
            await getProduct.destroy();
            return res.status(200).json({message: "Product deleted"});
        } 
        throw PRODUCT_NOT_FOUND;
    } catch (error) {
        next(error);
    }
}


export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const getProduct = await ProductModel.findOne({where: {id: id}});
        if (getProduct){
            const productUpdated = await getProduct.update({
                name: req.body.name,
                description: req.body.description,
                currentPrice: req.body.currentPrice,
                status: req.body.status,
                available: req.body.available,
                categoryId: req.body.categoryId
            });
            return res.status(200).json({message: "Product updated"});
        } else {
            throw PRODUCT_NOT_FOUND;
        } 
    } catch (error) {
        next(error);
    }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { limit, page } = req.query as any;
        let { limite, pagina, offset } = pagination(parseInt(limit), parseInt(page));
        console.log(limite, pagina, offset)
        const products = await ProductModel.findAll({
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id', 'title']
                },
                {
                    model: OptIngredientModel,
                    as : 'optIngredients',
                    attributes : ['id', 'name', 'price', 'status', 'addOrRem']
                }
            ],
            limit: limite,
            offset: offset
        });
        const countProducts = await ProductModel.count();

        let response = {
            message: "Products found",
            products: products,
            page: pagina,
            totalPages: Math.ceil(countProducts / limite),
            limit: limite
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if(id){
            const getProduct = await ProductModel.findOne({ 
                where: { id: id },
                include: [
                    {
                        model: CategoryModel,
                        attributes: ['id', 'title']
                    },
                    {
                        model: OptIngredientModel,
                        as : 'optIngredients',
                        attributes : ['id', 'name', 'price', 'status', 'addOrRem']
                    }
                ] 
            });
            if (getProduct) {
                return res.status(200).json({ message: "Product found", product: getProduct });
            } else {
                throw PRODUCT_NOT_FOUND;
            }
        }
    } catch (error) {
        next(error);
    }
}