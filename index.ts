import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';
import { messageRouter } from './routes/message';
import { seed } from './utils/seeding/index';
import { UserControllers } from './controllers/user';
import { MessageControllers } from './controllers/message';
import { UserRepository } from './repository/user';
import { MessageRepository } from './repository/message';
import { AuthControllers } from './controllers/auth';
import { isAuthenticated } from './middlewares/isAuthenticated';

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
app.use(cors());

app.use('/', authRouter(authControllers));
app.use(isAuthenticated);
app.use('/user', userRouter(userControllers));
app.use('/message', messageRouter(messageControllers));

app.listen(PORT, () => {
  console.log(`type script app listening on port ${PORT}`);
});
