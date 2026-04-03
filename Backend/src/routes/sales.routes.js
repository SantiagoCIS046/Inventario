import { Router } from "express";
import { crearVenta, obtenerVentas } from "../controllers/sales.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createVentaSchema } from "../validators/sale.validator.js";

const router = Router();

router.post("/", validate(createVentaSchema), crearVenta);
router.get("/", obtenerVentas);

export default router;
