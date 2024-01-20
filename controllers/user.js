export class UserControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  getAllUsers = () => {
    try {
    } catch (error) {}
    return this._userRepository.allUser.map(({ username, email }) => {
      return { username, email };
    });
  };
}
