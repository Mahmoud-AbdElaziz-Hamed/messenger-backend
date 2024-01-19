import express from "express";

export const userRouter = express.Router();

userRouter.get("/users", (req, res) => {
  console.log(req);
  const userControllers = req.userControllers;
  userControllers.getAllUsers();
});
userRouter.post("/login", (req, res) => {
  userControllers.userLogin();
});
