export class MessageRepository {
  constructor() {
    this._messages = [];
  }

  addMessage(message) {
    this._messages.push(message);
  }

  deleteMessageById(messageId) {
    this._messages = this._messages.filter(({ id }) => id !== messageId);
    return messageId;
  }

  get allMessages() {
    return this._messages;
  }

  getMessagesBetweenUsers(firstUserId, secondUserId) {
    const allMessages = this._messages.filter(
      (message) =>
        (message.senderId === firstUserId &&
          message.receiverId === secondUserId) ||
        (message.receiverId === firstUserId &&
          message.senderId === secondUserId)
    );
    return allMessages;
  }
}
