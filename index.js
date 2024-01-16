import { UserRepository } from "./repository/UserRepository/index.js";
import { MessageRepository } from "./repository/MessageRepository/index.js";
import { seed } from "./utils/seeding/index.js";
import { Message } from "./models/Message/index.js";
import { getRandomId } from "./utils/getRandomId/index.js";
import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const PORT = 3000;

app.use(express.json());

const secretKey = "mahmoud";

const users = new UserRepository();
const messages = new MessageRepository();

seed(users, messages);

app.get("/users", (req, res) => {
  res.send(
    users.getAllUser().map(({ username, email }) => {
      return [username, email];
    })
  );
});

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
    secretKey
  );
  res.json({ token });
});

app.post("/message/:senderId", (req, res) => {
  console.log("this is param", req.params);
  const { body, receiverId } = req.body;
  const senderId = req.params.senderId;
  const newMessage = new Message(
    getRandomId(),
    body,
    senderId,
    receiverId,
    "1:41"
  );
  messages.addMessage(newMessage);
  console.log(messages);
  res.json({ message: "message sent", newMessage });
});

app.get("/messages/:senderId", (req, res) => {
  const senderId = Number(req.params.senderId);
  const { receiverId } = req.body;
  const allMessages = messages.getMessagesBetweenUsers(senderId, receiverId);
  if (!allMessages)
    res.status(401).json({ message: "there no message , Say hi !" });
  console.log(allMessages);
  res.send(allMessages);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
