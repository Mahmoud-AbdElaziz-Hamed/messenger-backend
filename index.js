import express from "express";
import dotenv from "dotenv";

import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import { messageRouter } from "./routes/message.js";
import { seed } from "./utils/seeding/index.js";
import { UserControllers } from "./controllers/user.js";
import { MessageControllers } from "./controllers/message.js";
import { UserRepository } from "./repository/user.js";
import { MessageRepository } from "./repository/message.js";

const userRepository = new UserRepository();
const messageRepository = new MessageRepository();
const userControllers = new UserControllers(userRepository);
const messageControllers = new MessageControllers(messageRepository);
seed(userRepository, messageRepository);

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", userRouter(userControllers));
app.use("/", messageRouter(messageControllers));
app.use("/", authRouter(userControllers));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
