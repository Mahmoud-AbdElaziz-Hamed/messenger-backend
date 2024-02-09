import express from 'express';

const router = express.Router();
const authRouter = (authControllers) => {
  router.post('/', (req, res) => {
    try {
      res.json(
        authControllers.register(
          req.body.username,
          req.body.email,
          req.body.password
        )
      );
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post('/login', (req, res) => {
    try {
      res.json(authControllers.login(req.body));
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { authRouter };
