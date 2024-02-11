export class UserControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  getAllUsers = () => {
    const allUsers = this._userRepository
      .getAllUser()
      .map(({ id, username, email }) => {
        return { id, username, email };
      });
    return allUsers;
  };
}
