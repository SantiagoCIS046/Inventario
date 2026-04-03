import { Router } from "express";
import { getDashboard, exportVentas } from "../controllers/report.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/dashboard", verifyToken, isAdmin, getDashboard);
router.get("/ventas/excel", verifyToken, isAdmin, exportVentas);

export default router;
