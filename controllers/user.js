import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class UserControllers {
  constructor(userRepository) {
    dotenv.config();
    this.SECRET_KEY = process.env.SECRET_KEY;
    this._userControllers = userRepository;
  }

  getAllUsers = (req, res) => {
    res.send(
      this._userControllers.allUser.map(({ username, email }) => {
        return { username, email };
      })
    );
  };

  userLogin = (req, res) => {
    const { email, password } = req.body;
    const user = this._userControllers.findUser(email);

    if (!user) {
      return res.status(401).json({ error: "User not found ,please singup" });
    }

    const isCorrectPassword = user.password === password;

    if (!isCorrectPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      this.SECRET_KEY
    );
    res.json({ token });
  };
}
