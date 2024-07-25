import { connectDB } from "@/app/db/connect";
import User from "@/app/models/user";
import Blog from "@/app/models/blog";
import Like from "@/app/models/like";
import { LikeModel } from "@/lib/types";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { blogId: string } }
) => {
  try {
    await connectDB();
    const decoded = verifyToken();

    const user = await User.findById(decoded?.userId);
    if (!user) {
      return NextResponse.json(
        { message: "Authorization failed" },
        { status: 401 }
      );
    }

    const blog = await Blog.findById(params.blogId);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    const alreadyLiked = await Like.findOne({
      blog: params.blogId,
      user: decoded?.userId,
    });
    if (alreadyLiked) {
      await Like.findOneAndDelete({
        blog: params.blogId,
        user: decoded?.userId,
      });
      ((await Like) as LikeModel).calculateLikes(params.blogId);
      return NextResponse.json(
        { message: "Blog Unlike successfully" },
        { status: 200 }
      );
    } else {
      await Like.create({
        liked: true,
        blog: params.blogId,
        user: decoded?.userId,
      });

      ((await Like) as LikeModel).calculateLikes(params.blogId);
      return NextResponse.json(
        { message: "Blog liked successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
};
