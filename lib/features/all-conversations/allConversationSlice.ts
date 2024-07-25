import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllConversationsThunk } from "./allConversationThunk";
import { conversationInterface } from "@/lib/types";
const initialState: {
  conversations: conversationInterface[];
  filteredConversations: conversationInterface[];
  isLoading: boolean;
} = {
  conversations: [],
  filteredConversations: [],

  isLoading: false,
};

export const getAllConversations = createAsyncThunk(
  "conversations/getAllConversations",
  getAllConversationsThunk
);
const allConversationSlice = createSlice({
  name: "allConversations",
  initialState,
  reducers: {
    // filterConversation: (state, { payload }) => {
    //   let tempConversations = [];
    //   if (payload.length >= 1) {
    //     payload.forEach((p: conversationInterface) => {
    //       tempConversations.push(
    //         [...state.conversations].find((c) => c.members[1] === p._id)
    //       );
    //     });
    //   } else {
    //     tempConversations.push(...state.conversations);
    //   }
    //   return { ...state, filteredConversations: tempConversations };
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllConversations.fulfilled, (state, { payload }) => {
        return {
          ...state,
          conversations: payload.conversations,
          filteredConversations: payload.conversations,
          isLoading: false,
        };
      })
      .addCase(getAllConversations.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
// export const { filterConversation } = allConversationSlice.actions;
export default allConversationSlice.reducer;
