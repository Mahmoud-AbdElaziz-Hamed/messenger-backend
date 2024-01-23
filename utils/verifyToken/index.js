import jwt from "jsonwebtoken";

export function verifyToken(token, secretKey) {
  try {
    const userData = jwt.verify(token, secretKey);
    return userData;
  } catch (error) {
    return { status: true, message: error.message };
  }
}
