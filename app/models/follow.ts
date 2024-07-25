import mongoose, { model, models } from "mongoose";
import User from "./user";
const FollowSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Follow = models?.Follow || model("Follow", FollowSchema);
export default Follow;
