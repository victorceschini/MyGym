import express from "express";
import {
    getEquipamento,
    addEquipamento,
    updateEquipamento,
    deleteEquipamento,
} from "../controllers/equipamento.js";

const router = express.Router();

router.get("/equipamento", getEquipamento);

router.post("/equipamento", addEquipamento);

router.put("/equipamento:id", updateEquipamento);

router.delete("/equipamento:id", deleteEquipamento);

export default router;
