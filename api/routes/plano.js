import express from 'express';
import { getPlano, addPlano, updatePlano, deletePlano } from "../controllers/plano.js";

const router = express.Router();

router.get("/plano", getPlano);

router.post("/plano", addPlano);

router.put("/plano:id", updatePlano);

router.delete("/plano:id", deletePlano);

export default router;