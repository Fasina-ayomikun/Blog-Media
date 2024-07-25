import {
  ActionReducerMapBuilder,
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/lib/store";

import axios from "axios";
import { getUserDetailsThunk } from "./userThunk";
import { UserInterface } from "@/lib/types";
const initialState: {
  author: UserInterface;
  isLoading: boolean;
  authorFollowers: string[];
} = {
  author: {
    _id: "",
    fullName: "",
    bio: "",
    image: "",
    email: "",
    createdAt: "",
  },
  isLoading: false,
  authorFollowers: [],
};
export const getUserDetails = createAsyncThunk(
  "user/profile",
  getUserDetailsThunk
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<{}>): void => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      console.log(action);
      return { ...state, isLoading: true };
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        author: payload.user,
        authorFollowers: payload.followers,
      };
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      console.log(action);
      return { ...state, isLoading: false };
    });
  },
});
export default userSlice.reducer;
