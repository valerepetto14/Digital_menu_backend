import { Product } from "../models/product";
import { Category } from "../models/category";
import { SubCategory } from "../models/subCategory";
import { OptIngredient } from "../models/optIngredient";
import { Request, Response, NextFunction, response } from "express";
import { checkCategoryExists, checkSubCategoryExists } from "../utils/functions";
import { PRODUCT_NOT_FOUND, PRODUCT_ALREADY_EXIST, CATEGORY_NOT_FOUND, MISSING_CATEGORY_ID, CATEGORY_OR_SUBCATEGORY_NOT_FOUND, SUB_CATEGORY_NOT_FOUND, MISSING_SEARCH } from "../utils/errors";
import { Op } from "sequelize";

export const addProduct = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { name, description, currentPrice, status, image, cookingTime, available, categoryId, optIngredients, subCategoryId } = request.body;
        const existProduct = await Product.findOne({where: {name: request.body.name}});
        if(!existProduct){
            const categoryExist = await checkCategoryExists(categoryId);
            const subCategoryExist = await checkSubCategoryExists(subCategoryId);
            if (categoryExist && subCategoryExist) {
                const newProduct = await Product.create({
                    name,
                    cookingTime,
                    description,
                    currentPrice,
                    status,
                    image,
                    available,
                    categoryId,
                    subCategoryId,
                });
                if (optIngredients && optIngredients.length > 0) {
                    console.log('hay ingredientes opcionales');
                    let ingredientsOpt = await Promise.all(
                        optIngredients.map(async (ingredient: any) => {
                            let ingredientFound = await OptIngredient.findByPk(ingredient.id);
                            if (ingredientFound) {
                                if (ingredient.variants && ingredient.variants.length > 0) {
                                    console.log('hay variantes');
                                    let variants = await Promise.all(
                                        ingredient.variants.map(async (variantId: string) => {
                                            let variant = await OptIngredient.findByPk(variantId);
                                            return variant!.id;
                                        })
                                    );
                                    ingredientFound!.variants = variants;
                                }
                            }
                            return ingredientFound!;
                        })
                    );
                    await newProduct.addOptIngredients(ingredientsOpt);
                }
                return response.status(201).json({message: "Product created", product: newProduct});
            }
            throw CATEGORY_OR_SUBCATEGORY_NOT_FOUND;
        }
        throw PRODUCT_ALREADY_EXIST;
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { categoryId, subCategoryId, name, description, currentPrice, status } = request.body;
        const id = request.params.id
        const getProduct = await Product.findOne({where: {id: id}});
        if (getProduct){
            const categoryExist = await checkCategoryExists(categoryId);
            const subCategoryExist = await checkSubCategoryExists(subCategoryId);
            if(categoryExist && subCategoryExist){
                const productUpdated = await getProduct.update({
                    name: name,
                    description: description,
                    currentPrice: currentPrice,
                    status: status,
                    categoryId: categoryId,
                    subCategoryId: subCategoryId
                });
                if(request.body.optIngredientsId && request.body.optIngredientsId.length > 0){
                    let ingredientsOpt: OptIngredient[] = await Promise.all(request.body.optIngredientsId.map(async (ingredientId: string) => {
                        let ingredient = await OptIngredient.findByPk(ingredientId);
                        return ingredient!;
                    }));
                    await productUpdated.addOptIngredients(ingredientsOpt);
                }
                return response.status(200).json({message: "Product updated", product: productUpdated});
            }
            throw CATEGORY_OR_SUBCATEGORY_NOT_FOUND;
        } else {
            throw PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'description', 'currentPrice', 'status', 'image', 'cookingTime'],
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'title'],
                },
                {
                    model: SubCategory,
                    as: 'subCategory',
                    attributes: ['id', 'title'],
                },
                {
                    model: OptIngredient,
                    as: 'optIngredients',
                    attributes: ['id', 'name', 'price'],
                    through: { attributes: [] },
                },
            ],
        });

        let responseBody = {
            message: "Products found",
            products: products,
        };

        return response.status(200).json(responseBody);
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        if(id){
            const getProduct = await Product.findOne({ 
                where: { id: id },
                attributes: ['id', 'name', 'description', 'currentPrice', 'status', 'image', 'cookingTime'],
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'title'],
                        as: 'category',
                    },
                    {
                        model: SubCategory,
                        attributes: ['id', 'title'],
                        as: 'subCategory',
                    },
                    {
                        model: OptIngredient,
                        attributes: ['id', 'name', 'price'],
                        as: 'optIngredients',
                    },
                ],
            });
            //get variants of optIngredients
            if (getProduct) {
                const productToJSON = getProduct.toJSON();
                for (const optIngredient of productToJSON.optIngredients) {
                    let variantsIds = optIngredient.OptIngredientProduct.variants;
                    delete optIngredient.OptIngredientProduct;
                    optIngredient.variants = [];
                    if (variantsIds && variantsIds.length > 0) {
                        for (const variantId of variantsIds) {
                            let variant = await OptIngredient.findByPk(variantId, {
                                attributes: ['id', 'name', 'price'],
                            });
                            optIngredient.variants.push(variant!);
                        }
                    }
                }
                let responseBody = {
                    message: "Product found",
                    product: productToJSON,
                }
                return response.status(200).json(responseBody);
            }
            throw PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId;
        if(categoryId){
            const categoryExist = await checkCategoryExists(categoryId);
            if (categoryExist) {
                const products = await Product.findAll({
                    include: [
                        {
                            model: Category,
                            attributes: ['id', 'title'],
                            as: 'category',
                            where: { id: categoryId },
                        },
                        {
                            model: SubCategory,
                            attributes: ['id', 'title'],
                            as: 'subCategory',
                        },
                        {
                            model: OptIngredient,
                            as : 'optIngredients',
                            attributes : ['id', 'name', 'price', 'status'],
                            through: { attributes: [] }
                        }
                    ] 
                })
                return response.status(200).json({message: "Products found", products: products});
            }
            throw CATEGORY_NOT_FOUND;
        }
        throw MISSING_CATEGORY_ID;
    } catch (error) {
        next(error);
    }
};

