import { Router } from "express";
import { 
  getInvoicesController, 
  getInvoiceByIdController, 
  createInvoiceController 
} from "../controllers/invoice.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createVentaSchema } from "../validators/sale.validator.js";

const router = Router();

router.use(verifyToken);

router.get("/", getInvoicesController);
router.get("/:id", getInvoiceByIdController);
router.post("/", validate(createVentaSchema), createInvoiceController);

export default router;
