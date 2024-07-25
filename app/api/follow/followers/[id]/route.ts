import { connectDB } from "@/app/db/connect";
import Blog from "@/app/models/blog";
import Follow from "@/app/models/follow";
import User from "@/app/models/user";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export const GET = async (
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
    console.log(params.id);

    const followers = await Follow.find({
      follower: params.id,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "following",
        select: "email fullName bio image",
      });
    console.log(followers);

    return NextResponse.json({ followers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};