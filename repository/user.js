export class UserRepository {
  constructor() {
    this._users = [];
  }

  addUser(user) {
    this._users.push(user);
  }

  deleteUserById(userId) {
    try {
      const lengthBeforeDelete = this._users.lenght;
      this._users = this._users.filter(({ id }) => id !== userId);
      const lengthAfterDelete = this._users.lenght;
      if (lengthBeforeDelete === lengthAfterDelete)
        throw new Error("Invalid id ,there is no user has this id");
      return userId;
    } catch (error) {
      return error.message;
    }
  }

  getAllUser() {
    return this._users;
  }

  findUser(email) {
    return this._users.find((user) => user.email === email);
  }
}
