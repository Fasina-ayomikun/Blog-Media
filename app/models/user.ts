import mongoose, { model, models } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: {
      type: String,
      required: [true, "Profile Image is required"],
    },
    followersIds: {
      type: Array,
    },
  },
  { timestamps: true }
);
const User = models?.User || model("User", UserSchema);
export default User;
