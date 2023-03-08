import { addCategory, deleteCategory, updateCategory, getCategories } from "../controllers/categories";
import { Router } from "express";

export const router = Router();

router.post('/', addCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);
router.get('/', getCategories);
