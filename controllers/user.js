import { getToken } from "../utils/getToken/index.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export class UserControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  getAllUsers = (authorization) => {
    try {
      const token = getToken(authorization);
      if (!token) throw new UnauthorizedError("unauthorized", 401);
      const allUsers = this._userRepository
        .getAllUser()
        .map(({ username, email }) => {
          return { username, email };
        });
      return allUsers;
    } catch (error) {
      throw error;
    }
  };
}
