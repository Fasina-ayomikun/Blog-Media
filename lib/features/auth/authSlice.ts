import {
  ActionReducerMapBuilder,
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { signInUserThunk, signUpUserThunk } from "./authThunk";
import { AppDispatch, RootState } from "@/lib/store";
import { SignUpDetails } from "@/lib/types";
import axios from "axios";
const initialState = {
  fullName: "",

  email: "",
  image: "",
  bio: "",
  password: "",
  password2: "",
  isLoading: false,
  isRegistered: false,
};
export const signUpUser = createAsyncThunk("auth/signup", signUpUserThunk);
export const signInUser = createAsyncThunk("auth/signin", signInUserThunk);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleChange: (
      state,
      { payload }: { payload: { name: string; value: string } }
    ) => {
      const { name, value } = payload;

      return { ...state, [name]: value };
    },
    clearState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<{}>): void => {
    builder.addCase(signUpUser.pending, (state, action) => {
      console.log(action);
      return { ...state, isLoading: true, isRegistered: false };
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, isRegistered: true };
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      console.log(action);
      return { ...state, isLoading: false, isRegistered: false };
    });
    builder.addCase(signInUser.pending, (state, action) => {
      console.log(action);
      return { ...state, isLoading: true, isRegistered: false };
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, isRegistered: true };
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      console.log(action);
      return { ...state, isLoading: false, isRegistered: false };
    });
  },
});
export const { handleChange, clearState } = authSlice.actions;
export default authSlice.reducer;
