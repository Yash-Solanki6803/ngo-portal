import mongoose from "mongoose";
import { User } from "../models/index.js";

// change user role
export const changeRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      throw new Error("Please fill in all fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
