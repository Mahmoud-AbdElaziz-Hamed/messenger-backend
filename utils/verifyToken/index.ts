import * as jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../../errors/UnauthenticatedError';
import { UserData } from '../../typs';

export function verifyToken(
  token: string | undefined,
  secretKey: string | undefined
): UserData {
  try {
    if (!token || !secretKey) {
      throw new Error('Token or secret key is missing');
    }
    const userData = jwt.verify(token, secretKey) as UserData;
    return userData;
  } catch (error: any) {
    const errorMessage =
      error.message === 'jwt malformed' ? 'there is not token' : error.message;
    throw new UnauthenticatedError(errorMessage);
  }
}
