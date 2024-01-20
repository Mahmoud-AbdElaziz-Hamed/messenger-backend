import express from "express";

const Router = express.Router();
const messageRouter = (messageControllers) => {
  Router.get("/message/:userId", (req, res) => {
    res.send(messageControllers.getMessagesBetweenTwoUser(req, res));
  });
  Router.post("/message/:userId", (req, res) => {
    res.json(messageControllers.addNewMessage(req, res));
  });
  return Router;
};
export { messageRouter };
