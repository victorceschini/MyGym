import express from 'express';
import { getProfessor, addProfessor, updateProfessor, deleteProfessor } from "../controllers/professor.js";

const router = express.Router();

router.get("/professor", getProfessor);

router.post("/professor", addProfessor);

router.put("/professor:id", updateProfessor);

router.delete("/professor:id", deleteProfessor);

export default router;