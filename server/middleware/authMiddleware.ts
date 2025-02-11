import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserInterface, User } from "../models/User";
import { JWT_Payload } from "../controller/authController";

// Extend Request to include user property

interface DecodedToken extends JwtPayload {
  _id: string; // Ensure it's a string since JWT stores IDs as strings
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
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
    const user = await User.findById(decoded._id);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = user;
    next();
    res.json;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token has expired" });
      return;
    }

    next(error);
  }
};

// Role-based middleware
export const roleMiddleware = (...roles: UserInterface["role"][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.role || !roles.includes(req.user.role)) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
