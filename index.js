import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { UserRepository } from "./repository/UserRepository/index.js";
import { MessageRepository } from "./repository/MessageRepository/index.js";
import { seed } from "./utils/seeding/index.js";
import { Message } from "./models/Message/index.js";
import { getRandomId } from "./utils/getRandomId/index.js";

dotenv.config();
const app = express();

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;

app.use(express.json());

const userRepository = new UserRepository();
const messageRepository = new MessageRepository();

seed(userRepository, messageRepository);

// *************Get all users API*****************

app.get("/users", (req, res) => {
  res.send(
    userRepository.allUser.map(({ username, email }) => {
      return { username, email };
    })
  );
});

// *************Get message between two users API*****************

app.get("/messages", (req, res) => {
  const token = req.headers.authenticated.replace("Bearer ", "");
  const firstUserId = jwt.verify(token, SECRET_KEY).userId;
  const { secondUserId } = req.body;
  const allMessages = messageRepository.getMessagesBetweenUsers(
    firstUserId,
    secondUserId
  );
  if (!allMessages)
    res.status(204).json({ message: "There no message , Say hi !" });
  res.send(allMessages);
});

// *************Login API*****************

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = userRepository.findUser(email);

  if (!user) {
    return res.status(401).json({ error: "User not found ,please singup" });
  }

  const isCorrectPassword = user.password === password;

  if (!isCorrectPassword)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    SECRET_KEY
  );
  res.json({ token });
});

// *************Add new message API*****************

app.post("/message", (req, res) => {
  const { body, receiverId } = req.body;
  const token = req.headers.authenticated.replace("Bearer ", "");
  const senderId = jwt.verify(token, SECRET_KEY).userId;
  const newMessage = new Message(
    getRandomId(),
    body,
    senderId,
    receiverId,
    Date.now()
  );
  messageRepository.addMessage(newMessage);
  res.json({ message: "message sent", newMessage });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
