import User from "@/app/models/user";
import { connectDB } from "@/app/db/connect";
import Comment from "@/app/models/comment";
import { CommentModel } from "@/lib/types";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const comment = await Comment.findById(params.id).populate({
      path: "user",
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ comment }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get comment" },
      { status: 500 }
    );
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { text } = await req.json();
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
    const commentExists = await Comment.findById(params.id);

    if (!commentExists) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }

    if (JSON.stringify(user._id) !== JSON.stringify(commentExists.user)) {
      return NextResponse.json(
        { message: "UnAuthorized to access this route" },
        { status: 401 }
      );
    }
    commentExists.text = text;

    await commentExists.save();
    ((await Comment) as CommentModel).calculateComments(commentExists.blog);
    return NextResponse.json(
      { message: "comment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update comment" },
      { status: 500 }
    );
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
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
    const commentExist = await Comment.findById(params.id);
    if (!commentExist) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 400 }
      );
    }
    if (JSON.stringify(user._id) !== JSON.stringify(commentExist.user)) {
      return NextResponse.json(
        { message: "UnAuthorized to access this route" },
        { status: 401 }
      );
    }
    await Comment.deleteOne({ _id: params.id });
    ((await Comment) as CommentModel).calculateComments(commentExist.blog);

    return NextResponse.json(
      { message: "comment successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
};
