import express from 'express';

const router = express.Router();
const userRouter = (userControllers) => {
  router.get('/', (req, res) => {
    try {
      res.json(userControllers.getAllUsers());
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { userRouter };
