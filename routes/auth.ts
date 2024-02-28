import * as express from 'express';
import { Request, Response } from 'express';
import { AuthControllers } from '../controllers/auth';
import { AuthResponse } from '../typs';

const router = express.Router();
const authRouter = (authControllers: AuthControllers) => {
  router.post('/signup', (req: Request, res: Response) => {
    try {
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const user: AuthResponse = authControllers.register(
        username,
        email,
        password
      );
      res.json(user);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post('/login', (req: Request, res: Response) => {
    try {
      const userData: AuthResponse = authControllers.login(
        req.body.email,
        req.body.password
      );
      res.json(userData);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { authRouter };
