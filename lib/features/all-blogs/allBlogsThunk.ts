import { parsedToken } from "@/lib/types";
import axios from "axios";

export const getAllBlogsThunk = async (
  { tags }: { tags?: string[] },
  thunkAPI?: any
) => {
  try {
    const resp = await axios.get(`/api/blog?tags=${tags?.join(",")}`);

    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
export const getAllDraftsThunk = async (
  { tags }: { tags?: string[] },
  thunkAPI?: any
) => {
  try {
    const resp = await axios.get(`/api/blog/drafts`, {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });

    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
