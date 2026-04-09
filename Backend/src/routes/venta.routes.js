import { Router } from "express";
import * as controller from "../controllers/venta.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Endpoint para crear una venta
router.post("/", verifyToken, controller.crearVenta);

export default router;
