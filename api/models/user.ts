import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatarUrl: { 
      type: String, 
      required: false, 
    },
    password: {
      type: String,
      required: true,
    },
    messages: [
      {
        message: String,
        sender: String,
        receiver: String,
        time: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
