import { Schema, Document, Model, Types, model } from "mongoose";

export interface NgoInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  location?: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  createdBy: Types.ObjectId;
}

const ngoSchema = new Schema<NgoInterface>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contactEmail: { type: String, required: true, unique: true },
  contactPhone: { type: String },
  website: { type: String },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  }, // The user managing this NGO
});

export const Ngo = model("Ngo", ngoSchema);
