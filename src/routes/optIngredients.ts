import { addOptIngregient, deleteOptIngregient, updateOptIngregient, getOptIngregient } from "../controllers/optIngredient";
import { Router } from "express";

export const router = Router();

router.post('/', addOptIngregient);
router.delete('/:id', deleteOptIngregient);
router.put('/:id', updateOptIngregient);
router.get('/', getOptIngregient);