import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import blogSlice from "./features/blog/blogSlice";
import allBlogsSlice from "./features/all-blogs/allBlogsSlice";
import allCommentsSlice from "./features/all-comments/allCommentsSlice";
import commentSlice from "./features/comment/commentSlice";
import followSlice from "./features/follow/followSlice";
import allMessagesSlice from "./features/all-messages/allMessagesSlice";
import allConversationSlice from "./features/all-conversations/allConversationSlice";
import conversationSlice from "./features/conversation/conversationSlice";
import messageSlice from "./features/message/messageSlice";
import userSlice from "./features/user/userSlice";
import modalSlice from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    blogSlice,
    allBlogsSlice,
    allCommentsSlice,
    commentSlice,
    followSlice,
    allMessagesSlice,
    allConversationSlice,
    conversationSlice,
    messageSlice,
    userSlice,
    modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
