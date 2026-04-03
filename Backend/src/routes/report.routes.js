import { Router } from "express";
import { getDashboard } from "../controllers/report.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/dashboard", verifyToken, isAdmin, getDashboard);

export default router;
