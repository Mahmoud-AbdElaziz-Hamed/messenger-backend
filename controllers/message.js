import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Message } from "../models/Message/index.js";
import { getRandomId } from "../utils/getRandomId/index.js";

export class MessageControllers {
  constructor(messageRepository) {
    dotenv.config();
    this.SECRET_KEY = process.env.SECRET_KEY;
    this._messageControllers = messageRepository;
  }

  getMessagesBetweenTwoUser = (req, res) => {
    try {
      const token = req.headers.authenticated.replace("Bearer ", "");
      const firstUserId = jwt.verify(token, this.SECRET_KEY).userId;
      const { secondUserId } = req.body;
      const allMessages = this._messageControllers.getMessagesBetweenUsers(
        firstUserId,
        secondUserId
      );
      if (!allMessages)
        res.status(204).json({ message: "There no message , Say hi !" });
      res.send(allMessages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "internal server error" });
    }
  };

  addNewMessage = (req, res) => {
    const { body, receiverId } = req.body;
    const token = req.headers.authenticated.replace("Bearer ", "");
    const senderId = jwt.verify(token, this.SECRET_KEY).userId;
    const newMessage = new Message(
      getRandomId(),
      body,
      senderId,
      receiverId,
      Date.now()
    );
    this._messageControllers.addMessage(newMessage);
    res.json({ message: "message sent", newMessage });
  };
}
