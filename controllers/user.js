import { NotFoundError } from '../errors/NotFoundError.js';
import { User } from '../models/user.js';

export class UserControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  addNewUser = (username, email, password) => {
    try {
      if (!username || !email || !password) {
        throw new NotFoundError(
          'username, email and password cannot be empty or undefined'
        );
      }
      try {
        this._userRepository.findUserByEmail(email);
      } catch (error) {
        const id = this._userRepository._users.length + 1;
        const user = new User(id, username, email, password);
        const newUser = this._userRepository.addUser(user);
        return newUser;
      }
      throw new NotFoundError('User with this email already exists');
    } catch (error) {
      throw error;
    }
  };

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
