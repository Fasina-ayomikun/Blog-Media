import { connectDB } from "@/app/db/connect";
import User from "@/app/models/user";
import Blog from "@/app/models/blog";
import { NextResponse } from "next/server";
import Conversation from "@/app/models/conversation";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;
    await User.find({});
    const conversations = await Conversation.find({
      $or: [{ firstMember: id }, { secondMember: id }],
    })
      .populate({
        path: "firstMember secondMember",
        select: "fullName email image bio",
      })
      .sort({ lastOpened: -1 });

    return NextResponse.json({ conversations }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};
