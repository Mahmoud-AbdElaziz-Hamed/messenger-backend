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
    this._userRepository = userRepository;
  }

  register = (username, email, password) => {
    if (!username || !email || !password) {
      throw new BadRequest('username, email and password cannot be empty');
    }
    const doesUserExist = this._userRepository.findUserByEmail(email);
    if (doesUserExist) {
      throw new BadRequest('User with this email already exists');
    }
    if (password.length < 8) {
      throw new BadRequest('password should be at least 8 characters');
    }
    const user = new User(getRandomId(), username, email, password);
    const newUser = this._userRepository.addUser(user);
    return newUser;
  };

  login = ({ email, password }) => {
    if (!email || !password) {
      throw new BadRequest('email and password cannot be empty');
    }
    const user = this._userRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthenticatedError(
        'No user found by this mail ,Please signup'
      );
    }
    const isCorrectPassword = user.password === password;
    if (!isCorrectPassword) {
      throw new UnauthenticatedError('Invalid credentials');
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY
    );
    return { token };
  };
}
