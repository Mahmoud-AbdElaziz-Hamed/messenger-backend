import { BaseError } from './BaseError.js';

class BadRequest extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}
export { BadRequest };
