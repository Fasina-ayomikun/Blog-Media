import mongoose, { model, models } from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    firstMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    secondMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lastOpened: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
const Conversation =
  models?.Conversation || model("Conversation", ConversationSchema);
export default Conversation;
