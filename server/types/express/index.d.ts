import { UserInterface } from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserInterface;
  }
}
