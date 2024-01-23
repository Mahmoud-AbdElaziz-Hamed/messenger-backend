import express from "express";

import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import { messageRouter } from "./routes/message.js";
import { seed } from "./utils/seeding/index.js";
import { UserControllers } from "./controllers/user.js";
import { MessageControllers } from "./controllers/message.js";
import { UserRepository } from "./repository/user.js";
import { MessageRepository } from "./repository/message.js";
import { AuthControllers } from "./controllers/auth.js";
import { getToken } from "./utils/getToken/index.js";
import { SECRET_KEY } from "./controllers/auth.js";
import { verifyToken } from "./utils/verifyToken/index.js";
import { UnauthorizedError } from "./errors/UnauthorizedError.js";
import { UnauthenticatedError } from "./errors/UnauthenticatedError.js";

const userRepository = new UserRepository();
const messageRepository = new MessageRepository();
const userControllers = new UserControllers(userRepository);
const messageControllers = new MessageControllers(messageRepository);
const authControllers = new AuthControllers(userRepository);
seed(userRepository, messageRepository);

const app = express();

app.use(express.json());
app.use("/", authRouter(authControllers));
app.use("/", (req, res, next) => {
  try {
    const token = getToken(req.headers.authorization);
    if (!token) throw new UnauthorizedError("unauthorized", 401);
    verifyToken(token, SECRET_KEY);
    next();
  } catch (error) {
    res.status(error.statusCode).send(error.message);
    next();
  }
});
app.use("/", userRouter(userControllers));
app.use("/", messageRouter(messageControllers));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
