import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCommentsThunk } from "./allCommentsThunk";

const initialState = {
  isLoading: false,
  comments: [],
};

export const getAllComments = createAsyncThunk(
  "comments/all",
  getAllCommentsThunk
);

const allCommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(getAllComments.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builders.addCase(getAllComments.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, comments: payload.comments };
    });
    builders.addCase(getAllComments.rejected, (state, action) => {
      return { ...state, isLoading: false };
    });
  },
});

export default allCommentsSlice.reducer;
