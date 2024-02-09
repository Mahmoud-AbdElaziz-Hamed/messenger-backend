import { NotFoundError } from '../errors/NotFoundError.js';

export class MessageRepository {
  constructor() {
    this._messages = [];
  }

  addMessage(message) {
    this._messages.push(message);
  }

  deleteMessageById(messageId) {
    try {
      const lengthBeforeDelete = this._messages.length;
      this._messages = this._messages.filter(({ id }) => id !== messageId);
      const lengthAfterDelete = this._messages.length;
      if (lengthBeforeDelete === lengthAfterDelete) {
        throw new NotFoundError('Invalid id ,there is no message has this id');
      }
      return messageId;
    } catch (error) {
      throw error;
    }
  }

  getMessagesBetweenUsers(firstUserId, secondUserId) {
    try {
      const allMessages = this._messages.filter(
        (message) =>
          (message.senderId === firstUserId &&
            message.receiverId === secondUserId) ||
          (message.receiverId === firstUserId &&
            message.senderId === secondUserId)
      );
      if (allMessages.length === 0) {
        return [];
      }
      return allMessages;
    } catch (error) {
      throw error;
    }
  }
}
