import { Request, Response } from "express";

const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.users_get = asyncHandler(async (req: Express.Request, res: Response) => {
  const allUsers = await User.find({});
  res.send(allUsers);
});

exports.messages_get = asyncHandler(async (req: Request, res: Response) => {
  const { sender, receiver } = req.query;
  const user = await User.find({ username: receiver });

  const messageThread = user[0].messages.filter(
    (message: any) => (message.sender === sender && message.receiver === receiver) || (message.sender === receiver && message.receiver === sender)
  );
  res.send(messageThread);
});