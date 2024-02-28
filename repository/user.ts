import { BadRequest } from '../errors/BadRequest';
import { User } from '../models/user';

export class UserRepository {
  users: User[];
  constructor() {
    this.users = [];
  }

  addUser(user: User): number {
    this.users.push(user);
    return user.id;
  }

  deleteUserById(userId: number): number {
    const lengthBeforeDelete = this.users.length;
    this.users = this.users.filter(({ id }) => id !== userId);
    const lengthAfterDelete = this.users.length;
    if (lengthBeforeDelete === lengthAfterDelete) {
      throw new BadRequest('Invalid id, there is no user has this id');
    }
    return userId;
  }

  getAllUser(): User[] {
    return this.users;
  }

  findUserByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
}
