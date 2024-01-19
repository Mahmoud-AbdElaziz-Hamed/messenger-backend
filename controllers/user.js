import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export class UserControllers {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  getAllUsers = () => {
    return this._userRepository.allUser.map(({ username, email }) => {
      return { username, email };
    });
  };

  userLogin = (req, res) => {
    const { email, password } = req.body;
    const user = this._userRepository.findUser(email);

    if (!user) {
      return res.status(401).json({ error: "User not found ,please singup" });
    }

    const isCorrectPassword = user.password === password;

    if (!isCorrectPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY
    );
    return{ token };

  };
}
