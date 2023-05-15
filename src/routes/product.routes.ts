import { addProduct, deleteProduct, updateProduct, getProduct, getProducts, getProductsByCategory, getProductsBySubCategory } from "../controllers/products.controller";
import { productAddSchema, productUpdateBodySchema } from '../utils/validations/product.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/subCategory/:subCategoryId', getProductsBySubCategory);
router.post('/', isAuthenticated, bodyValidate(productAddSchema), addProduct);
router.delete('/:id', isAuthenticated, deleteProduct);
router.put('/:id', isAuthenticated, updateProduct);