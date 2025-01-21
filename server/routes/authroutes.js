import express from "express";
import {
  register,
  getUser,
  login,
  getUserById,
  getAllUser,
} from "../controller/authController.js";
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

//Get user by ID
// router.get("/users/:id", authMiddleware, getUserById);

//Get all user
router.get("/users", authMiddleware, roleMiddleware("dev"), getAllUser);

export default router;
