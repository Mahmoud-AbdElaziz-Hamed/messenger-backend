import dotenv from "dotenv";
import { Message } from "../models/message.js";
import { getRandomId } from "../utils/getRandomId/index.js";
import { getToken } from "../utils/getToken/index.js";
import { verifyToken } from "../utils/verifyToken/index.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export class MessageControllers {
  constructor(messageRepository) {
    this._messageRepository = messageRepository;
  }

  getMessagesBetweenTwoUser = (req, res) => {
    try {
      const token = getToken(req);
      const firstUserId = verifyToken(token).id;
      const secondUserId = Number(req.params.userId);
      const allMessages = this._messageRepository.getMessagesBetweenUsers(
        firstUserId,
        secondUserId
      );
      if (!allMessages || allMessages.length === 0)
        throw new Error("(204) There no message , Say hi !");
      return allMessages;
    } catch (error) {
      return error.message;
    }
  };

  addNewMessage = (req, res) => {
    try {
      const { body } = req.body;
      const receiverId = Number(req.params.userId);
      const token = getToken(req);
      const senderId = verifyToken(token).id;
      const message = new Message(
        getRandomId(),
        body,
        senderId,
        receiverId,
        Date.now()
      );
      this._messageRepository.addMessage(message);
      return { message: "message sent", message };
    } catch (error) {
      return error.message;
    }
  };
}
