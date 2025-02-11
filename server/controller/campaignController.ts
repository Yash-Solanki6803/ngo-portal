import { Types } from "mongoose";
import { Campaign } from "../models/Campaign";
import { User } from "../models/User";
import { Request, Response } from "express";

interface CreateCampaignBody extends Request {
  body: {
    name: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
  };
}

interface DeleteCampaignInterface extends Request {
  params: {
    campaignId: string;
  };
}

interface UpdateCampaignInterface extends Request {
  params: {
    campaignId: string;
  };
  body: {
    name: string | undefined;
    description: string | undefined;
    location: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    status: string | undefined;
  };
}

interface GetCampaignsByIDInterface extends Request {
  params: {
    _id: string;
  };
}

interface GetAllCampaignsInterface extends Request {
  query: {
    ngoId: string;
  };
}

interface RequestWithCampaignIdInParams extends Request {
  params: {
    campaignId: string;
  };
}

interface RemoveUserFromCampaignInterface extends Request {
  params: {
    campaignId: string;
  };
  body: {
    userTBD: string;
  };
}

export const createCampaign = async (
  req: CreateCampaignBody,
  res: Response
) => {
  try {
    const { name, description, location, startDate, endDate, status } =
      req.body;

    //Check if any field is empty
    if (
      !name ||
      !description ||
      !location ||
      !startDate ||
      !endDate ||
      !status
    ) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    if (req.user?.role !== "ngo" || !req.user?.ngoId) {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient privileges" });
      return;
    }

    const newCampaign = new Campaign({
      name,
      description,
      location,
      startDate,
      endDate,
      status,
      createdBy: req.user?.ngoId,
    });

    await newCampaign.save();
    res.status(201).json({
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deleteCampaign = async (
  req: DeleteCampaignInterface,
  res: Response
) => {
  try {
    const { campaignId } = req.params;

    //check if the user is creator of the campaign or the dev
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }
    if (
      campaign.createdBy?.toString() !== req.user?._id.toString() &&
      req.user?.role !== "dev"
    ) {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient privileges" });
      return;
    }

    await Campaign.findByIdAndDelete(campaignId);

    //remove the campaign from the users profile
    await User.updateMany(
      { campaignsJoined: campaignId },
      { $pull: { campaignsJoined: campaignId } }
    );

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const updateCampaign = async (
  req: UpdateCampaignInterface,
  res: Response
) => {
  try {
    const { campaignId } = req.params;
    const { name, description, location, startDate, endDate, status } =
      req.body;

    //Check if any field is empty
    if (
      !name ||
      !description ||
      !location ||
      !startDate ||
      !endDate ||
      !status
    ) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    //check if the user is creator of the campaign or the dev
    if (
      campaign.createdBy?.toString() !== req.user?._id.toString() &&
      req.user?.role !== "dev"
    ) {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient privileges" });
      return;
    }

    await Campaign.findByIdAndUpdate(campaignId, {
      name,
      description,
      location,
      startDate,
      endDate,
      status,
    });
    res.status(200).json({ message: "Campaign updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//Get single campaign from id
export const getCampaignsByID = async (
  req: GetCampaignsByIDInterface,
  res: Response
) => {
  try {
    //Get userID from query
    const { _id } = req.params;
    const campaign = await Campaign.findById(_id);
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(campaign);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//Get campaigns of an ngo or all campaigns
export const getAllCampaigns = async (
  req: GetAllCampaignsInterface,
  res: Response
) => {
  try {
    //Get userID from query
    const { ngoId } = req.query;
    let campaigns;
    if (ngoId) {
      campaigns = await Campaign.find({ createdBy: ngoId });
    } else {
      campaigns = await Campaign.find();
    }

    if (!campaigns) {
      res.status(404).json({ message: "No campaigns found" });
    }

    //Campaigns can be an empty array
    res.status(200).json(campaigns);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const registerUserForCampaign = async (
  req: RequestWithCampaignIdInParams,
  res: Response
) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId).populate("volunteers");

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    //check if user is already registered for the campaign
    if (campaign.volunteers.includes(req.user._id)) {
      res.status(400).json({ message: "User already registered for campaign" });
      return;
    }

    if (campaign.status === "completed") {
      res.status(400).json({ message: "Campaign has ended" });
      return;
    }
    campaign.volunteers.push(req.user._id);
    await campaign.save();

    //update users profile
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.campaignsJoined.push(new Types.ObjectId(campaignId));
    await user.save();

    res.status(200).json({ message: "Registered successfully", campaign });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//remove user from campaign
export const removeUserFromCampaign = async (
  req: RemoveUserFromCampaignInterface,
  res: Response
) => {
  try {
    //get campaignID and the user to be deleted
    const { campaignId } = req.params;
    const { userTBD } = req.body;
    //Find the campaign
    const campaign = await Campaign.findById(campaignId);

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    // Can't remove if user is not the creator of the campaign or the user to be deleted is not the user making the request
    if (
      campaign.createdBy.toString() !== req.user._id.toString() &&
      userTBD !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient privileges" });
      return;
    }

    //check if the userTBD is registered for the campaign
    if (!campaign.volunteers.includes(new Types.ObjectId(userTBD))) {
      res.status(400).json({ message: "User not registered for campaign" });
      return;
    }

    //check if the campaign has ended
    if (campaign.status === "completed") {
      res.status(400).json({ message: "Campaign has ended" });
      return;
    }

    //remove the user from the campaign
    campaign.volunteers = campaign.volunteers.filter(
      (volunteer) => volunteer.toString() !== userTBD
    );
    await campaign.save();

    //update the user profile
    const user = await User.findById(userTBD);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.campaignsJoined = user.campaignsJoined.filter(
      (campaign) => campaign.toString() !== campaignId
    );
    await user.save();

    res.status(200).json({ message: "User removed successfully", campaign });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//get all users registered for a campaign
export const getUsersForCampaign = async (
  req: RequestWithCampaignIdInParams,
  res: Response
) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId).populate("volunteers");
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }
    res.status(200).json(campaign.volunteers);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
