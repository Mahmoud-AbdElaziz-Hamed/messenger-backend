import { BaseError } from './BaseError.js';

class UnauthenticatedError extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}
export { UnauthenticatedError };
