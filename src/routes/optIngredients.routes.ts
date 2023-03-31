import { addOptIngregient, deleteOptIngregient, updateOptIngregient, getOptIngregient } from "../controllers/optIngredient.controller";
import { Router } from "express";

export const router = Router();

router.post('/', addOptIngregient);
router.delete('/:id', deleteOptIngregient);
router.put('/:id', updateOptIngregient);
router.get('/', getOptIngregient);
router.get('/:id', getOptIngregient);