import { Router } from 'express';
import { validateUser, getUsers, updateUser, deleteUser } from '../controllers/users.controller';
import { isAuthenticated } from '../middlewares/auth.middlware';

export const router = Router();

router.get('/validate', validateUser);
router.get('', isAuthenticated, getUsers );
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);
