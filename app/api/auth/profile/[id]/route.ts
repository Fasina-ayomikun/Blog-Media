import { connectDB } from "@/app/db/connect";
import Follow from "@/app/models/follow";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const followersDetails = await Follow.find({
      follower: params.id,
    });
    let followers: string[] = [];
    followersDetails.map((followerDetail) => {
      console.log(followerDetail, "gyeye");
      followers.push(followerDetail.following);
    });
    return NextResponse.json({ user, followers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get blog" },
      { status: 500 }
    );
  }
};
