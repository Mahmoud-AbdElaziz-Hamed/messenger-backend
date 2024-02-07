import express from 'express';
import dotenv from 'dotenv';

import { userRouter } from './routes/user.js';
import { authRouter } from './routes/auth.js';
import { messageRouter } from './routes/message.js';
import { seed } from './utils/seeding/index.js';
import { UserControllers } from './controllers/user.js';
import { MessageControllers } from './controllers/message.js';
import { UserRepository } from './repository/user.js';
import { MessageRepository } from './repository/message.js';
import { AuthControllers } from './controllers/auth.js';
import { isAuthenticated } from './middlewares/isAuthonticate.js';

const userRepository = new UserRepository();
const messageRepository = new MessageRepository();
const userControllers = new UserControllers(userRepository);
const messageControllers = new MessageControllers(messageRepository);
const authControllers = new AuthControllers(userRepository);

seed(userRepository, messageRepository);
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', authRouter(authControllers));
app.use('/', isAuthenticated);
app.use('/user', userRouter(userControllers));
app.use('/message', messageRouter(messageControllers));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
