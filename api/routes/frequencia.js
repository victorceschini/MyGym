import express from 'express';
import { getFrequencia, addFrequencia, updateFrequencia, deleteFrequencia } from "../controllers/frequencia.js";

const router = express.Router();

router.get("/frequencia", getFrequencia);

router.post("/frequencia", addFrequencia);

router.put("/frequencia:id", updateFrequencia);

router.delete("/frequencia:id", deleteFrequencia);

export default router;