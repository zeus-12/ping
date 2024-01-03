import express from "express";
import { loginUser } from "../controllers/userController.js";

var router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ ok: false, message: "Enter both username & password" });
  }

  return loginUser(username, password, res);
});

export default router;
