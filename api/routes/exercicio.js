import express from 'express';
import { getExercicio, addExercicio, updateExercicio, deleteExercicio } from "../controllers/exercicio.js";

const router = express.Router();

router.get("/exercicio", getExercicio);

router.post("/exercicio", addExercicio);

router.put("/exercicio:id", updateExercicio);

router.delete("/exercicio:id", deleteExercicio);

export default router;