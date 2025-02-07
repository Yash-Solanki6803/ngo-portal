import "dotenv/config"; // Equivalent to `config();` but cleaner in TypeScript

import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import Routes with `.ts` extension removed
import authRoutes from "./routes/authroutes";
import userRoutes from "./routes/userroutes";
import campaignRoutes from "./routes/campaignroutes";
import ngoRoutes from "./routes/ngoroutes";

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI as string;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error: ", error));

const app: Application = express();

// Middleware to parse JSON data
const corsOptions = {
  origin: "http://localhost:5173",
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", campaignRoutes);
app.use("/api", ngoRoutes);

// Define a route to fetch all users
app.get("/", (_, res: Response) => {
  res.json({ message: "Hello World" });
});

// Start the server
const PORT: number = parseInt(process.env.PORT || "5000", 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
