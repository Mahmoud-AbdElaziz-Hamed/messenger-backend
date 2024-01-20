import express from "express";

const router = express.Router();
const authRouter = (authControllers) => {
  router.post("/login", (req, res) => {
    res.json(authControllers.login(req, res));
  });
  return router;
};
export { authRouter };
