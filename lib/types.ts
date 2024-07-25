"use client";
import mongoose from "mongoose";

export interface PostInterface {
  _id: string;
  image: string;
  title: string;
  desc: string;
  noOfLikes: number;
  noOfComments: number;
  user: UserInterface;
}
export interface UserInterface {
  _id: string;
  fullName: string;
  bio: string;
  image: string;
  email: string;
  createdAt: string;
}
export interface InitialStateInterface {
  isLoading: boolean;
  title: string;
  subtitle: string;
  content: string;
  bannerImg: string;
  published: boolean;
  id: string;
  tags: string[];
  noOfComments: number;
  noOfLikes: number;
  writer: UserInterface;
  isCreated: boolean;
  isError: boolean;
  likers: string[];
}
export interface CommentDetailsInterface {
  _id?: string;
  text: string;
  blog?: string;
  user?: UserInterface;
  createdAt?: string;
  updatedAt?: string;
}
export interface BlogInterface {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  bannerImg?: string;
  writer?: UserInterface;
  noOfLikes: number;
  noOfComments: number;
  createdAt: string;
}
export interface BlogDetailsInterface {
  title: string;
  content: string;
  subtitle: string;
  bannerImg?: string;
  published: boolean;
}
export interface JwtPayload {
  email: string;
  userId: string;
}
export interface CommentDocument extends mongoose.Document {
  title: string;
  user: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
  desc?: string;
}

export interface CommentModel extends mongoose.Model<CommentDocument> {
  calculateComments(blogId: string): Promise<void>;
}
export interface LikeDocument extends mongoose.Document {
  liked: boolean;
  user: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
}
export interface LikeModel extends mongoose.Model<LikeDocument> {
  calculateLikes(blogId: string): Promise<void>;
}
export interface SignUpDetails {
  fullName: string;
  email: string;
  password: string;
  password2: string;
  bio: string;
  image: string;
}

export let parsedToken: null | string;
export let parsedUser: null | UserInterface;
if (typeof window !== "undefined" && window.localStorage) {
  let token = window.localStorage.getItem("BLOG-MEDIA-TOKEN");
  parsedToken = token && JSON.parse(token);
  let user = localStorage.getItem("BLOG-MEDIA-USER");
  parsedUser = user && JSON.parse(user);
}
export interface conversationInterface {
  _id: string;
  firstMember: UserInterface;
  secondMember: UserInterface;
}
export interface UserInterfaceServer {
  userId: string;
  socketId: string;
}
