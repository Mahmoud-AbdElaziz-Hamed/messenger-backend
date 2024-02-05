import { NoContentError } from "../errors/NoContentError.js";
import { Message } from "../models/message.js";
import { getRandomId } from "../utils/getRandomId/index.js";

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (firstUserId, userId) => {
    try {
      const secondUserId = Number(userId);
      const allMessages = this._messageRepository.getMessagesBetweenUsers(
        firstUserId,
        secondUserId
      );
      if (!allMessages) throw new NoContentError();
      return allMessages;
    } catch (error) {
      if (error.statusCode === 204) {
        return [];
      }
      throw error;
    }
  };

  addMessage = (senderId, id, messageBody) => {
    try {
      const body = messageBody;
      const receiverId = id;
      const message = new Message(
        getRandomId(),
        body,
        senderId,
        receiverId,
        `${new Date().getHours()}:${new Date().getMinutes()}`
      );
      this._messageRepository.addMessage(message);
      return { message };
    } catch (error) {
      throw error;
    }
  };
}
