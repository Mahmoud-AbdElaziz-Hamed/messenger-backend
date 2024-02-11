import { BadRequest } from '../errors/BadRequest.js';
import { Message } from '../models/message.js';
import { getRandomId } from '../utils/getRandomId/index.js';

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (firstUserId, secondUserId) => {
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
  };

  addMessage = (senderId, receiverId, messageBody) => {
    if (!receiverId || !messageBody) {
      throw new BadRequest('receiver ID, or message body cannot be empty');
    }
    const message = new Message(
      getRandomId(),
      messageBody,
      senderId,
      receiverId,
      Date.now()
    );
    this._messageRepository.addMessage(message);
    return { message };
  };
}
