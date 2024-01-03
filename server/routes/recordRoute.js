import express from "express";
import { logRecordingTimings } from "../controllers/recordingController.js";

var router = express.Router();

router.post("/", async (req, res) => {
  const { start_time, end_time, camera_id } = req.body;

  if (!camera_id || !start_time || !end_time) {
    return res.status(400).json({
      ok: false,
      message: "Require camera id, starting and ending time",
    });
  }

  return logRecordingTimings(camera_id, start_time, end_time, res);
});

export default router;
