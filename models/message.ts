export class Message {
  private _id: number;
  private _body: string;
  private _senderId: number;
  private _receiverId: number;
  private _timestamp: number;
  constructor(
    id: number,
    body: string,
    senderId: number,
    receiverId: number,
    timestamp: number
  ) {
    this._id = id;
    this._body = body;
    this._senderId = senderId;
    this._receiverId = receiverId;
    this._timestamp = timestamp;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get body(): string {
    return this._body;
  }

  set body(body: string) {
    this._body = body;
  }

  get senderId(): number {
    return this._senderId;
  }

  set senderId(senderId: number) {
    this._senderId = senderId;
  }

  get receiverId(): number {
    return this._receiverId;
  }

  set receiverId(receiverId: number) {
    this._receiverId = receiverId;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(timestamp: number) {
    this._timestamp = timestamp;
  }
}
