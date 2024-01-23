import express from "express";

const router = express.Router();
const messageRouter = (messageControllers) => {
  router.get("/message/:userId", (req, res) => {
    try {
      res.send(
        messageControllers.getMessagesBetweenTwoUser(
          req.headers.authorization,
          req.params.userId
        )
      );
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post("/message", (req, res) => {
    try {
      res.json(
        messageControllers.addMessage(
          req.headers.authorization,
          req.body.receiverId,
          req.body.body
        )
      );
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { messageRouter };
