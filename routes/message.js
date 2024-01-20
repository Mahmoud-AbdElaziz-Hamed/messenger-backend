import express from "express";

const router = express.Router();
const messageRouter = (messageControllers) => {
  router.get("/message/:userId", (req, res) => {
    res.send(messageControllers.getMessagesBetweenTwoUser(req, res));
  });
  router.post("/message/:userId", (req, res) => {
    res.json(messageControllers.addNewMessage(req, res));
  });
  return router;
};
export { messageRouter };
