import { errorResponse } from "../models/errors";

export const USER_ALREADY_EXISTS = new errorResponse("User already exists", 400);
export const INCORRECT_CREDENTIALS = new errorResponse("Incorrect credentials", 400);
export const UNAUTHORIZED = new errorResponse("Unauthorized", 401);