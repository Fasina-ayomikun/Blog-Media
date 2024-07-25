import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  openChat: false,
};

const modalSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setOpenChat: (state) => {
      return { ...state, openChat: true };
    },
    setCloseChat: (state) => {
      return { ...state, openChat: false };
    },
  },
});

export const { setOpenChat, setCloseChat } = modalSlice.actions;
export default modalSlice.reducer;
