import { connectDB } from "@/app/db/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
export const POST = async (req: Request, res: Response) => {
  const { fullName, email, password, password2, image } = await req.json();
  try {
    await connectDB();
    if (!fullName || !email || !password || !password2) {
      return NextResponse.json(
        { message: "Please provide all credentials" },
        { status: 400 }
      );
    }
    if (password !== password) {
      return NextResponse.json(
        { message: "Passwords don't match" },
        { status: 400 }
      );
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      fullName,
      password: hashedPassword,
      image,
    });
    user.password = undefined;
    return NextResponse.json(
      { message: "User successfully created", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
