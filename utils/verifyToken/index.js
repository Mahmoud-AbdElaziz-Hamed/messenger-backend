import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../../errors/UnauthenticatedError.js';

export function verifyToken(token, secretKey) {
  try {
    const userData = jwt.verify(token, secretKey);
    return userData;
  } catch (error) {
    const errorMessage =
      error.message === 'jwt malformed' ? 'there is not token' : error.message;
    throw new UnauthenticatedError(errorMessage);
  }
}
