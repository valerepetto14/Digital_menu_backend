import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/auth';
import { isAdmin } from '../middlewares/auth.middlware';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { registerSchema, loginSchema } from '../utils/validations/auth.validate';

export const authRouter = Router();

authRouter.post('/signup', bodyValidate(registerSchema), signUp);
authRouter.post('/signin', bodyValidate(loginSchema), signIn);
authRouter.post('/signout', signOut);