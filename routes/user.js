import express from "express";

const Router = express.Router();
const userRouter = (userControllers) => {
  Router.get("/users", (req, res) => {
    res.send(userControllers.getAllUsers());
  });
  return Router;
};
export { userRouter };
