import { connectDB } from "@/app/db/connect";
import User from "@/app/models/user";
import Blog from "@/app/models/blog";
import Like from "@/app/models/like";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const blogs = await Blog.find({ writer: params.id }).populate({
      path: "writer",
      select: "fullName email image bio",
    });
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get blog" },
      { status: 500 }
    );
  }
};
