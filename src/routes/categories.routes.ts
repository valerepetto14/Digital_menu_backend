import { addCategory, deleteCategory, updateCategory, getCategories } from "../controllers/categories.controller";
import { categoryAddSchema, categoryDeleteSchema, categoryUpdateSchema } from '../utils/validations/category.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { Router } from "express";

export const router = Router();

router.post('/', bodyValidate(categoryAddSchema), addCategory);
router.delete('/:id', bodyValidate(categoryDeleteSchema), deleteCategory);
router.put('/:id', bodyValidate(categoryUpdateSchema), updateCategory);
router.get('/', getCategories);
