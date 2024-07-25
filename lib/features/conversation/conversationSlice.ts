import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createConversationThunk,
  deleteConversationThunk,
} from "./conversationThunk";
import { parsedUser } from "@/lib/types";
const initialState: {
  firstMember: string;
  secondMember: string;
  isLoading: boolean;
} = {
  firstMember: "",
  secondMember: "",
  isLoading: false,
};
export const createConversation = createAsyncThunk(
  "conversation/createConversation",
  createConversationThunk
);
export const deleteConversation = createAsyncThunk(
  "conversation/deleteConversation",
  deleteConversationThunk
);
const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    handleChange: (state, { payload }: { payload: string }) => {
      return {
        ...state,
        receiverId: payload,
        senderId: parsedUser?._id as string,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConversation.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false };
      })
      .addCase(createConversation.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteConversation.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false };
      })
      .addCase(deleteConversation.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { handleChange } = conversationSlice.actions;
export default conversationSlice.reducer;
