import axios from "axios";

const getAllConversationsThunk = async (userId: string, thunkAPI?: any) => {
  try {
    const resp = await axios.get(`/api/conversation/all/${userId}`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export { getAllConversationsThunk };
