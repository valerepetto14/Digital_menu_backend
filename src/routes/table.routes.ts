import { Router } from 'express';
import { addTable } from '../controllers/table.controller';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { addTableSchema } from '../utils/validations/table.validate';
import { isAuthenticated } from '../middlewares/auth.middlware';

export const router = Router();

router.post("/", isAuthenticated, bodyValidate(addTableSchema), addTable);