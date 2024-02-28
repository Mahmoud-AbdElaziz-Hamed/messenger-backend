import { Request, Response, NextFunction } from 'express';
import { getToken } from '../utils/getToken/index';
import { SECRET_KEY } from '../controllers/auth';
import { verifyToken } from '../utils/verifyToken/index';
import { UnauthenticatedError } from '../errors/UnauthenticatedError';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token: string | undefined = getToken(req.headers.authorization);
    if (!token) throw new UnauthenticatedError('Token is not provided');
    const userId = verifyToken(token, SECRET_KEY).id;
    res.locals.userId = userId;
    next();
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
