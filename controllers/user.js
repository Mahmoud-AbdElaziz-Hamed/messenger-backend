import { verifyToken } from "../utils/verifyToken/index.js";
import { getToken } from "../utils/getToken/index.js";
import { SECRET_KEY } from "./auth.js";

export class UserControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  getAllUsers = (req, res) => {
    try {
      const token = getToken(req.headers.authorization);
      const userData = verifyToken(token, SECRET_KEY);
      if (!token) {
        throw new Error("unauthorized", { statusCode: 401 });
      } else if (userData.status) {
        throw new Error("Invalid token", { statusCode: 401 });
      } else {
        const allUsers = this._userRepository
          .getAllUser()
          .map(({ username, email }) => {
            return { username, email };
          });
        return allUsers;
      }
    } catch (error) {
      return error.message;
    }
  };
}
