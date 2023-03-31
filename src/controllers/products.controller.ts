import { Product, ProductModel } from "../models/product";
import { Request, Response, NextFunction } from "express";
import { productAddSchema, productDeleteSchema, productUpdateBodySchema, productUpdateParamSchema } from "../utils/validations/product.validate";
import { errorResponse } from "../models/errors";
import uuid4 from "uuid4";
import { PRODUCT_NOT_FOUND, PRODUCT_ALREADY_EXIST } from "../utils/errors";


export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existProduct = await ProductModel.findOne({where: {name: req.body.name}});
        if(!existProduct){
            const newProduct = await ProductModel.create({
                id: uuid4(),
                name: req.body.name
            })
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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if(id){
            const getProduct = await ProductModel.findOne({ where: { id: id } });
            if (getProduct) {
                return res.status(200).json({ message: "Product found", product: getProduct });
            } else {
                throw PRODUCT_NOT_FOUND;
            }
        }
        const products = await ProductModel.findAll();
        return res.status(200).json({ message: "Products found", products: products });
    } catch (error) {
        next(error);
    }
}