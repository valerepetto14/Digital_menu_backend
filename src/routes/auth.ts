import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/auth';
import { isAuthenticated } from '../middlewares/auth.middlware';
import { returnUser } from '../controllers/users';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { registerSchema, loginSchema } from '../utils/validations/auth.validate';

export const authRouter = Router();

authRouter.post('/signup', bodyValidate(registerSchema), signUp);
authRouter.post('/signin', bodyValidate(loginSchema), signIn);
authRouter.get('/signout', isAuthenticated, signOut);

authRouter.get('/checkAuth', isAuthenticated, returnUser);
