import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware";
import {
  createNgo,
  deleteNgo,
  getAllNgos,
  getNgoById,
  updateNgo,
} from "../controller/ngoController";
const router = Router();

//Create ngo
router.post(
  "/ngo/create",
  authMiddleware,
  roleMiddleware("volunteer"),
  createNgo
);

//Delete ngo
router.delete(
  "/ngo/delete/:ngoId",
  authMiddleware,
  roleMiddleware("ngo", "dev"),
  deleteNgo
);

//Update ngo
router.put(
  "/ngo/update/:ngoId",
  authMiddleware,
  roleMiddleware("ngo", "dev"),
  updateNgo
);
//Get ngo by id
router.get("/ngos/:ngoId", getNgoById);
//Get all ngos
router.get("/ngos", getAllNgos);

export default router;
