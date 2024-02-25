export class UserControllers {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers = () => {
    const allUsers = this.userRepository
      .getAllUser()
      .map(({ id, username, email }) => {
        const isOnline = Math.random() * 10 > 5;
        return { id, username, email, isOnline };
      });
    return allUsers;
  };
}
