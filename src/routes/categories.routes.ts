import { addCategory, deleteCategory, updateCategory, getCategories, getCategory } from "../controllers/categories.controller";
import { categoryAddSchema, categoryUpdateSchema } from '../utils/validations/category.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getCategory)
categoriesRouter.post('/', isAuthenticated, bodyValidate(categoryAddSchema), addCategory);
categoriesRouter.put('/:id', isAuthenticated, bodyValidate(categoryUpdateSchema), updateCategory);
categoriesRouter.delete('/:id', isAuthenticated, deleteCategory);
