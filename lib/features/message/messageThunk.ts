import axios from "axios";
import { getAllMessages } from "../all-messages/allMessagesSlice";

const createMessagesThunk = async (
  messages: { conversationId: string; senderId: string; text: string },
  thunkAPI?: any
) => {
  try {
    const resp = await axios.post("/api/message/create", messages);
    thunkAPI.dispatch(getAllMessages(messages.conversationId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};
const editMessagesThunk = async (
  message: {
    editId: string;
    conversationId: string;
    text: string;
    senderId: string;
  },
  thunkAPI?: any
) => {
  try {
    const { editId, conversationId, text, senderId } = message;
    const resp = await axios.patch(`/api/message/${editId}`, {
      conversationId,
      senderId,
      text,
    });
    thunkAPI.dispatch(getAllMessages(conversationId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};
const deleteMessagesThunk = async (
  { messageId, conversationId }: { messageId: string; conversationId: string },
  thunkAPI?: any
) => {
  try {
    const resp = await axios.delete(`/api/message/${messageId}`);
    thunkAPI.dispatch(getAllMessages(conversationId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};
const clearMessagesThunk = async (conversationId: string, thunkAPI?: any) => {
  try {
    const resp = await axios.delete(`/api/message/clear/${conversationId}`);
    thunkAPI.dispatch(getAllMessages(conversationId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export {
  createMessagesThunk,
  editMessagesThunk,
  deleteMessagesThunk,
  clearMessagesThunk,
};
