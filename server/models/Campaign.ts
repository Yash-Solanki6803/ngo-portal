import { Schema, Document, Types, model } from "mongoose";
import { User, UserInterface } from "./User";
import { NgoInterface } from "./Ngo";

export interface CampaignInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  createdBy: Types.ObjectId | UserInterface;
  location: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "ongoing" | "completed";
  ngoId: Types.ObjectId | NgoInterface;
  volunteers: Types.ObjectId[];
  createdAt: Date;
}

const campaignSchema = new Schema<CampaignInterface>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  }, // NGO who created it
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    required: true,
  },
  ngoId: {
    type: Types.ObjectId,
    ref: "Ngo",
  },
  volunteers: [{ type: Types.ObjectId, ref: "User" }], // Volunteers who registered
  createdAt: { type: Date, default: Date.now },
});

export const Campaign = model("Campaign", campaignSchema);
