import express from "express";

export const messageRouter = express.Router();

messageRouter.get("/messages", (req, res) => {
  req.messageControllers.getMessagesBetweenTwoUser;
});
messageRouter.post("/message", (req, res) => {
  req.messageControllers.addNewMessage;
});
