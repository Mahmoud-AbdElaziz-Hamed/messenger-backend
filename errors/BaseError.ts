class BaseError {
  private _message: string;
  private _statusCode: number;
  constructor(message: string, statusCode: number) {
    this._message = message;
    this._statusCode = statusCode;
  }

  get message(): string {
    return this._message;
  }

  set message(message: string) {
    this._message = message;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  set statusCode(statusCode: number) {
    this._statusCode = statusCode;
  }
}
export { BaseError };
