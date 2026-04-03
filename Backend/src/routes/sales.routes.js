import { Router } from "express";
import { crearVenta } from "../controllers/sales.controller.js";

const router = Router();

router.post("/", crearVenta);

export default router;
