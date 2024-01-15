class MessageRepository {
  constructor() {
    this._Messages = [];
  }

  postUser(User) {
    this._Messages.push(User);
  }

  deleteUserById(messageId) {
    this._Messages = this._Messages.filter(({ id }) => id !== messageId);
  }

  getAllUser() {
    return this._Messages;
  }

  getMessageBetweenUsers(senderId, receverId) {
    senderMessages = this._Messages.filter(
      (message) => (message.senderId = senderId)
    );
    receverMessages = this._Messages.filter(
      (message) => (message.receverId = receverId)
    );
    return senderMessages, receverMessages;
  }
}
