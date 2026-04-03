import { Router } from "express";
import { 
  createProductController, 
  getProductsController, 
  borrarProducto 
} from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProductSchema } from "../validators/product.validator.js";

const router = Router();

router.post("/", verifyToken, isAdmin, validate(createProductSchema), createProductController);
router.get("/", getProductsController);
router.delete("/:id", verifyToken, isAdmin, borrarProducto);

export default router;
