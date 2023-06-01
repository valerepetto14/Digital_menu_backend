import { errorResponse } from "../models/errors";

export const USER_ALREADY_EXISTS = new errorResponse("User already exists", 400);
export const USER_NOT_FOUND = new errorResponse("User not found", 404);

//auth
export const INCORRECT_CREDENTIALS = new errorResponse("Incorrect credentials", 401);
export const UNAUTHORIZED = new errorResponse("Unauthorized", 401);


//category
export const CATEGORY_NOT_FOUND = new errorResponse("Category not found", 404);
export const MISSING_CATEGORY_ID = new errorResponse("Missing category id", 400);
export const CATEGORY_ALREADY_EXIST = new errorResponse("Category already exist", 400);
export const CATEGORY_OR_SUBCATEGORY_NOT_FOUND = new errorResponse("Category or subcategory not found", 404);

//optIngredients
export const OPTINGREDIENT_NOT_FOUND = new errorResponse("Ingredient not found", 404);
export const OPTINGREDIENT_ALREADY_EXIST = new errorResponse("Ingredient already exist", 400);
export const INGREDIENT_REMOVED_NOT_ADDED_PRICE = new errorResponse("Ingredient removed not added price", 400);

//products
export const PRODUCT_NOT_FOUND = new errorResponse("Ingredient not found", 404);
export const PRODUCT_ALREADY_EXIST = new errorResponse("Product already exist", 400);

//subCategories 
export const SUB_CATEGORY_NOT_FOUND = new errorResponse("Sub category not found", 404);
export const SUB_CATEGORY_ALREADY_EXISTS = new errorResponse("Sub category already exists", 400);

//tables
export const TABLE_NOT_FOUND = new errorResponse("Table not found", 404);