import mongoose from "mongoose";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = "volunteer";

    //Check if any field is empty
    if (!name || !email || !password) {
      throw new Error("Please fill in all fields");
    }

    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    //Throw the error caught
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if any field is empty
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    //Set token in cookie as auth_token
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    //Return token and the user but not the password
    const { password: _, ...userWithoutPassword } = user._doc;

    res
      .status(200)
      .json({ message: "Login successful", token, userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get user info
export const getUser = async (req, res) => {
  try {
    // get token from request header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.name);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has Yashed" });
    }
    return res.status(500).json({ message: error.message });
  }
};

//Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all user
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
