export class MessageRepository {
  constructor() {
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }

  deleteMessageById(messageId) {
    this.messages = this.messages.filter(({ id }) => id !== messageId);
    return messageId;
  }

  getAllMessages() {
    return this.messages;
  }

  getMessagesBetweenUsers(senderId, receiverId) {
    const senderMessages = this.messages.filter(
      (message) =>
        message.senderId === senderId && message.receiverId === receiverId
    );
    const receiverMessages = this.messages.filter(
      (message) =>
        message.receiverId === senderId && message.senderId === receiverId
    );
    return [...senderMessages, ...receiverMessages];
  }
}
