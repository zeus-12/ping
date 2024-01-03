import Recording from "../models/recordingModel.js";

export const logRecordingTimings = async (
  camera_id,
  start_time,
  end_time,
  res
) => {
  try {
    const result = await Recording.create({
      camera_id,
      start_time,
      end_time,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
};
