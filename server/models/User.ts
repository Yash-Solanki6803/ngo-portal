import { Schema, Document, Types, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "dev" | "ngo" | "volunteer";
  campaignsJoined: Types.ObjectId[];
  ngoId?: Types.ObjectId | null;
  isPasswordValid: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<UserInterface>({
  _id: Types.ObjectId,
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
  campaignsJoined: [{ type: Types.ObjectId, ref: "Campaign", default: [] }],
  // If role is 'ngo', then he will have a ngoId
  ngoId: {
    type: Types.ObjectId,
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

userSchema.methods.isPasswordValid = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = model("User", userSchema);