export const getProductsBySubCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { subCategoryId } = request.params;
        if(subCategoryId){
            const subCategoryExist = await checkSubCategoryExists(subCategoryId);
            if (subCategoryExist) {
                const products = await Product.findAll({
                    include: [
                        {
                            model: Category,
                            attributes: ['id', 'title'],
                            as: 'category',
                        },
                        {
                            model: SubCategory,
                            attributes: ['id', 'title'],
                            as: 'subCategory',
                            where: { id: subCategoryId },
                        },
                        {
                            model: OptIngredient,
                            as : 'optIngredients',
                            attributes : ['id', 'name', 'price', 'status'],
                            through: { attributes: [] }
                        }
                    ] 
                })
                return response.status(200).json({message: "Products found", products: products});
            }
            throw SUB_CATEGORY_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
    //low logic delete
    try {
        const { id } = request.params;
        const getProduct = await Product.findByPk(id);
        if (getProduct) {
            await getProduct.update({
                status: false,
            });
            return response.status(200).json({message: "Product deleted"});
        } 
        throw PRODUCT_NOT_FOUND;
    } catch (error) {
        next(error);
    }
};

export const searchProducts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { search } = request.query as any;
        console.log(search);
        if (search && search != '' && search != undefined) {
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'title'],
                        as: 'category',
                    },
                    {
                        model: SubCategory,
                        attributes: ['id', 'title'],
                        as: 'subCategory',
                    },
                    {
                        model: OptIngredient,
                        attributes: ['id', 'name', 'price'],
                        as: 'optIngredients',
                    },
                ],
            });
            return response.status(200).json({message: "Products found", products: products});
        } else {
            throw MISSING_SEARCH;
        }
    } catch (error) {
        next(error);
    }
};
