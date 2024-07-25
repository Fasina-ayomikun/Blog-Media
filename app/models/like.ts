import mongoose, { model, models } from "mongoose";
import Blog from "./blog";
import { LikeDocument, LikeModel } from "@/lib/types";

const LikeSchema = new mongoose.Schema(
  {
    liked: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

LikeSchema.statics.calculateLikes = async function (
  blogId: string
): Promise<void> {
  try {
    const likes = await this.countDocuments({
      blog: blogId,
    });
    console.log("likes", likes);

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { noOfLikes: likes },
      { new: true }
    );
    console.log(updatedBlog);
  } catch (error) {
    console.log(error);
  }
};

const Like = models?.Like || model<LikeDocument, LikeModel>("Like", LikeSchema);
export default Like;
