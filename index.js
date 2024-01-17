import express from "express";
import jwt from "jsonwebtoken";

import { UserRepository } from "./repository/UserRepository/index.js";
import { MessageRepository } from "./repository/MessageRepository/index.js";
import { seed } from "./utils/seeding/index.js";
import { Message } from "./models/Message/index.js";
import { getRandomId } from "./utils/getRandomId/index.js";

const PORT = 3000;
const SECRETKEY = "mahmoud";

const app = express();

app.use(express.json());

const users = new UserRepository();
const messages = new MessageRepository();

seed(users, messages);

// *************Get all users API*****************

app.get("/users", (req, res) => {
  res.send(
    users.getAllUser().map(({ username, email }) => {
      return [username, email];
    })
  );
});

// *************Get message between two users API*****************

app.get("/messages/:senderId", (req, res) => {
  const senderId = Number(req.params.senderId);
  const { receiverId } = req.body;
  const allMessages = messages.getMessagesBetweenUsers(senderId, receiverId);
  if (!allMessages)
    res.status(401).json({ message: "There no message , Say hi !" });
  console.log(allMessages);
  res.send(allMessages);
});

// *************Login API*****************

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.findUser(email);

  if (!user) {
    return res.status(401).json({ error: "User not found ,please singup" });
  }

  const isCorrectPassword = user.password === password;

  if (!isCorrectPassword)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, userName: user.userName },
    SECRETKEY
  );
  res.json({ token });
});

// *************Add new message API*****************

app.post("/message/:senderId", (req, res) => {
  console.log("this is param", req.params);
  const { body, receiverId } = req.body;
  const senderId = Number(req.params.senderId);
  const newMessage = new Message(
    getRandomId(),
    body,
    senderId,
    receiverId,
    Date.now()
  );
  messages.addMessage(newMessage);
  console.log(messages);
  res.json({ message: "message sent", newMessage });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
