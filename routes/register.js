import express from 'express';

const router = express.Router();
const registerRouter = (userControllers) => {
  router.post('/signup', (req, res) => {
    try {
      res.json(
        userControllers.addNewUser(
          req.body.username,
          req.body.email,
          req.body.password
        )
      );
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { registerRouter };
