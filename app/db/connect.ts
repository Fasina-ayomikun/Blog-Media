import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () => {
  if (isConnected) {
    console.log("Mongo is already connected");
    return;
  }
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log("Mongo connected");
    }
  } catch (error) {
    console.log(error);
  }
};
