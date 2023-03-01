import { Router } from 'express';
import { signUp, signIn, logout } from '../controllers/auth';
import { isAdmin } from '../middlewares/auth';

export const router = Router();

router.post('/signUp', isAdmin, signUp);
router.post('/signIn', signIn);
router.post('/logout', logout);