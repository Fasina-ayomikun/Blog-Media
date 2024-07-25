import { connectDB } from "@/app/db/connect";
import Blog from "@/app/models/blog";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const decoded = verifyToken();

    const drafts = await Blog.find({
      published: false,
      writer: decoded?.userId,
    }).sort({ createdAt: -1 });
    return NextResponse.json({ drafts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
