import { addProduct, deleteProduct, updateProduct, getProduct } from "../controllers/products.controller";
import { productAddSchema, productDeleteSchema, productUpdateBodySchema } from '../utils/validations/product.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const router = Router();

router.get('/', getProduct);
router.get('/:id', bodyValidate(productDeleteSchema), getProduct);
router.post('/', isAuthenticated, bodyValidate(productAddSchema), addProduct);
router.delete('/:id', isAuthenticated, bodyValidate(productDeleteSchema), deleteProduct);
router.put('/:id', isAuthenticated, bodyValidate(productUpdateBodySchema), updateProduct);