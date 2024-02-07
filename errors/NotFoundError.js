import { BaseError } from './BaseError.js';

class NotFoundError extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}
export { NotFoundError };
