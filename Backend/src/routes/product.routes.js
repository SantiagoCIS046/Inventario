import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, isAdmin, createProduct);
router.get("/", getProducts);

export default router;
