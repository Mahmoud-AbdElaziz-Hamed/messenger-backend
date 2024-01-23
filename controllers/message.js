import { NoContentError } from "../errors/NoContentError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { Message } from "../models/message.js";
import { getRandomId } from "../utils/getRandomId/index.js";
import { getToken } from "../utils/getToken/index.js";
import { verifyToken } from "../utils/verifyToken/index.js";
import { SECRET_KEY } from "./auth.js";

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (authorization, userId) => {
    try {
      const token = getToken(authorization);
      const firstUserId = verifyToken(token, SECRET_KEY).id;
      const secondUserId = Number(userId);
      if (!token) throw new UnauthorizedError("unauthorized", 401);
      const allMessages = this._messageRepository.getMessagesBetweenUsers(
        firstUserId,
        secondUserId
      );
      if (!allMessages) throw new NoContentError("No messages are found", 204);
      return allMessages;
    } catch (error) {
      throw error;
    }
  };

  addMessage = (authorization, id, messageBody) => {
    try {
      const { body } = messageBody;
      const receiverId = id;
      const token = getToken(authorization);
      const senderId = verifyToken(token, SECRET_KEY).id;
      if (!token) throw new UnauthorizedError("unauthorized", 401);
      const message = new Message(
        getRandomId(),
        body,
        senderId,
        receiverId,
        Date.now()
      );
      this._messageRepository.addMessage(message);
      return { message };
    } catch (error) {
      if (error.statusCode === 204) {
        return [];
      }
      throw error;
    }
  };
}
