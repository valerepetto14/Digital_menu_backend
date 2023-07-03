import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller';
import { isAdmin } from '../middlewares/auth.middlware';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { registerSchema, loginSchema } from '../utils/validations/auth.validate';
export const router = Router();

router.post('/signup', bodyValidate(registerSchema), signUp);
router.post('/signin', bodyValidate(loginSchema), signIn);
router.post('/signout', signOut);