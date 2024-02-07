import { Message } from '../models/message.js';
import { getRandomId } from '../utils/getRandomId/index.js';

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (firstUserId, secondUserId) => {
    try {
      const allMessages = this._messageRepository.getMessagesBetweenUsers(
        firstUserId,
        secondUserId
      );
      return allMessages;
    } catch (error) {
      throw error;
    }
  };

  addMessage = (senderId, receiverId, messageBody) => {
    try {
      const message = new Message(
        getRandomId(),
        messageBody,
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
