import { Router } from 'express';
import { validateUser, getUsers, updateUser, deleteUser } from '../controllers/users.controller';
import { userUpdateSchema } from '../utils/validations/users.validate';
import bodyValidate from '../middlewares/bodyValidate.middleware';

export const router = Router();

router.get('/validate', validateUser);
router.get('', getUsers );
router.put('/:id', bodyValidate(userUpdateSchema), updateUser);
router.delete('/:id', deleteUser);
