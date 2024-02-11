export class UserControllers {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers = () => {
    const allUsers = this.userRepository
      .getAllUser()
      .map(({ id, username, email }) => {
        return { id, username, email };
      });
    return allUsers;
  };
}
