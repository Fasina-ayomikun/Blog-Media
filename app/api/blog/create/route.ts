import { connectDB } from "@/app/db/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import Blog from "@/app/models/blog";
import { verifyToken } from "@/lib/verifyToken";

export const POST = async (req: Request, res: Response) => {
  const { title, subtitle, content, bannerImg, published, tags } =
    await req.json();

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
    const blog = await Blog.create({
      title,
      subtitle,
      writer: user._id,
      content,
      bannerImg,
      published,
      tags,
    });
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
