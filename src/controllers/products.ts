import { Product } from '../models/product';
import { Category } from '../models/category';
import { SubCategory } from '../models/subCategory';
import { OptIngredient } from '../models/optIngredient';
import { Request, Response, NextFunction, response } from 'express';
import { checkCategoryExists, checkSubCategoryExists } from '../utils/functions';
import {
    PRODUCT_NOT_FOUND,
    PRODUCT_ALREADY_EXIST,
    CATEGORY_NOT_FOUND,
    MISSING_CATEGORY_ID,
    CATEGORY_OR_SUBCATEGORY_NOT_FOUND,
    SUB_CATEGORY_NOT_FOUND,
    MISSING_SEARCH,
} from '../utils/errors';
import { pagination } from '../utils/functions';
import { Op } from 'sequelize';

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            description,
            currentPrice,
            status,
            image,
            cookingTime,
            available,
            categoryId,
            optIngredients,
            subCategoryId,
        } = req.body;
        const existProduct = await Product.findOne({ where: { name: req.body.name } });
        if (!existProduct) {
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
                return res.status(201).json({ message: 'Product created', product: newProduct });
            }
            throw CATEGORY_OR_SUBCATEGORY_NOT_FOUND;
        }
        throw PRODUCT_ALREADY_EXIST;
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const getProduct = await Product.findOne({ where: { id: id } });
        if (getProduct) {
            const categoryExist = await checkCategoryExists(req.body.categoryId);
            const subCategoryExist = await checkSubCategoryExists(req.body.subCategoryId);
            if (categoryExist && subCategoryExist) {
                const productUpdated = await getProduct.update({
                    name: req.body.name,
                    description: req.body.description,
                    currentPrice: req.body.currentPrice,
                    status: req.body.status,
                    available: req.body.available,
                    categoryId: req.body.categoryId,
                    subCategoryId: req.body.subCategoryId,
                });
                if (req.body.optIngredientsId && req.body.optIngredientsId.length > 0) {
                    let ingredientsOpt: OptIngredient[] = await Promise.all(
                        req.body.optIngredientsId.map(async (ingredientId: string) => {
                            let ingredient = await OptIngredient.findByPk(ingredientId);
                            return ingredient!;
                        })
                    );
                    await productUpdated.addOptIngredients(ingredientsOpt);
                }
                return res.status(200).json({ message: 'Product updated', product: productUpdated });
            }
            throw CATEGORY_OR_SUBCATEGORY_NOT_FOUND;
        } else {
            throw PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
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

        let response = {
            message: 'Products found',
            products: products,
        };

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (id) {
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
                let response = {
                    message: 'Product found',
                    product: productToJSON,
                };
                return res.status(200).json(response);
            }
            throw PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.categoryId;
        if (categoryId) {
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
                            attributes: ['id', 'name', 'price'],
                            as: 'optIngredients',
                        },
                    ],
                });
                return res.status(200).json({ message: 'Products found', products: products });
            }
            throw CATEGORY_NOT_FOUND;
        }
        throw MISSING_CATEGORY_ID;
    } catch (error) {
        next(error);
    }
};

export const getProductsBySubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subCategoryId } = req.params;
        if (subCategoryId) {
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
                            attributes: ['id', 'name', 'price'],
                            as: 'optIngredients',
                        },
                    ],
                });
                return res.status(200).json({ message: 'Products found', products: products });
            }
            throw SUB_CATEGORY_NOT_FOUND;
        }
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    //low logic delete
    try {
        const { id } = req.params;
        const getProduct = await Product.findByPk(id);
        if (getProduct) {
            await getProduct.update({
                status: false,
            });
            return res.status(200).json({ message: 'Product deleted' });
        }
        throw PRODUCT_NOT_FOUND;
    } catch (error) {
        next(error);
    }
};

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search } = req.query as any;
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
            return res.status(200).json({ message: 'Products found', products: products });
        } else {
            throw MISSING_SEARCH;
        }
    } catch (error) {
        next(error);
    }
};
