import { Router } from 'express';
import { addCard } from '../controllers/card';

export const cardRouter = Router();

cardRouter.post("/", addCard);