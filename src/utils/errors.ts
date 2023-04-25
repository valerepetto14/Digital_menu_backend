import { errorResponse } from "../models/errors";

export const USER_ALREADY_EXISTS = new errorResponse("User already exists", 400);
export const INCORRECT_CREDENTIALS = new errorResponse("Incorrect credentials", 401);
export const UNAUTHORIZED = new errorResponse("Unauthorized", 401);
export const USER_NOT_FOUND = new errorResponse("User not found", 400);
export const CATEGORY_NOT_FOUND = new errorResponse("Category not found", 400);
export const CATEGORY_ALREADY_EXIST = new errorResponse("Category already exist", 400);
export const OPTINGREDIENT_NOT_FOUND = new errorResponse("Ingredient not found", 400);
export const OPTINGREDIENT_ALREADY_EXIST = new errorResponse("Ingredient already exist", 400);
export const INGREDIENT_REMOVED_NOT_ADDED_PRICE = new errorResponse("Ingredient removed not added price", 400);
export const PRODUCT_NOT_FOUND = new errorResponse("Ingredient not found", 400);
export const PRODUCT_ALREADY_EXIST = new errorResponse("Product already exist", 400);