import express from "express";
import dotenv from "dotenv";

import { userRouter } from "./routes/user.js";
import { messageRouter } from "./routes/message.js";
import { seed } from "./utils/seeding/index.js";
import { UserControllers } from "./controllers/user.js";
import { MessageControllers } from "./controllers/message.js";
import { UserRepository } from "./repository/UserRepository/index.js";
import { MessageRepository } from "./repository/MessageRepository/index.js";

const createInstance = (req, res, next) => {
  const userRepository = new UserRepository();
  const messageRepository = new MessageRepository();
  req.userControllers = new UserControllers(userRepository);
  req.messageControllers = new MessageControllers(messageRepository);
  seed(userRepository, messageRepository);
  next();
};

dotenv.config();
const app = express();
app.use(createInstance);
app.use(express.json());
app.use("/userRoutes", userRouter);
app.use("/messageRoutes", messageRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
