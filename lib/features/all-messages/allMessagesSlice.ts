import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMessagesThunk } from "./allMessagesThunk";
const initialState = {
  messages: [],
  receiver: {},
  isLoading: false,
};

export const getAllMessages = createAsyncThunk(
  "conversations/getAllMessages",
  getAllMessagesThunk
);
const allMessagesSlice = createSlice({
  name: "allMessages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, { payload }) => {
        return {
          ...state,
          messages: payload.messages,
          isLoading: false,
        };
      })
      .addCase(getAllMessages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default allMessagesSlice.reducer;
