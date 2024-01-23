import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../../errors/UnauthenticatedError.js";

export function verifyToken(token, secretKey) {
  try {
    const userData = jwt.verify(token, secretKey);
    return userData;
  } catch (error) {
    throw new UnauthenticatedError(error.message, 401);
  }
}
