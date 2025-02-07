import { User, UserInterface } from "../models/User";
import { Request, Response } from "express";

interface ChangeRoleRequest extends Request {
  body: {
    email: string;
    role: UserInterface["role"];
  };
}

// change user role
export const changeRole = async (req: ChangeRoleRequest, res: Response) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      res.status(400).json({ message: "Please provide email and role" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
