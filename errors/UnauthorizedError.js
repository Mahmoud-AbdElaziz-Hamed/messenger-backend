import { BaseError } from './BaseError.js';

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}
export { UnauthorizedError };
