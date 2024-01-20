import express from "express";

const router = express.Router();
const userRouter = (userControllers) => {
  router.get("/users", (req, res) => {
    res.send(userControllers.getAllUsers(req, res));
  });
  return router;
};
export { userRouter };
