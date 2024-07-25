"use client";
import { CommentDetailsInterface, parsedToken } from "@/lib/types";
import axios from "axios";
import { getAllComments } from "../all-comments/allCommentsSlice";
import { clearState } from "./commentSlice";
import { getBlog } from "../blog/blogSlice";

export const createCommentThunk = async (
  {
    blogId,
    data,
  }: { blogId: string | string[]; data: CommentDetailsInterface },
  thunkAPI: any
) => {
  try {
    console.log(data);

    const resp = await axios.post(`/api/comments/create/${blogId}`, data, {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    thunkAPI.dispatch(clearState());
    thunkAPI.dispatch(getAllComments(blogId));
    thunkAPI.dispatch(getBlog(blogId));
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};

export const editCommentThunk = async (
  data: {
    commentId: string | string[];
    info: CommentDetailsInterface;
    blogId: string | string[];
  },
  thunkAPI: any
) => {
  try {
    console.log(parsedToken);

    const resp = await axios.patch(
      `/api/comments/${data.commentId}`,
      data.info,
      {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    );

    thunkAPI.dispatch(getAllComments(data.blogId));
    thunkAPI.dispatch(clearState());
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
export const deleteCommentThunk = async (
  {
    commentId,
    blogId,
  }: { commentId: string | string[] | undefined; blogId: string | string[] },
  thunkAPI: any
) => {
  try {
    console.log(parsedToken);

    const resp = await axios.delete(`/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    thunkAPI.dispatch(getAllComments(blogId));

    thunkAPI.dispatch(getBlog(blogId));
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
