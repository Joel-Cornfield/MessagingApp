import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongoDB");
  } catch (err) {
    console.log("Error connecting to mongoDB: ", err);
  }
};