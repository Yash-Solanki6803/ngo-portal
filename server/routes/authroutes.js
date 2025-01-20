import express from "express";
import { register, getUser, login } from "../controller/authController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

//Get user
router.get("/user", authMiddleware, getUser);

export default router;
