import axios from "axios";

const getAllMessagesThunk = async (conversationId: string, thunkAPI?: any) => {
  try {
    const resp = await axios.get(`/api/message/${conversationId}`);
    console.log(resp);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export { getAllMessagesThunk };
