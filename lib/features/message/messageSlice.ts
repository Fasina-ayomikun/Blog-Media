import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  clearMessagesThunk,
  createMessagesThunk,
  deleteMessagesThunk,
  editMessagesThunk,
} from "./messageThunk";
import { parsedUser } from "@/lib/types";
const initialState = {
  senderId: "",
  conversationId: "",
  text: "",
  isEditing: false,
  editId: "",
  isLoading: false,
};
export const createMessages = createAsyncThunk(
  "messages/createMessages",
  createMessagesThunk
);
export const editMessages = createAsyncThunk(
  "messages/editMessages",
  editMessagesThunk
);
export const deleteMessages = createAsyncThunk(
  "messages/deleteMessages",
  deleteMessagesThunk
);
export const clearMessages = createAsyncThunk(
  "messages/clearMessages",
  clearMessagesThunk
);
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      return { ...state, senderId: parsedUser?._id as string };
    },
    setEditState: (state, { payload }) => {
      state.isEditing = true;
      state.text = payload.text;
      state.editId = payload.editId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessages.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false };
      })
      .addCase(createMessages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editMessages.pending, (state) => {
        state.isLoading = true;
        state.isEditing = true;
      })
      .addCase(editMessages.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false, isEditing: false };
      })
      .addCase(editMessages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMessages.pending, (state) => {
        state.isLoading = true;
        state.isEditing = false;
      })
      .addCase(deleteMessages.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false };
      })
      .addCase(deleteMessages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(clearMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearMessages.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false };
      })
      .addCase(clearMessages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { handleChange, setEditState } = messagesSlice.actions;
export default messagesSlice.reducer;
