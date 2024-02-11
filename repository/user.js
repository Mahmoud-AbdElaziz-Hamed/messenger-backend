import { BadRequest } from '../errors/BadRequest.js';

export class UserRepository {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    return user.id;
  }

  deleteUserById(userId) {
    const lengthBeforeDelete = this.users.length;
    this.users = this.users.filter(({ id }) => id !== userId);
    const lengthAfterDelete = this.users.length;
    if (lengthBeforeDelete === lengthAfterDelete) {
      throw new BadRequest('Invalid id, there is no user has this id');
    }
    return userId;
  }

  getAllUser() {
    return this.users;
  }

  findUserByEmail(email) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
}
