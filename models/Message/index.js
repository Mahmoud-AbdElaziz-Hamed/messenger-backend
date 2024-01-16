export class Message {
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

  setId(id) {
    this.id = id;
  }

  getBody() {
    return this.body;
  }

  setBody(body) {
    this.body = body;
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
