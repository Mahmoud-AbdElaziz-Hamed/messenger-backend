import express from "express";

const Router = express.Router();
const messageRouter = (messageControllers) => {
  Router.get("/messages", (req, res) => {
    messageControllers.getMessagesBetweenTwoUser(req, res);
  });
  Router.post("/message", (req, res) => {
    messageControllers.addNewMessage(req, res);
  });
  return Router;
};
export { messageRouter };
