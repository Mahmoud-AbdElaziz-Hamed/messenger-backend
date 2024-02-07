import { NoContentError } from '../errors/NoContentError.js';
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
      return error.message;
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
        throw new NoContentError('there is no messages');
      }
      return allMessages;
    } catch (error) {
      return error.message;
    }
  }
}
