import mongoose, { model, models } from "mongoose";
import Blog from "./blog";
import { CommentDocument, CommentModel } from "@/lib/types";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
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
CommentSchema.statics.calculateComments = async function (
  blogId: string
): Promise<void> {
  try {
    const comments = await this.countDocuments({
      blog: blogId,
    });
    console.log("comments", comments);

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { noOfComments: comments },
      { new: true }
    );
    console.log(updatedBlog);
  } catch (error) {
    console.log(error);
  }
};

const Comment =
  models?.Comment ||
  model<CommentDocument, CommentModel>("Comment", CommentSchema);

export default Comment;
