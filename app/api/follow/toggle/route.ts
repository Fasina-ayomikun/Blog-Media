import { connectDB } from "@/app/db/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import { verifyToken } from "@/lib/verifyToken";
import Follow from "@/app/models/follow";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const url = new URL(req.url);
    const following = url.searchParams.get("following");
    const follower = url.searchParams.get("follower");
    console.log(following);

    const decoded = verifyToken();

    const user = await User.findById(following);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const alreadyFollowing = await Follow.findOne({
      follower,
      following,
    });
    console.log(alreadyFollowing);

    if (alreadyFollowing) {
      await Follow.findOneAndDelete({
        follower,
        following,
      });
      return NextResponse.json(
        { message: "User successfully unfollowed" },
        { status: 200 }
      );
    } else {
      await Follow.create({
        follower,
        following,
      });

      return NextResponse.json({ message: "User followed" }, { status: 201 });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};
