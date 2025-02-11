import mongoose, { Types } from "mongoose";
import { User, UserInterface } from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface RegisterUserInterface extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

interface LoginUserInterface extends Request {
  body: {
    email: string | undefined;
    password: string | undefined;
  };
}

interface GetUserByIdInterface extends Request {
  params: {
    id: string;
  };
}

export type JWT_Payload = {
  _id: UserInterface["_id"];
};

// Register User
export const register = async (req: RegisterUserInterface, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const role: UserInterface["role"] = "volunteer";

    //Check if any field is empty
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    /// Create JWT token using the type JWT_Payload
    const payload: JWT_Payload = { _id: newUser._id };
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      res.status(500).json({
        message: "JWT_SECRET is not defined in environment variables",
      });
      return;
    }
    const expiresIn = process.env.JWT_EXPIRATION
      ? parseInt(process.env.JWT_EXPIRATION, 10)
      : "1h";
    const token = jwt.sign(payload, secretKey, { expiresIn });

    //Set token in cookie as auth_token
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
    });

    //Return token and the user but not the password
    const { password: _, ...userWithoutPassword } = newUser.toObject(); // Convert Mongoose document to plain object

    res
      .status(200)
      .json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const login = async (req: LoginUserInterface, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    // Create JWT token using the type JWT_Payload
    const payload: JWT_Payload = { _id: user._id };
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      res.status(500).json({
        message: "JWT_SECRET is not defined in environment variables",
      });
      return;
    }
    const expiresIn = process.env.JWT_EXPIRATION
      ? parseInt(process.env.JWT_EXPIRATION, 10)
      : "1h";

    const token = jwt.sign(payload, secretKey, { expiresIn });

    //Set token in cookie as auth_token
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
    });

    //Return token and the user but not the password
    const { password: _, ...userWithoutPassword } = user.toObject(); // Convert Mongoose document to plain object

    res
      .status(200)
      .json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get user info

export const getUser = async (req: Request, res: Response) => {
  try {
    // Get token from request header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not found" });
      return;
    }

    // Verify the token
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      res.status(500).json({
        message: "JWT_SECRET is not defined in environment variables",
      });
      return;
    }
    const decoded = jwt.verify(token, secretKey) as JWT_Payload;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(decoded._id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Return the user but not the password
    const { password: _, ...userWithoutPassword } = user.toObject(); // Convert Mongoose document to plain object

    res.status(200).json({
      message: "User found",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Get user by ID
export const getUserById = async (req: GetUserByIdInterface, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Return the user but not the password
    const { password: _, ...userWithoutPassword } = user.toObject(); // Convert Mongoose document to plain object

    res.status(200).json({
      message: "User found",
      user: userWithoutPassword,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all user
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    // Return the user but not the password
    const usersWithoutPassword = users.map((user) => {
      const { password: _, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.status(200).json({
      message: "Users found",
      users: usersWithoutPassword,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
