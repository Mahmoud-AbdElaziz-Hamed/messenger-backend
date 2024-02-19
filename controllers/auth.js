import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UnauthenticatedError } from '../errors/UnauthenticatedError.js';
import { BadRequest } from '../errors/BadRequest.js';
import { getRandomId } from '../utils/getRandomId/index.js';
import { User } from '../models/user.js';

dotenv.config();
export const SECRET_KEY = process.env.SECRET_KEY;

export class AuthControllers {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  register = (username, email, password) => {
    if (!username) {
      throw new BadRequest('username cannot be empty');
    }

    if (!email) {
      throw new BadRequest('email cannot be empty');
    }

    if (!password) {
      throw new BadRequest('password cannot be empty');
    }

    const doesUserExist = this.userRepository.findUserByEmail(email);
    if (doesUserExist) {
      throw new BadRequest('User with this email already exists');
    }

    if (password.length < 8) {
      throw new BadRequest('password should be at least 8 characters');
    }

    const user = new User(getRandomId(), username, email, password);
    const userId = this.userRepository.addUser(user);
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY
    );
    return { token, userId };
  };

  login = ({ email, password }) => {
    if (!email) {
      throw new BadRequest('email cannot be empty');
    }

    if (!password) {
      throw new BadRequest('password cannot be empty');
    }

    const user = this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthenticatedError(
        'No user found by this mail ,Please signup'
      );
    }

    const isCorrectPassword = user.password === password;
    if (!isCorrectPassword) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    const userId = user.id;

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY
    );

    return { token, userId };
  };
}
