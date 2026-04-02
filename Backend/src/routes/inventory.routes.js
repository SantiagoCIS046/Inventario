import { Router } from "express";
import { registrarMovimiento, obtenerKardex } from "../controllers/inventory.controller.js";

const router = Router();

router.post("/", registrarMovimiento);
router.get("/kardex", obtenerKardex);

export default router;
