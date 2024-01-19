import express from "express";

const Router = express.Router();
const authRouter = (userControllers) => {
  Router.post("/login", (req, res) => {
    res.json(userControllers.userLogin(req, res));
  });
  return Router;
};
export { authRouter };
