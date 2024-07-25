import { connectDB } from "@/app/db/connect";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Blog from "@/app/models/blog";
import { verifyToken } from "@/lib/verifyToken";
import Comment from "@/app/models/comment";
import { CommentModel } from "@/lib/types";

export const GET = async (
  req: Request,
  { params }: { params: { blogId: string } }
) => {
  try {
    const blogExists = await Blog.findById(params.blogId);
    if (!blogExists) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    const comments = await Comment.find({ blog: params.blogId })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "fullName email bio image",
      });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { blogId: string } }
) => {
  const { text } = await req.json();

  try {
    await connectDB();

    const decoded = verifyToken();

    const user = await User.findOne({ email: decoded?.email });
    if (!user) {
      return NextResponse.json(
        { message: "Authorization failed" },
        { status: 401 }
      );
    }
    const blogExists = await Blog.findById(params.blogId);
    if (!blogExists) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    const comment = await Comment.create({
      text,
      blog: params.blogId,
      user: decoded?.userId,
    });
    ((await Comment) as CommentModel).calculateComments(comment.blog);
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};
