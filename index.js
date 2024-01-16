const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;

app.use(express.json());

const UserRepository = require("./models/UserRepository/index");
const MessageRepository = require("./models/MessageRepository/index");
const User = require("./models/User/index");
const Message = require("./models/Message/index");

const secretKey = "mahmoud";

const users = new UserRepository();
const messages = new MessageRepository();

const user1 = new User(1, "mahmoud", "mahmoud@gmail.com", "12345");
const user2 = new User(2, "yasser", "yasser@gmail.com", "123456");
const user3 = new User(3, "ahmed", "ahmed@gmail.com", "123457");

users.addUser(user1);
users.addUser(user2);
users.addUser(user3);

const messageUser1ToUser2 = new Message(1, "hello yasser", 1, 2, "1:53");
const messageUser2ToUser1 = new Message(2, "hello mahmoud", 2, 1, "1:54");
const messageUser2ToUser3 = new Message(3, "hello ahmed", 2, 3, "1:56");
const messageUser3ToUser2 = new Message(4, "hello yasser", 3, 2, "1:57");
const messageUser1ToUser3 = new Message(5, "hello ahmed", 1, 3, "1:58");
const messageUser3ToUser1 = new Message(6, "hello mahmoud", 3, 1, "1:58");

messages.addMessage(messageUser1ToUser2);
messages.addMessage(messageUser2ToUser1);
messages.addMessage(messageUser2ToUser3);
messages.addMessage(messageUser3ToUser2);
messages.addMessage(messageUser1ToUser3);
messages.addMessage(messageUser3ToUser1);

app.get("/users", (req, res) => {
  res.send(
    users.getAllUser().map(({ userName, email }) => {
      return [userName, email];
    })
  );
});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  const user = users.findUser(userName, password);
  if (!user) {
    return res.status(401).json({ error: "please sing up" });
  }
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
    Math.floor(Math.random() * 1000),
    body,
    senderId,
    receiverId,
    "1:41"
  );
  messages.addMessage(newMessage);
  console.log(messages);
  res.json({ message: "message sent", newMessage });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
