import { addSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory } from "../controllers/subCategories";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middlware";
import bodyValidate from "../middlewares/bodyValidate.middleware";
import { addSubCategorySchema } from "../utils/validations/subCategories.validate";

export const subCategoriesRouter = Router();

subCategoriesRouter.post("/", isAuthenticated, bodyValidate(addSubCategorySchema), addSubCategory);
subCategoriesRouter.get("/", getSubCategories);
subCategoriesRouter.get("/:id", getSubCategory);
subCategoriesRouter.delete("/:id", isAuthenticated, deleteSubCategory);
subCategoriesRouter.put("/:id", isAuthenticated, updateSubCategory);