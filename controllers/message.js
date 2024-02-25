import { BadRequest } from '../errors/BadRequest.js';
import { Message } from '../models/message.js';
import { getRandomId } from '../utils/getRandomId/index.js';

export class MessageControllers {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (firstUserId, secondUserId) => {
    if (!firstUserId) {
      throw new BadRequest('firstUserId cannot be empty');
    }

    if (!secondUserId) {
      throw new BadRequest('secondUserId cannot be empty');
    }

    const allMessages = this.messageRepository.getMessagesBetweenUsers(
      firstUserId,
      secondUserId
    );
    return allMessages;
  };

  addMessage = (senderId, receiverId, messageBody) => {
    if (!senderId) {
      throw new BadRequest('senderId cannot be empty');
    }

    if (!receiverId) {
      throw new BadRequest('receiverId cannot be empty');
    }

    if (!messageBody) {
      throw new BadRequest('messageBody cannot be empty');
    }

    const message = new Message(
      getRandomId(),
      messageBody,
      senderId,
      receiverId,
      Date.now()
    );
    this.messageRepository.addMessage(message);
    return message;
  };
}
