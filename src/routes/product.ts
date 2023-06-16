import { addProduct, deleteProduct, updateProduct, getProduct, getProducts, getProductsByCategory, getProductsBySubCategory, searchProducts } from "../controllers/products";
import { productAddSchema, productUpdateBodySchema } from '../utils/validations/product.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from "../middlewares/auth.middlware";
import { Router } from "express";

export const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/search', searchProducts);
productsRouter.get('/:id', getProduct);
productsRouter.get('/category/:categoryId', getProductsByCategory);
productsRouter.get('/subCategory/:subCategoryId', getProductsBySubCategory);
productsRouter.post('/', isAuthenticated, bodyValidate(productAddSchema), addProduct);
productsRouter.delete('/:id', isAuthenticated, deleteProduct);
productsRouter.put('/:id', isAuthenticated, updateProduct);