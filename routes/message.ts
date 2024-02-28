import * as express from 'express';
import { Request, Response } from 'express';
import { MessageControllers } from '../controllers/message';
import { Message } from '../models/message';
import { MessageData } from '../typs';

const router = express.Router();
const messageRouter = (messageControllers: MessageControllers) => {
  router.get('/:userId', (req: Request, res: Response) => {
    try {
      const firstUserId: number = res.locals.userId;
      const secondUserId: number = Number(req.params.userId);
      const allMessages: MessageData[] =
        messageControllers.getMessagesBetweenTwoUser(firstUserId, secondUserId);
      res.send(allMessages);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  router.post('/', (req: Request, res: Response) => {
    try {
      const senderId: number = res.locals.userId;
      const receiverId: number = req.body.receiverId;
      const messageBody: string = req.body.body;
      const message: Message = messageControllers.addMessage(
        senderId,
        receiverId,
        messageBody
      );
      res.json({
        status: 'ok',
        message: {
          id: message.id,
          body: message.body,
          senderId: message.senderId,
          receiverId: message.receiverId,
          timestamp: message.timestamp,
        },
      });
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  return router;
};
export { messageRouter };
