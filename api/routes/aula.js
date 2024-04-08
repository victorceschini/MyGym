import express from 'express';
import { getAula, addAula, updateAula, deleteAula } from "../controllers/aula.js";

const router = express.Router();

router.get("/aula", getAula);

router.post("/aula", addAula);

router.put("/aula:id", updateAula);

router.delete("/aula:id", deleteAula);

export default router;