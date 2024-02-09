import { NotFoundError } from '../errors/NotFoundError.js';
import { User } from '../models/user.js';

export class UserControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  getAllUsers = () => {
    try {
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
