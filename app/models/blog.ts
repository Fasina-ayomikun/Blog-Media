import mongoose, { model, models } from "mongoose";
import User from "./user";
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    subtitle: {
      type: String,
    },
    bannerImg: {
      type: String,
      // required: [true, "Please upload an image"],
    },
    tags: {
      type: Array,
      required: [true, "Tags are required"],
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
    },
    noOfLikes: {
      type: Number,
      default: 0,
    },

    noOfComments: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
const Blog = models?.Blog || model("Blog", BlogSchema);
export default Blog;
