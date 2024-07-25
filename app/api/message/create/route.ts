import { connectDB } from "@/app/db/connect";
import Conversation from "@/app/models/conversation";
import Message from "@/app/models/message";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { conversationId, senderId, text } = await req.json();

  try {
    await connectDB();
    if (!senderId || !conversationId || !text) {
      return NextResponse.json(
        { message: "Please provide all credentials" },
        { status: 400 }
      );
    }
    const senderExist = await User.findOne({ _id: senderId });
    const conversationExist = await Conversation.findOne({
      _id: conversationId,
    });
    if (!senderExist) {
      return NextResponse.json(
        { message: "User does not use Blog Media" },
        { status: 404 }
      );
    }
    if (!conversationExist) {
      return NextResponse.json(
        { message: "User does not use Blog Media" },
        { status: 404 }
      );
    }

    const message = await Message.create({ senderId, conversationId, text });
    return NextResponse.json({ message: "Message created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
