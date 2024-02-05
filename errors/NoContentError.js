import { BaseError } from "./BaseError.js";

class NoContentError extends BaseError {
  constructor(message = "There is no content", statusCode = 204) {
    super(message);
    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }
}
export { NoContentError };
