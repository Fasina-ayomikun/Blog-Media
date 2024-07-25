import { connectDB } from "@/app/db/connect";
import Conversation from "@/app/models/conversation";
import Follow from "@/app/models/follow";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { firstMember, secondMember } = await req.json();
  try {
    await connectDB();

    if (!firstMember || !secondMember) {
      return NextResponse.json(
        { message: "Please provide all credentials" },
        { status: 400 }
      );
    }
    console.log(firstMember);
    console.log(secondMember);
    const firstMemberExist = await User.findById(firstMember);
    const secondMemberExist = await User.findById(secondMember);

    if (!firstMemberExist) {
      return NextResponse.json(
        { message: "User does not use Blog Media" },
        { status: 404 }
      );
    }
    if (!secondMemberExist) {
      return NextResponse.json(
        { message: "User r does not use Blog Media" },
        { status: 400 }
      );
    }
    const conversationExist = await Conversation.findOne({
      $or: [
        { firstMember },
        { secondMember },
        { firstMember: secondMember },
        { secondMember: firstMember },
      ],
    });
    if (conversationExist) {
      conversationExist.lastOpened = Date.now();
      await conversationExist.save();
      return NextResponse.json(
        { message: "These Users already have an existing conversation" },
        { status: 200 }
      );
    } else {
      const conversation = await Conversation.create({
        firstMember,
        secondMember,
      });
      return NextResponse.json(
        { message: "Conversation created" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
