import { addOptIngredient, deleteOptIngredient, updateOptIngredient, getOptIngredient } from "../controllers/optIngredient.controller";
import { optIngredientAddSchema, optIngredientDeleteSchema, optIngredientUpdateBodySchema } from '../utils/validations/optIngredient.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const optIngredientsRouter = Router();

optIngredientsRouter.post('/', isAuthenticated, bodyValidate(optIngredientAddSchema), addOptIngredient);
optIngredientsRouter.delete('/:id', isAuthenticated, bodyValidate(optIngredientDeleteSchema), deleteOptIngredient);
optIngredientsRouter.put('/:id', isAuthenticated, bodyValidate(optIngredientUpdateBodySchema), updateOptIngredient);
optIngredientsRouter.get('/:id', bodyValidate(optIngredientDeleteSchema), getOptIngredient);
optIngredientsRouter.get('/', getOptIngredient);
