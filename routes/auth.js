import express from "express";

const Router = express.Router();
const authRouter = (authControllers) => {
  Router.post("/login", (req, res) => {
    res.json(authControllers.login(req, res));
  });
  return Router;
};
export { authRouter };
