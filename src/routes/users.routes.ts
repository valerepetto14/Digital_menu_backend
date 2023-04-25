import { Router } from 'express';
import { validateUser, getUsers, updateUser, deleteUser } from '../controllers/users.controller';
import { userUpdateSchema } from '../utils/validations/users.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from '../middlewares/auth.middlware';
export const router = Router();

router.get('/validate', validateUser);
router.get('', getUsers );
router.put('/:id', isAuthenticated, bodyValidate(userUpdateSchema), updateUser);
router.delete('/:id', isAuthenticated, deleteUser);
