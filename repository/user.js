import { UnauthenticatedError } from '../errors/UnauthenticatedError.js';

export class UserRepository {
  constructor() {
    this._users = [];
  }

  addUser(user) {
    this._users.push(user);
  }

  deleteUserById(userId) {
    try {
      const lengthBeforeDelete = this._users.length;
      this._users = this._users.filter(({ id }) => id !== userId);
      const lengthAfterDelete = this._users.length;
      if (lengthBeforeDelete === lengthAfterDelete) {
        throw new NotFoundError('Invalid id ,there is no user has this id');
      }
      return userId;
    } catch (error) {
      return error.message;
    }
  }

  getAllUser() {
    return this._users;
  }

  findUserByEmail(email) {
    try {
      const user = this._users.find((user) => user.email === email);
      if (!user) {
        throw new UnauthenticatedError('User not found, please signup');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
