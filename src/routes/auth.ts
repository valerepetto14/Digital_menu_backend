import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/auth';
import { isAdmin } from '../middlewares/auth';

export const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);