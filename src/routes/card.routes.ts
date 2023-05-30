import { Router } from 'express';
import { addCard } from '../controllers/card.controller';
export const router = Router();

router.post("/", addCard);