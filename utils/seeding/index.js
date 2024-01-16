import { User } from "../../models/User/index.js";
import { Message } from "../../models/Message/index.js";

export function seed(users, messages) {
  const mocUserData = [
    {
      id: 1,
      username: "mahmoud",
      email: "mahmoud@gmail.com",
      password: "12345",
    },
    {
      id: 2,
      username: "yasser",
      email: "yasser@gmail.com",
      password: "123456",
    },
    {
      id: 3,
      username: "ahmed",
      email: "ahmed@gmail.com",
      password: "123457",
    },
  ];

  mocUserData.forEach(({ id, username, email, password }) => {
    const user = new User(id, username, email, password);
    users.addUser(user);
  });

  const mocMessageData = [
    {
      id: 1,
      body: "hello yasser",
      senderId: 1,
      receiverId: 2,
      timeStamp: Date.now(),
    },
    {
      id: 2,
      body: "hello mahmoud",
      senderId: 2,
      receiverId: 1,
      timeStamp: Date.now(),
    },
    {
      id: 3,
      body: "hello ahmed",
      senderId: 2,
      receiverId: 3,
      timeStamp: Date.now(),
    },
    {
      id: 4,
      body: "hello yasser",
      senderId: 3,
      receiverId: 2,
      timeStamp: Date.now(),
    },
    {
      id: 5,
      body: "hello ahmed",
      senderId: 1,
      receiverId: 3,
      timeStamp: Date.now(),
    },
    {
      id: 6,
      body: "hello mahmoud",
      senderId: 3,
      receiverId: 1,
      timeStamp: Date.now(),
    },
  ];

  mocMessageData.forEach(({ id, body, senderId, receiverId, timeStamp }) => {
    const message = new Message(id, body, senderId, receiverId, timeStamp);
    messages.addMessage(message);
  });
}
