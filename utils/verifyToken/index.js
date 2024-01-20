import jwt from "jsonwebtoken";

export function verifyToken(token, SECRET_KEY) {
  return jwt.verify(token, SECRET_KEY);
}
