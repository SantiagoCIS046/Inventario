import { Router } from "express";
import { 
  getUsersController, 
  createUserController, 
  updateUserController, 
  deleteUserController 
} from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Todas las rutas de gestión de usuarios están protegidas por token y requieren ser admin
router.use(verifyToken, isAdmin);

router.get("/", getUsersController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
