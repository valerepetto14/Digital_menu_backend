import { Router } from 'express';
import { Register, Login } from '../controllers/auth';

export const router = Router();

router.post('/register', Register);
router.post('/login', Login);