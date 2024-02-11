import { BadRequest } from '../errors/BadRequest.js';

export class MessageRepository {
  constructor() {
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }

  deleteMessageById(messageId) {
    const lengthBeforeDelete = this.messages.length;
    this.messages = this.messages.filter(({ id }) => id !== messageId);
    const lengthAfterDelete = this.messages.length;
    if (lengthBeforeDelete === lengthAfterDelete) {
      throw new BadRequest('Invalid id, there is no message has this id');
    }
    return messageId;
  }

  getMessagesBetweenUsers(firstUserId, secondUserId) {
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
