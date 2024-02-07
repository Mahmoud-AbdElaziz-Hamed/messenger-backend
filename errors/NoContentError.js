import { BaseError } from './BaseError.js';

class NoContentError extends BaseError {
  constructor(message) {
    super(message, 204);
  }
}
export { NoContentError };
