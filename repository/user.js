export class UserRepository {
  constructor() {
    this._users = [];
  }

  addUser(user) {
    this._users.push(user);
  }

  deleteUserById(userId) {
    this._users = this._users.filter(({ id }) => id !== userId);
    return userId;
  }

  get allUser() {
    return this._users;
  }

  findUser(email) {
    return this._users.find((user) => user.email === email);
  }
}
