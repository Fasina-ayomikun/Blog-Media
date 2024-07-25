import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBlogsThunk, getAllDraftsThunk } from "./allBlogsThunk";

const initialState = {
  isLoading: false,
  blogs: [],
  drafts: [],
};

export const getAllBlogs = createAsyncThunk("blogs/all", getAllBlogsThunk);
export const getAllDrafts = createAsyncThunk("blogs/drafts", getAllDraftsThunk);

const allBlogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(getAllBlogs.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builders.addCase(getAllBlogs.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, blogs: payload.blogs };
    });
    builders.addCase(getAllBlogs.rejected, (state, action) => {
      console.log(action.payload);

      return { ...state, isLoading: false };
    });
    builders.addCase(getAllDrafts.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builders.addCase(getAllDrafts.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, drafts: payload.drafts };
    });
    builders.addCase(getAllDrafts.rejected, (state, action) => {
      console.log(action.payload);

      return { ...state, isLoading: false };
    });
  },
});

export default allBlogsSlice.reducer;
