import { addCategory, deleteCategory, updateCategory, getCategories, getCategory } from "../controllers/categories.controller";
import { categoryAddSchema, categoryUpdateSchema } from '../utils/validations/category.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory)
router.post('/', isAuthenticated, bodyValidate(categoryAddSchema), addCategory);
router.put('/:id', isAuthenticated, bodyValidate(categoryUpdateSchema), updateCategory);
router.delete('/:id', isAuthenticated, deleteCategory);
