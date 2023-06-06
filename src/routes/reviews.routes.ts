import { Router } from 'express';
import { createReview } from '../controllers/reviews.controller';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { addReviewSchema } from '../utils/validations/reviews.validate';

export const router = Router();

router.post('/', bodyValidate(addReviewSchema), createReview);