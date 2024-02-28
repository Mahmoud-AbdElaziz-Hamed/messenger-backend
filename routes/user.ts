import express from 'express';
import { UserControllers } from '../controllers/user';
import { Request, Response } from 'express';
import { UserData } from '../typs';

const router = express.Router();
const userRouter = (userControllers: UserControllers) => {
  router.get('/', (req: Request, res: Response) => {
    try {
      const allUsers: UserData[] = userControllers.getAllUsers();
      res.json(allUsers);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { userRouter };
