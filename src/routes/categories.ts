import { 
    addCategory, 
    deleteCategory, 
    updateCategory, 
    getCategories, 
    getCategory,
    loadCategory
} from "../controllers/categories";
import { categoryAddSchema, categoryUpdateSchema } from '../utils/validations/category.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const categoriesRouter = Router();

categoriesRouter.param('id', loadCategory);

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getCategory)
categoriesRouter.post('/', isAuthenticated, bodyValidate(categoryAddSchema), addCategory);
categoriesRouter.put('/:id', isAuthenticated, bodyValidate(categoryUpdateSchema), updateCategory);
categoriesRouter.delete('/:id', isAuthenticated, deleteCategory);
