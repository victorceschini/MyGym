import express from "express";
import {
    getAvaliacao,
    getAvaliacaoByAluno,
    getAvaliacaoByProfessor,
    addAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
} from "../controllers/avaliacao.js";

const router = express.Router();

router.get("/avaliacao/:id", getAvaliacao);

router.get("/avaliacao/aluno/:id", getAvaliacaoByAluno);

router.get("/avaliacao/professor/:id", getAvaliacaoByProfessor);

router.post("/avaliacao", addAvaliacao);

router.put("/avaliacao:id", updateAvaliacao);

router.delete("/avaliacao:id", deleteAvaliacao);

export default router;
