import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCommentThunk,
  deleteCommentThunk,
  editCommentThunk,
} from "./commentThunk";
const initialState = {
  isLoading: false,
  text: "",
  editingText: "",
  id: "",
  user: {
    _id: "",
    fullName: "",
    image: "",
    email: "",
    createdAt: "",
  },
  isCreated: false,
  isError: false,
};

export const createComment = createAsyncThunk(
  "comment/create",
  createCommentThunk
);
export const editComment = createAsyncThunk("comment/edit", editCommentThunk);
export const deleteComment = createAsyncThunk(
  "comment/delete",
  deleteCommentThunk
);

const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    handleChange: (
      state,
      { payload }: { payload: { name: string; value: string } }
    ) => {
      const { name, value } = payload;

      console.log(payload);

      return { ...state, [name]: value };
    },
    clearState: (state) => {
      console.log("clearing", initialState);

      return { ...state, ...initialState };
    },
  },
  extraReducers: (builders) => {
    builders.addCase(createComment.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(createComment.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isCreated: true,
      };
    });
    builders.addCase(createComment.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });
    builders.addCase(editComment.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(editComment.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isCreated: true,
      };
    });
    builders.addCase(editComment.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });

    builders.addCase(deleteComment.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(deleteComment.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
      };
    });
    builders.addCase(deleteComment.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });
  },
});
export const { handleChange, clearState } = CommentSlice.actions;

export default CommentSlice.reducer;
