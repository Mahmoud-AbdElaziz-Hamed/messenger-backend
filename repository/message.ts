import { BadRequest } from '../errors/BadRequest';
import { Message } from '../models/message';

export class MessageRepository {
  messages: Message[];
  constructor() {
    this.messages = [];
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  deleteMessageById(messageId: number): number {
    const lengthBeforeDelete = this.messages.length;
    this.messages = this.messages.filter(({ id }) => id !== messageId);
    const lengthAfterDelete = this.messages.length;
    if (lengthBeforeDelete === lengthAfterDelete) {
      throw new BadRequest('Invalid id, there is no message has this id');
    }
    return messageId;
  }

  getMessagesBetweenUsers(
    firstUserId: number,
    secondUserId: number
  ): {
    id: number;
    body: string;
    senderId: number;
    receiverId: number;
    timestamp: number;
  }[] {
    const allMessages = this.messages
      .filter(
        (message) =>
          (message.senderId === firstUserId &&
            message.receiverId === secondUserId) ||
          (message.receiverId === firstUserId &&
            message.senderId === secondUserId)
      )
      .map(({ id, body, senderId, receiverId, timestamp }) => {
        return { id, body, senderId, receiverId, timestamp };
      });

    return allMessages;
  }
}
