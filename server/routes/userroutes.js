import express from "express";
import { changeRole } from "../controller/userController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Register User
router.post("/change-role", authMiddleware, roleMiddleware("dev"), changeRole);

export default router;
