import { Message } from "../models/message.js";
import { getRandomId } from "../utils/getRandomId/index.js";
import { getToken } from "../utils/getToken/index.js";
import { verifyToken } from "../utils/verifyToken/index.js";
import { SECRET_KEY } from "./auth.js";

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (req, res) => {
    try {
      const token = getToken(req.headers.authorization);
      const userData = verifyToken(token, SECRET_KEY);
      const firstUserId = verifyToken(token, SECRET_KEY).id;
      const secondUserId = Number(req.params.userId);
      if (!token) {
        throw new Error("unauthorized", { statusCode: 401 });
      } else if (userData.status) {
        throw new Error("Invalid token", { statusCode: 401 });
      } else {
        const allMessages = this._messageRepository.getMessagesBetweenUsers(
          firstUserId,
          secondUserId
        );
        if (!allMessages)
          throw new Error("No messages are found", { statusCode: 204 });
        return allMessages;
      }
    } catch (error) {
      return error.message;
    }
  };

  addMessage = (req, res) => {
    try {
      const { body } = req.body;
      const receiverId = Number(req.params.userId);
      const token = getToken(req.headers.authorization);
      const userData = verifyToken(token, SECRET_KEY);
      const senderId = verifyToken(token, SECRET_KEY).id;
      if (!token) {
        throw new Error("unauthorized", { statusCode: 401 });
      } else if (userData.status) {
        throw new Error("Invalid token", { statusCode: 401 });
      } else {
        const message = new Message(
          getRandomId(),
          body,
          senderId,
          receiverId,
          Date.now()
        );
        this._messageRepository.addMessage(message);
        return { message };
      }
    } catch (error) {
      return error.message;
    }
  };
}
