import axios from "axios";
import { getAllConversations } from "../all-conversations/allConversationSlice";
import { clearMessages } from "../message/messageSlice";
import { parsedUser } from "@/lib/types";

const createConversationThunk = async (
  conversation: { firstMember: string; secondMember: string },
  thunkAPI?: any
) => {
  try {
    const resp = await axios.post("/api/conversation/create", conversation);
    console.log(resp);

    return resp.data;
  } catch (error) {
    console.log(error);

    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};
const deleteConversationThunk = async (
  conversationId: string,
  thunkAPI?: any
) => {
  try {
    const resp = await axios.delete(`/conversation/${conversationId}`);
    thunkAPI.dispatch(getAllConversations(parsedUser?._id as string));
    thunkAPI.dispatch(clearMessages(conversationId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export { createConversationThunk, deleteConversationThunk };
