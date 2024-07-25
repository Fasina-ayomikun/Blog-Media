import { connectDB } from "@/app/db/connect";
import User from "@/app/models/user";
import Blog from "@/app/models/blog";
import Like from "@/app/models/like";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";
import Conversation from "@/app/models/conversation";
import Message from "@/app/models/message";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id: conversationId } = params;
    const messages = await Message.find({ conversationId });
    return NextResponse.json({ messages }, { status: 200 });
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
  const { conversationId, senderId, text } = await req.json();
  try {
    await connectDB();
    const decoded = verifyToken();
    const { id } = params;

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
        { message: "Conversation does not exists" },
        { status: 404 }
      );
    }
    const messageExist = await Message.findOne({ _id: id });
    if (!messageExist) {
      return NextResponse.json({ message: "Message deleted" }, { status: 404 });
    }

    const editedMessage = await Message.findOneAndUpdate(
      {
        _id: id,
        conversationId,
        senderId,
      },
      { text }
    );
    return NextResponse.json(
      { message: "Message updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const conversation = await Message.findOneAndDelete({ _id: id });
    return NextResponse.json(
      { message: "comment successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
};
