import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contactEmail: { type: String, required: true, unique: true },
  contactPhone: { type: String },
  website: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  }, // The user managing this NGO
});

const Ngo = mongoose.model("Ngo", ngoSchema);

export default Ngo;
