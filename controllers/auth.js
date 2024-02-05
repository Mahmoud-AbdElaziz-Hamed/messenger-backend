import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthenticatedError } from "../errors/UnauthenticatedError.js";

dotenv.config();
export const SECRET_KEY = process.env.SECRET_KEY;

export class AuthControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  login = ({ email, password }) => {
    try {
      const user = this._userRepository.findUser(email);
      if (!user) {
        throw new UnauthenticatedError("User not found, please signup");
      }

      const isCorrectPassword = user.password === password;
      if (!isCorrectPassword)
        throw new UnauthenticatedError("Invalid credentials");

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY
      );
      return { token };
    } catch (error) {
      throw error;
    }
  };
}
