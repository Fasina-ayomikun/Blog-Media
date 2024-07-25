import { connectDB } from "@/app/db/connect";
import User from "@/app/models/user";
import Blog from "@/app/models/blog";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const url = new URL(req.url);
    const tags = url.searchParams.get("tags");
    const tagsArray = tags ? tags.split(",") : [];
    await User.find({});
    let blogs;
    if (tagsArray.length > 1) {
      blogs = await Blog.find({ published: true, tags: { $in: tagsArray } })
        .sort({ createdAt: -1 })
        .populate({
          path: "writer",
          select: "fullName email bio image",
        });
    } else {
      blogs = await Blog.find({ published: true })
        .sort({ createdAt: -1 })
        .populate({
          path: "writer",
          select: "fullName email bio image",
        });
    }

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};
