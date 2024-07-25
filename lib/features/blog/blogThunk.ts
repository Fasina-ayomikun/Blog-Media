"use client";
import {
  BlogDetailsInterface,
  BlogInterface,
  UserInterface,
  parsedToken,
} from "@/lib/types";
import axios from "axios";
import { getAllBlogs, getAllDrafts } from "../all-blogs/allBlogsSlice";
import { clearState, getBlog } from "./blogSlice";

export const createBlogThunk = async (
  data: BlogDetailsInterface,
  thunkAPI: any
) => {
  try {
    console.log(data);

    const resp = await axios.post("/api/blog/create", data, {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    if (resp.status === 201) {
      if (data.published) {
        window.localStorage.setItem(
          "BLOG_MEDIA_ARTICLE_PUBLISHED",
          JSON.stringify(true)
        );
      }
    }
    console.log(resp);

    thunkAPI.dispatch(getAllBlogs({ tags: [] }));
    thunkAPI.dispatch(clearState());
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
export const getBlogThunk = async (
  blogId: string | string[],
  thunkAPI: any
) => {
  try {
    const resp = await axios.get(`/api/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });

    console.log(resp);

    thunkAPI.dispatch(getAllBlogs({ tags: resp.data.blog.tags }));
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
export const editBlogThunk = async (
  data: { blogId: string | string[]; info: BlogDetailsInterface },
  thunkAPI: any
) => {
  try {
    console.log(parsedToken);

    const resp = await axios.patch(`/api/blog/${data.blogId}`, data.info, {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    if (resp.status === 200) {
      if (data.info.published) {
        window.localStorage.setItem(
          "BLOG_MEDIA_ARTICLE_PUBLISHED",
          JSON.stringify(true)
        );
      }
    }
    console.log(resp);
    if (!data.info.published) {
      thunkAPI.dispatch(getBlog(data.blogId));
      thunkAPI.dispatch(getAllDrafts({}));
    }
    thunkAPI.dispatch(clearState());
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
export const deleteBlogThunk = async (
  blogId: string | string[],
  thunkAPI: any
) => {
  try {
    console.log(parsedToken);

    const resp = await axios.delete(`/api/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    thunkAPI.dispatch(getAllDrafts({}));

    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
