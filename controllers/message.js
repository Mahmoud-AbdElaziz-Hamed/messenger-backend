import { BadRequest } from '../errors/BadRequest.js';
import { Message } from '../models/message.js';
import { getRandomId } from '../utils/getRandomId/index.js';

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (firstUserId, secondUserId) => {
    try {
      if (!firstUserId || !secondUserId) {
        throw new BadRequest(
          'Sender ID, receiver ID cannot be empty or undefined'
        );
      }
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
      if (!receiverId || !messageBody) {
        throw new BadRequest('receiver ID, or message body cannot be empty');
      }
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
