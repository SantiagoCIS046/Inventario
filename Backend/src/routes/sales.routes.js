import { Router } from "express";
import { crearVenta, obtenerVentas } from "../controllers/sales.controller.js";

const router = Router();

router.post("/", crearVenta);
router.get("/", obtenerVentas);

export default router;
