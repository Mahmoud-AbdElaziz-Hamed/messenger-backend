class Message {
  constructor(id, body, senderId, receverId, timeStamp) {
    this._id = id;
    this._body = body;
    this._senderId = senderId;
    this._receverId = receverId;
    this._timeStamp = timeStamp;
  }

  getId() {
    return this._id;
  }

  setId(messageId) {
    this._id = messageId;
  }

  getBody() {
    return this._body;
  }

  setBody(messageBody) {
    this._body = messageBody;
  }

  getSenderId() {
    return this._senderId;
  }

  setSenderId(senderId) {
    this._senderId = senderId;
  }

  getReceverId() {
    return this._receverId;
  }

  setReceverId(receverId) {
    this._receverId = receverId;
  }

  getTimeStamp() {
    return this._timeStamp;
  }

  setTimeStamp(messageTime) {
    this._timeStamp = messageTime;
  }
}
