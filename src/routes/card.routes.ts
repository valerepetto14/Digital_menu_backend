import { Router } from 'express';
import { addCard } from '../controllers/card.controller';

export const cardRouter = Router();

cardRouter.post("/", addCard);