class UserRepository {
  constructor() {
    this._Users = [];
  }

  postUser(User) {
    this._Users.push(User);
  }

  deleteUserById(userId) {
    this._Users = this._Users.filter(({ id }) => id !== userId);
  }

  getAllUser() {
    return this._Users;
  }
}
