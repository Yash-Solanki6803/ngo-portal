import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization") && req.header("Authorization").split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    //Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Find User
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient privileges" });
    }
    next();
  };
};
