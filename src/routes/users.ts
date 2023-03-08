import { Router } from 'express';
import { validateUser } from '../controllers/users';
import { isAuthenticated } from '../middlewares/auth';

export const router = Router();

router.get('/validate', validateUser);

