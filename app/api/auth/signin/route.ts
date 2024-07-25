import { connectDB } from "@/app/db/connect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/user";
export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();
  try {
    await connectDB();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide all credentials" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exists" },
        { status: 404 }
      );
    }
    let token = jwt.sign({ userId: user._id, email }, "JWT_SECRET", {
      expiresIn: "30d",
    });
    user.password = undefined;

    return NextResponse.json(
      { message: "User successfully created", user, token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
