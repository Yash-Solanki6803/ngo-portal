import { Router } from "express";
import { changeRole } from "../controller/userController";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Register User
router.post("/change-role", authMiddleware, roleMiddleware("dev"), changeRole);

export default router;
