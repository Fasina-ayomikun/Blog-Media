import axios from "axios";

export const getUserDetailsThunk = async (
  data: { id: string },
  thunkAPI: any
) => {
  try {
    console.log(data);

    const resp = await axios.get(`/api/auth/profile/${data.id}`);

    return resp.data;
  } catch (error) {
    console.log(error);
    if (error) {
      return thunkAPI.rejectWithValue((error as any).response.data.message);
    }
  }
};
