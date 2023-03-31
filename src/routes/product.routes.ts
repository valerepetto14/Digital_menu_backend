import { addProduct, deleteProduct, updateProduct, getProduct } from "../controllers/products.controller";
import { productAddSchema, productDeleteSchema, productUpdateBodySchema } from '../utils/validations/product.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { Router } from "express";

export const router = Router();

router.post('/', bodyValidate(productAddSchema), addProduct);
router.delete('/:id', bodyValidate(productDeleteSchema), deleteProduct);
router.put('/:id', bodyValidate(productUpdateBodySchema), updateProduct);
router.get('/:id', bodyValidate(productDeleteSchema), getProduct);
router.get('/', getProduct);