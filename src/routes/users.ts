import { Router } from 'express';
import { validateUser, getUsers, updateUser, deleteUser } from '../controllers/users';
import { userUpdateSchema } from '../utils/validations/users.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { isAuthenticated } from '../middlewares/auth.middlware';

export const usersRouter = Router();

usersRouter.get('/validate', validateUser);
usersRouter.get('', getUsers );
usersRouter.put('/:id', isAuthenticated, bodyValidate(userUpdateSchema), updateUser);
usersRouter.delete('/:id', isAuthenticated, deleteUser);
 