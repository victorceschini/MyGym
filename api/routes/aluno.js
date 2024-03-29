import express from 'express';
import { getAluno, addAluno, updateAluno, deleteAluno } from "../controllers/aluno.js";

const router = express.Router();

router.get("/aluno", getAluno);

router.post("/aluno", addAluno);

router.put("/aluno:id", updateAluno);

router.delete("/aluno:id", deleteAluno);

export default router;