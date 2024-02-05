import { BaseError } from "./BaseError.js";

class UnauthenticatedError extends BaseError {
  constructor(message = "Unauthenticated", statusCode = 401) {
    super(message);
    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }
}
export { UnauthenticatedError };
