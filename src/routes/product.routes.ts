import { addProduct, deleteProduct, updateProduct, getProduct, getProducts, getProductsByCategory } from "../controllers/products.controller";
import { productAddSchema, productDeleteSchema, productUpdateBodySchema } from '../utils/validations/product.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/category/:categoryId', getProductsByCategory);
router.post('/', isAuthenticated, bodyValidate(productAddSchema), addProduct);
router.delete('/:id', isAuthenticated, bodyValidate(productDeleteSchema), deleteProduct);
router.put('/:id', isAuthenticated, bodyValidate(productUpdateBodySchema), updateProduct);