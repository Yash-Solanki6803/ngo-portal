import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["dev", "ngo", "volunteer"],
    required: true,
  },
  campaignsJoined: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", default: [] },
  ],
  // If role is 'ngo', then he will have a ngoId
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password

userSchema.methods.isPasswordValid = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
