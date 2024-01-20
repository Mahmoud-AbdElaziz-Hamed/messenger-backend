import { Message } from "../models/message.js";
import { getRandomId } from "../utils/getRandomId/index.js";
import { getToken } from "../utils/getToken/index.js";
import { verifyToken } from "../utils/verifyToken/index.js";
import { SECRET_KEY } from "./auth.js";

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (req, res) => {
    try {
      const token = getToken(req.headers.authorization);
      const firstUserId = verifyToken(token, SECRET_KEY).id;
      const secondUserId = Number(req.params.userId);
      const allMessages = this._messageRepository.getMessagesBetweenUsers(
        firstUserId,
        secondUserId
      );
      if (!allMessages) throw new Error("(204) There no message , Say hi !");
      return allMessages;
    } catch (error) {
      return error.message;
    }
  };

  addNewMessage = (req, res) => {
    try {
      const { body } = req.body;
      const receiverId = Number(req.params.userId);
      const token = getToken(req.headers.authorization);
      const senderId = verifyToken(token, SECRET_KEY).id;
      const message = new Message(
        getRandomId(),
        body,
        senderId,
        receiverId,
        Date.now()
      );
      this._messageRepository.addMessage(message);
      return { message };
    } catch (error) {
      return error.message;
    }
  };
}
