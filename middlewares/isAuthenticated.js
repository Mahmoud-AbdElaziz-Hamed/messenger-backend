import { getToken } from '../utils/getToken/index.js';
import { SECRET_KEY } from '../controllers/auth.js';
import { verifyToken } from '../utils/verifyToken/index.js';
import { UnauthenticatedError } from '../errors/UnauthenticatedError.js';

export const isAuthenticated = (req, res, next) => {
  try {
    const token = getToken(req.headers.authorization);
    if (!token) throw new UnauthenticatedError('Token is not provided');
    const userId = verifyToken(token, SECRET_KEY).id;
    res.locals.userId = userId;
    next();
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};
