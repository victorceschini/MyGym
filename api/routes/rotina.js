import express from 'express';
import { getRotina, addRotina, updateRotina, deleteRotina, getRotinas } from "../controllers/rotina.js";

const router = express.Router();

router.get("/rotina", getRotina);

router.post("/rotina", addRotina);

router.get("/rotinas", getRotinas);

router.put("/rotina:id", updateRotina);

router.delete("/rotina:id", deleteRotina);

export default router;