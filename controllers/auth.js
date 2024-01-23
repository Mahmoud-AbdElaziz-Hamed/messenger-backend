import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const SECRET_KEY = process.env.SECRET_KEY;

export class AuthControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  login = (req, res) => {
    try {
      const { email, password } = req.body;
      const user = this._userRepository.findUser(email);

      if (!user) {
        throw new Error("User not found ,please singup", { statusCode: 204 });
      }

      const isCorrectPassword = user.password === password;
      if (!isCorrectPassword)
        throw new Error("Invalid credentials", { statusCode: 401 });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY
      );
      return { token };
    } catch (error) {
      return error.message;
    }
  };
}
