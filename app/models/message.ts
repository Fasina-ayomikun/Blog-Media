import mongoose, { model, models } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message = models?.Message || model("Message", MessageSchema);
export default Message;
