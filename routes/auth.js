import express from 'express';

const router = express.Router();
const authRouter = (authControllers) => {
  router.post('/signup', (req, res) => {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const userId = authControllers.register(username, email, password);
      res.json({ userId });
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post('/login', (req, res) => {
    try {
      const token = authControllers.login(req.body);
      res.json(token);
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { authRouter };
