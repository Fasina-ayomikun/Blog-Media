import { SignUpDetails } from "@/lib/types";
import axios from "axios";
import { clearState } from "./authSlice";

export const signUpUserThunk = async (data: SignUpDetails, thunkAPI: any) => {
  try {
    console.log(data);

    const resp = await axios.post("/api/auth/signup", data);
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
export const signInUserThunk = async (
  data: { email: string; password: string },
  thunkAPI: any
) => {
  try {
    console.log(data);

    const resp = await axios.post("/api/auth/signin", data);
    thunkAPI.dispatch(clearState());
    console.log(resp.data);
    localStorage.setItem("BLOG-MEDIA-USER", JSON.stringify(resp.data.user));
    localStorage.setItem("BLOG-MEDIA-TOKEN", JSON.stringify(resp.data.token));
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
