class UserRepository {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  deleteUserById(userId) {
    this.users = this.users.filter(({ id }) => id !== userId);
    return userId;
  }

  getAllUser() {
    return this.users;
  }

  findUser(username, password) {
    return this.users.find(
      (user) => user._userName === username && user._password === password
    );
  }
}
module.exports = UserRepository;
