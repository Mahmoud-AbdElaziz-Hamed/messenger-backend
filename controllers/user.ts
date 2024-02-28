import { UserRepository } from '../repository/user';
import { UserData } from '../typs';

export class UserControllers {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers = (): UserData[] => {
    const allUsers = this.userRepository
      .getAllUser()
      .map(({ id, username, email }) => {
        const isOnline: boolean = Math.random() * 10 > 5;
        return { id, username, email, isOnline };
      });
    return allUsers;
  };
}
