import { Campaign, User } from "../models/index.js";

//Create Campaign

export const createCampaign = async (req, res) => {
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
      throw new Error("Please fill in all fields");
    }

    const newCampaign = new Campaign({
      name,
      description,
      location,
      startDate,
      endDate,
      status,
      createdBy: req.user._id,
    });

    await newCampaign.save();
    res.status(201).json({ message: "Campaign created successfully" });
  } catch (error) {
    //Throw the error caught
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//Delete Campaign
export const deleteCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;

    //check if the user is creator of the campaign or the dev
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }
    if (
      campaign.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      throw new Error("Access forbidden: insufficient privileges");
    }

    await Campaign.findByIdAndDelete(campaignId);
    //remove the campaign from the users profile
    await User.updateMany(
      { campaignsJoined: campaignId },
      { $pull: { campaignsJoined: campaignId } }
    );

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//Update Campaign
export const updateCampaign = async (req, res) => {
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
      throw new Error("Please fill in all fields");
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    //check if the user is creator of the campaign or the dev
    if (
      campaign.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      throw new Error("Access forbidden: insufficient privileges");
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
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//Get single campaign from id
export const getCampaignsByID = async (req, res) => {
  try {
    //Get userID from query
    const { id } = req.params;
    const campaign = await Campaign.findById(id);
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//Get campaigns of an ngo or all campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    //Get userID from query
    const { ngoId } = req.query;
    let campaigns;
    if (ngoId) {
      campaigns = await Campaign.find({ createdBy: ngoId });
    } else {
      campaigns = await Campaign.find();
    }

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//register for a campaign
export const registerUserForCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    if (campaign.volunteers.includes(req.user._id)) {
      throw new Error("User already registered for this campaign");
    }

    if (campaign.status === "completed") {
      throw new Error("Campaign has ended");
    }
    campaign.volunteers.push(req.user._id);
    await campaign.save();

    //update users profile
    const user = await User.findById(req.user._id);
    user.campaignsJoined.push(campaignId);
    await user.save();

    res.status(200).json({ message: "Registered successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//remove user from campaign
export const removeUserFromCampaign = async (req, res) => {
  try {
    //get campaignID and the user to be deleted
    const { campaignId } = req.params;
    const { userTBD } = req.body;
    //Find the campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }
    // console.log("req user ", req.user);
    // can't remove is user is not the creator of the campaign or the user to be deleted is not the user making the request
    if (
      campaign.createdBy.toString() !== req.user._id.toString() &&
      userTBD !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      throw new Error("Access forbidden: insufficient privileges");
    }

    //check if the userTBD is registered for the campaign
    if (!campaign.volunteers.includes(userTBD)) {
      throw new Error("User not registered for this campaign");
    }

    //check if the campaign has ended
    if (campaign.status === "completed") {
      throw new Error("Campaign has ended");
    }

    //remove the user from the campaign
    campaign.volunteers = campaign.volunteers.filter(
      (volunteer) => volunteer.toString() !== userTBD
    );
    await campaign.save();

    //update the user profile
    const user = await User.findById(userTBD);
    user.campaignsJoined = user.campaignsJoined.filter(
      (campaign) => campaign.toString() !== campaignId
    );
    await user.save();

    res.status(200).json({ message: "User removed successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//get all users registered for a campaign
export const getUsersForCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId).populate("volunteers");
    if (!campaign) {
      throw new Error("Campaign not found");
    }
    res.status(200).json(campaign.volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
