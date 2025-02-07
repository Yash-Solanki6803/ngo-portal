import { Router } from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignsByID,
  registerUserForCampaign,
  removeUserFromCampaign,
  deleteCampaign,
  updateCampaign,
  getUsersForCampaign,
} from "../controller/campaignController";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware";

const router = Router();

//Create campaign
router.post(
  "/campaigns/create",
  authMiddleware,
  roleMiddleware("ngo"),
  createCampaign
);

//Get all volunteers
router.get(
  "/campaigns/:campaignId/volunteers",
  authMiddleware,
  getUsersForCampaign
);

//Delete campaign
router.delete(
  "/campaigns/:campaignId",
  authMiddleware,
  roleMiddleware("ngo", "dev"),
  deleteCampaign
);

//Update campaign
router.put(
  "/campaigns/:campaignId",
  authMiddleware,
  roleMiddleware("ngo", "dev"),
  updateCampaign
);

//Add volunteer
router.get(
  "/campaigns/:campaignId/register",
  authMiddleware,
  roleMiddleware("volunteer"),
  registerUserForCampaign
);

//Remove volunteer
router.delete(
  "/campaigns/:campaignId/remove-registration",
  authMiddleware,
  removeUserFromCampaign
);

//Get single campaign from id
router.get("/campaigns/:id", getCampaignsByID);

//Get campaigns of an ngo or all campaigns
router.get("/campaigns", getAllCampaigns);
export default router;
