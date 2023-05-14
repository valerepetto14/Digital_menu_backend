import { addSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory } from "../controllers/subCategories.controller";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middlware";
import bodyValidate from "../middlewares/bodyValidate.middleware";
import { addSubCategorySchema } from "../utils/validations/subCategories.validate";

export const router = Router();

router.post("/", isAuthenticated, bodyValidate(addSubCategorySchema), addSubCategory);
router.get("/", getSubCategories);
router.get("/:id", getSubCategory);
router.delete("/:id", isAuthenticated, deleteSubCategory);
router.put("/:id", isAuthenticated, updateSubCategory);