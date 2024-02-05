import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../../errors/UnauthenticatedError.js";

export function verifyToken(token, secretKey) {
  try {
    const userData = jwt.verify(token, secretKey);
    return userData;
  } catch (error) {
    if (error.message === "jwt malformed") throw new UnauthenticatedError();
    else throw new UnauthenticatedError(error.message);
  }
}
