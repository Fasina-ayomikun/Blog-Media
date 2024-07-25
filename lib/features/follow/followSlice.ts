import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllFollowersThunk,
  getAllFollowingThunk,
  toggleFollowThunk,
} from "./followThunk";

const initialState = {
  isLoading: false,
  followers: [],
  following: [],
  isError: false,
};

export const toggleFollow = createAsyncThunk(
  "follow/toggle",
  toggleFollowThunk
);
export const getAllFollowers = createAsyncThunk(
  "follow/followers",
  getAllFollowersThunk
);
export const getAllFollowing = createAsyncThunk(
  "follow/following",
  getAllFollowingThunk
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(toggleFollow.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(toggleFollow.fulfilled, (state, { payload }) => {
      return {
        ...state,

        isLoading: false,
        isCreated: true,
      };
    });
    builders.addCase(toggleFollow.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });
    builders.addCase(getAllFollowers.pending, (state, { payload }) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(getAllFollowers.fulfilled, (state, { payload }) => {
      console.log(payload);

      return {
        ...state,
        isLoading: false,
        isCreated: true,
        followers: payload.followers,
      };
    });
    builders.addCase(getAllFollowers.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });

    builders.addCase(getAllFollowing.pending, (state, action) => {
      return { ...state, isLoading: true, isCreated: false };
    });
    builders.addCase(getAllFollowing.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        following: payload.following,
      };
    });
    builders.addCase(getAllFollowing.rejected, (state, action) => {
      return { ...state, isLoading: false, isCreated: false };
    });
  },
});

export default followSlice.reducer;
