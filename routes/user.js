import express from 'express';

const router = express.Router();
const userRouter = (userControllers) => {
  router.get('/', (req, res) => {
    try {
      const allUsers = userControllers.getAllUsers();
      res.json(allUsers);
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { userRouter };
