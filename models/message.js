export class Message {
  constructor(id, body, senderId, receiverId, timestamp) {
    this._id = id;
    this._body = body;
    this._senderId = senderId;
    this._receiverId = receiverId;
    this._timestamp = timestamp;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get body() {
    return this._body;
  }

  set body(body) {
    this._body = body;
  }

  get senderId() {
    return this._senderId;
  }

  set senderId(senderId) {
    this._senderId = senderId;
  }

  get receiverId() {
    return this._receiverId;
  }

  set receiverId(receiverId) {
    this._receiverId = receiverId;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(timestamp) {
    this._timestamp = timestamp;
  }
}
