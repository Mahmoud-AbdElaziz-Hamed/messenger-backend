import { BadRequest } from '../errors/BadRequest';
import { Message } from '../models/message';
import { MessageRepository } from '../repository/message';
import { MessageData } from '../typs';
import { getRandomId } from '../utils/getRandomId/index';

export class MessageControllers {
  messageRepository: MessageRepository;
  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (
    firstUserId: number,
    secondUserId: number
  ): MessageData[] => {
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

  addMessage = (
    senderId: number,
    receiverId: number,
    messageBody: string
  ): Message => {
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
