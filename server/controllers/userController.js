import jwt from "jsonwebtoken";
import crypto from "crypto";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (username, password, res) => {
  try {
    if (!(password === "admin" && username === "admin")) {
      res.status(401).json({ ok: false, message: "Invalid Credentials" });
      return;
    }

    // todo make sure crypto works fine
    const randomString = crypto.randomBytes(64).toString("hex");

    const token = createToken(randomString);

    res.status(200).json({ ok: true, data: { username, token } });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
