import { User } from '../../models/user';
import { Message } from '../../models/message';
import { UserRepository } from '../../repository/user';
import { MessageRepository } from '../../repository/message';

export function seed(users: UserRepository, messages: MessageRepository): void {
  const mockUserData = [
    {
      id: 1,
      username: 'mahmoud abd elaziz hamed',
      email: 'mahmoud@gmail.com',
      password: '12345678',
    },
    {
      id: 2,
      username: 'yasser elhenawy',
      email: 'yasser@gmail.com',
      password: '123456789',
    },
    {
      id: 3,
      username: 'ahmed abd elaziz hamed',
      email: 'ahmed@gmail.com',
      password: '1234567899',
    },
  ];

  mockUserData.forEach(({ id, username, email, password }) => {
    const user: User = new User(id, username, email, password, false);
    users.addUser(user);
  });

  const mockMessageData = [
    {
      id: 1,
      body: 'hello yasser',
      senderId: 1,
      receiverId: 2,
      timeStamp: Date.now(),
    },
    {
      id: 2,
      body: 'hello mahmoud',
      senderId: 2,
      receiverId: 1,
      timeStamp: Date.now(),
    },
    {
      id: 3,
      body: 'hello ahmed',
      senderId: 2,
      receiverId: 3,
      timeStamp: Date.now(),
    },
    {
      id: 4,
      body: 'hello yasser',
      senderId: 3,
      receiverId: 2,
      timeStamp: Date.now(),
    },
    {
      id: 5,
      body: 'hello ahmed',
      senderId: 1,
      receiverId: 3,
      timeStamp: Date.now(),
    },
    {
      id: 6,
      body: 'hello mahmoud',
      senderId: 3,
      receiverId: 1,
      timeStamp: Date.now(),
    },
  ];

  mockMessageData.forEach(({ id, body, senderId, receiverId, timeStamp }) => {
    const message = new Message(id, body, senderId, receiverId, timeStamp);
    messages.addMessage(message);
  });
}
