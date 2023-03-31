import { addOptIngredient, deleteOptIngredient, updateOptIngredient, getOptIngredient } from "../controllers/optIngredient.controller";
import { optIngredientAddSchema, optIngredientDeleteSchema, optIngredientUpdateBodySchema } from '../utils/validations/optIngredient.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { Router } from "express";

export const router = Router();

router.post('/', bodyValidate(optIngredientAddSchema), addOptIngredient);
router.delete('/:id', bodyValidate(optIngredientDeleteSchema), deleteOptIngredient);
router.put('/:id', bodyValidate(optIngredientUpdateBodySchema), updateOptIngredient);
router.get('/:id', bodyValidate(optIngredientDeleteSchema), getOptIngredient);
router.get('/', getOptIngredient);
