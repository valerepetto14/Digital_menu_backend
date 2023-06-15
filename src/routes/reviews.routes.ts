import { Router } from 'express';
import { createReview } from '../controllers/reviews.controller';
import bodyValidate from '../middlewares/bodyValidate.middleware';
import { addReviewSchema } from '../utils/validations/reviews.validate';

export const reviewsRouter = Router();

reviewsRouter.post('/', bodyValidate(addReviewSchema), createReview);