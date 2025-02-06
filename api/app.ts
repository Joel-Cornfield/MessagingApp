import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
const User = require("./models/user");

dotenv.config();

//Require route
const apiRouter = require("./routes/api");

const app = express();

//Set up mongoose connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || " ");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
}
mongoose.set("strictQuery", false);

main();

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

server.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("joined", () => {
    io.sockets.emit("new-user", "new user joined");
  });

  socket.on("private message", async (to, message, myself) => {
    try {
      const user = await User.findOne({ username: to });
      const sender = await User.findOne({ username: myself });

      io.sockets.emit("refresh", "new Message");

      if (user && sender) {
        user.messages.push({
          receiver: user.username,
          message,
          sender: sender.username,
          time: new Date(),
        });
        sender.messages.push({
          receiver: user.username,
          message,
          sender: sender.username,
          time: new Date(),
        });
        await user.save();
        await sender.save();
      } else {
        console.error("User or sender not found.");
      }
    } catch (err) {
      console.error("Error handling private message:", err);
    }
  });
});

app.use("/api", apiRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});