import express from "express";
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;

const secretKey = "mahmoud";

const User1 = new User(1, "mahmoud", "mahmoud@gmail.com", 12345);
const User2 = new User(2, "yasser", "yasser@gmail.com", 123456);
const User3 = new User(3, "ahmed", "ahmed@gmail.com", 123457);

const MessageUser1ToUser2 = new Message(1, "hello yasser", 1, 2, "1:53");
const MessageUser2ToUser1 = new Message(2, "hello mahmoud", 2, 1, "1:54");
const MessageUser2ToUser3 = new Message(3, "hello ahmed", 2, 3, "1:56");
const MessageUser3ToUser2 = new Message(4, "hello yasser", 3, 2, "1:57");
const MessageUser1ToUser3 = new Message(5, "hello ahmed", 1, 3, "1:58");
const MessageUser3ToUser1 = new Message(6, "hello mahmoud", 3, 1, "1:58");

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!<h1/>
   <h2>This my first task<h2/> 
   <h3>thank you yasser<h3/> `);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
