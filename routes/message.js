import express from "express";

const router = express.Router();
const messageRouter = (messageControllers) => {
  router.get("/message/:userId", (req, res) => {
    try {
      const firstUserId = res.locals.user;
      res.send(
        messageControllers.getMessagesBetweenTwoUser(
          firstUserId,
          req.params.userId
        )
      );
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post("/message", (req, res) => {
    try {
      const senderId = res.locals.user;
      res.json(
        messageControllers.addMessage(
          senderId,
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
