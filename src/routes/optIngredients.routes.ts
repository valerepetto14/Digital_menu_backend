import { addOptIngredient, deleteOptIngredient, updateOptIngredient, getOptIngredient } from "../controllers/optIngredient.controller";
import { optIngredientAddSchema, optIngredientDeleteSchema, optIngredientUpdateBodySchema } from '../utils/validations/optIngredient.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const router = Router();

router.post('/', isAuthenticated, bodyValidate(optIngredientAddSchema), addOptIngredient);
router.delete('/:id', isAuthenticated, bodyValidate(optIngredientDeleteSchema), deleteOptIngredient);
router.put('/:id', isAuthenticated, bodyValidate(optIngredientUpdateBodySchema), updateOptIngredient);
router.get('/:id', bodyValidate(optIngredientDeleteSchema), getOptIngredient);
router.get('/', getOptIngredient);
