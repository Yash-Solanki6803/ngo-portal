import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import cors from "cors";

config();

const app = express();

// Middleware to parse JSON data
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error: ", error));

// cors

// Define a route to fetch all users
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
