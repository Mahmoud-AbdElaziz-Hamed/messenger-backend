import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (token) => jwt.verify(token, SECRET_KEY);
