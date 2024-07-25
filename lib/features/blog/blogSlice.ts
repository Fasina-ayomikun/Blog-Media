"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBlogThunk,
  deleteBlogThunk,
  editBlogThunk,
  getBlogThunk,
} from "./blogThunk";
import { InitialStateInterface } from "@/lib/types";

const initialState: InitialStateInterface = {
  isLoading: false,
  title: "Article Title",
  subtitle: "Article sub title",
  content: "",
  bannerImg: "",
  published: false,
  id: "",
  tags: [],
  noOfComments: 0,
  noOfLikes: 0,
  likers: [],
  writer: {
    _id: "",
    fullName: "",
    bio: "",
    image: "",
    email: "",
    createdAt: "",
  },
  isCreated: false,
  isError: false,
};

export const createBlog = createAsyncThunk("blog/create", createBlogThunk);
export const getBlog = createAsyncThunk("blog/get", getBlogThunk);
export const editBlog = createAsyncThunk("blog/edit", editBlogThunk);
export const deleteBlog = createAsyncThunk("blog/delete", deleteBlogThunk);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    handleChange: (
      state,
      { payload }: { payload: { name: string; value: string | string[] } }
    ) => {
      const { name, value } = payload;

      console.log(payload);

      return { ...state, [name]: value };
    },
    clearState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(createBlog.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(createBlog.fulfilled, (state, { payload }) => {
      const { tags, published, _id, title, content, subtitle } = payload.blog;
      console.log(payload.blog);

      return {
        ...state,
        isLoading: false,
        isCreated: true,
        id: _id,
      };
    });
    builders.addCase(createBlog.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });
    builders.addCase(getBlog.pending, (state, action) => {
      return { ...state, isLoading: true, isError: false, isCreated: false };
    });
    builders.addCase(getBlog.fulfilled, (state, { payload }) => {
      const {
        published,
        _id,
        tags,
        title,
        content,
        subtitle,
        bannerImg,
        noOfComments,
        noOfLikes,
        writer,
      } = payload.blog;
      console.log(payload.blog);

      return {
        ...state,
        isLoading: false,
        published,
        tags,
        id: _id,
        title,
        content,
        subtitle,
        likers: payload.likers,
        noOfComments,
        noOfLikes,
        bannerImg,
        writer,
      };
    });
    builders.addCase(getBlog.rejected, (state, { payload }) => {
      return { ...state, isError: true, isLoading: false, isCreated: false };
    });
    builders.addCase(editBlog.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(editBlog.fulfilled, (state, { payload }) => {
      const { published, tags, _id, title, content, subtitle, bannerImg } =
        payload.blog;
      console.log(payload.blog);

      return {
        ...state,
        isLoading: false,
        isCreated: true,
        id: _id,
      };
    });
    builders.addCase(editBlog.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });

    builders.addCase(deleteBlog.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(deleteBlog.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
      };
    });
    builders.addCase(deleteBlog.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });
  },
});
export const { handleChange, clearState } = blogSlice.actions;

export default blogSlice.reducer;
