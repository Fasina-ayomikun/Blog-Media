import Conversation from "@/app/models/conversation";
import Message from "@/app/models/message";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const conversationExists = await Conversation.findById(id);
    if (!conversationExists) {
      return NextResponse.json(
        { message: "Conversation does not exist" },
        { status: 404 }
      );
    }
    await Message.deleteMany({ conversationId: id });
    return NextResponse.json(
      { message: "messages successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
};
