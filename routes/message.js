import express from 'express';

const router = express.Router();
const messageRouter = (messageControllers) => {
  router.get('/:userId', (req, res) => {
    try {
      const firstUserId = res.locals.userId;
      const secondUserId = Number(req.params.userId);
      res.send(
        messageControllers.getMessagesBetweenTwoUser(firstUserId, secondUserId)
      );
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post('/', (req, res) => {
    try {
      const senderId = res.locals.userId;
      const receiverId = req.body.receiverId;
      const messageBody = req.body.body;
      messageControllers.addMessage(senderId, receiverId, messageBody);
      res.json({ status: 'ok' });
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { messageRouter };
