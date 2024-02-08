import express from 'express';

const router = express.Router();
const messageRouter = (messageControllers) => {
  router.get('/:userId', (req, res) => {
    try {
      const firstUserId = res.locals.userId;
      res.send(
        messageControllers.getMessagesBetweenTwoUser(
          firstUserId,
          Number(req.params.userId)
        )
      );
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post('/', (req, res) => {
    try {
      const senderId = res.locals.userId;
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
