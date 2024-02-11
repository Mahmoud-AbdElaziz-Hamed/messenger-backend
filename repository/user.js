import { UnauthenticatedError } from '../errors/UnauthenticatedError.js';

export class UserRepository {
  constructor() {
    this._users = [];
  }

  addUser(user) {
    this._users.push(user);
    return user.id;
  }

  deleteUserById(userId) {
    const lengthBeforeDelete = this._users.length;
    this._users = this._users.filter(({ id }) => id !== userId);
    const lengthAfterDelete = this._users.length;
    if (lengthBeforeDelete === lengthAfterDelete) {
      throw new NotFoundError('Invalid id ,there is no user has this id');
    }
    return userId;
  }

  getAllUser() {
    return this._users;
  }

  findUserByEmail(email) {
    const user = this._users.find((user) => user.email === email);
    return user;
  }
}
