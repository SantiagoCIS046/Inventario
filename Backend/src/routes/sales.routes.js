import { Router } from "express";
import { crearVenta, obtenerVentas, obtenerVentaPorId } from "../controllers/sales.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createVentaSchema } from "../validators/sale.validator.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken); // Todas las rutas de ventas requieren token

router.post("/", validate(createVentaSchema), crearVenta);
router.get("/", obtenerVentas);
router.get("/:id", obtenerVentaPorId);

export default router;
