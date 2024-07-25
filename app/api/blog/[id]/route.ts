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
    const blog = await Blog.findById(params.id).populate({
      path: "writer",
    });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    const likesDetails = await Like.find({ blog: params.id });

    console.log(likesDetails);

    let likers: string[] = [];
    likesDetails.map((likeDetail) => {
      likers.push(likeDetail.user);
    });
    return NextResponse.json({ blog, likers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get blog" },
      { status: 500 }
    );
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { title, subtitle, content, bannerImg, published, tags } =
    await req.json();
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
    const blogExists = await Blog.findById(params.id);

    if (!blogExists) {
      return NextResponse.json({ message: "blog not found" }, { status: 404 });
    }
    console.log(user, blogExists);

    if (JSON.stringify(user._id) !== JSON.stringify(blogExists.writer)) {
      return NextResponse.json(
        { message: "UnAuthorized to access this route" },
        { status: 401 }
      );
    }
    blogExists.title = title;
    blogExists.subtitle = subtitle;
    blogExists.content = content;
    blogExists.bannerImg = bannerImg;
    blogExists.tags = tags;

    await blogExists.save();
    return NextResponse.json(
      { message: "Blog updated successfully", blog: blogExists },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update blog" },
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
    const blogExist = await Blog.findById(params.id);
    if (!blogExist) {
      return NextResponse.json({ message: "blog not found" }, { status: 400 });
    }
    if (JSON.stringify(user._id) !== JSON.stringify(blogExist.writer)) {
      return NextResponse.json(
        { message: "UnAuthorized to access this route" },
        { status: 401 }
      );
    }
    await Blog.deleteOne({ _id: params.id });
    return NextResponse.json(
      { message: "blog successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
};
