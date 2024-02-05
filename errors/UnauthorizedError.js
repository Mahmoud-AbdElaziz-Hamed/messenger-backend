import { BaseError } from "./BaseError.js";

class UnauthorizedError extends BaseError {
  constructor(message = "unauthorized", statusCode = 401) {
    super(message);
    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }
}
export { UnauthorizedError };
