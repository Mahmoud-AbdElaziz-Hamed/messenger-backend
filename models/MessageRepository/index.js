class MessageRepository {
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
      (message) => (message.senderId = senderId)
    );
    const receiverMessages = this.messages.filter(
      (message) => (message.receiverId = receiverId)
    );
    return [...senderMessages, ...receiverMessages];
  }
}
module.exports = MessageRepository;
