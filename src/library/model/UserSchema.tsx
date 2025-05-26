import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, select: false },
  googleId: { type: String, select: false },
  image: { type: String },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
