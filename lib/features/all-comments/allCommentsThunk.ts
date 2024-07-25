import axios from "axios";

export const getAllCommentsThunk = async (
  id: string | string[],
  thunkAPI: any
) => {
  try {
    const resp = await axios.get(`/api/comments/create/${id}`);

    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
