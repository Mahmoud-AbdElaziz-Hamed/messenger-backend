class Message {
  constructor(id, body, senderId, receiverId, timeStamp) {
    this.id = id;
    this.body = body;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.timeStamp = timeStamp;
  }

  getId() {
    return this.id;
  }

  setId(messageId) {
    this.id = messageId;
  }

  getBody() {
    return this.body;
  }

  setBody(messageBody) {
    this.body = messageBody;
  }

  getSenderId() {
    return this.senderId;
  }

  setSenderId(senderId) {
    this.senderId = senderId;
  }

  getreceiverId() {
    return this.receiverId;
  }

  setreceiverId(receiverId) {
    this.receiverId = receiverId;
  }

  getTimeStamp() {
    return this.timeStamp;
  }

  setTimeStamp(messageTime) {
    this.timeStamp = messageTime;
  }
}
module.exports = Message;
