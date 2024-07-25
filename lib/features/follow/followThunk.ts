"use client";
import { CommentDetailsInterface, parsedToken } from "@/lib/types";
import axios from "axios";
import { getAllComments } from "../all-comments/allCommentsSlice";
import { getBlog } from "../blog/blogSlice";
import { getAllFollowers } from "./followSlice";
import { getUserDetails } from "../user/userSlice";

export const toggleFollowThunk = async (
  {
    follower,
    following,
  }: { follower: string | string[]; following: string | string[] },
  thunkAPI: any
) => {
  try {
    const resp = await axios.get(
      `/api/follow/toggle?following=${following}&follower=${follower}`,
      {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    );
    thunkAPI.dispatch(getAllFollowers({ userId: follower }));
    thunkAPI.dispatch(getUserDetails({ id: follower as string }));
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};

export const getAllFollowersThunk = async (
  { userId }: { userId: string | string[] },
  thunkAPI: any
) => {
  try {
    console.log(parsedToken);

    const resp = await axios.get(
      `/api/follow/followers/${userId}`,

      {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    );
    console.log(resp.data, "followers");

    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
export const getAllFollowingThunk = async (
  { userId }: { userId: string | string[] },
  thunkAPI: any
) => {
  try {
    console.log(parsedToken);

    const resp = await axios.get(
      `/api/follow/following/${userId}`,

      {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    );

    console.log(resp.data, "following");
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
