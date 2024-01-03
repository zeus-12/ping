import express from "express";
import { sendRequest } from "../controllers/pingController.js";

var router = express.Router();

router.post("/", async (req, res) => {
  const { lat, lng } = req.body;

  // check typeof lat and lng
  if (!lat || !lng) {
    return res.status(400).json({ ok: false, message: "Invalid Coordinates" });
  }

  return sendRequest(lat, lng, res);
});

export default router;
