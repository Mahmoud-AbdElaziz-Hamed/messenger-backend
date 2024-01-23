import express from "express";

const router = express.Router();
const userRouter = (userControllers) => {
  router.get("/users", (req, res) => {
    try {
      res.json(userControllers.getAllUsers(req.headers.authorization));
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { userRouter };
