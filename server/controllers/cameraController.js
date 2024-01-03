import Camera from "../models/cameraModel.js";
import { formatLocationFromCoordinates } from "../utils/helper.js";

export const deleteCamera = async (camera_id, res) => {
  try {
    await Camera.findByIdAndDelete(camera_id);
  } catch (err) {
    return res.status(200).json({ ok: false, message: err.message });
  }
  return res.status(200).json({ ok: true, message: "Camera deleted" });
};

export const createCamera = async (camera_data, res) => {
  camera_data = formatLocationFromCoordinates(camera_data);

  try {
    await Camera.create(camera_data);
  } catch (err) {
    return res.status(200).json({ ok: false, message: err.message });
  }
  return res.status(200).json({ ok: true, message: "Camera created" });
};

export const updateCameraById = async (camera_id, camera_data, res) => {
  camera_data = formatLocationFromCoordinates(camera_data);
  try {
    await Camera.findByIdAndUpdate(camera_id, camera_data);
  } catch (err) {
    return res.status(200).json({ ok: false, message: err.message });
  }
  return res.status(200).json({ ok: true, message: "Camera updated" });
};

export const getAllCameras = async (page, res) => {
  const itemsPerPage = 20;
  try {
    const result = await Camera.find()
      // .skip(page > 0 ? (page - 1) * itemsPerPage : 0)
      // .limit(itemsPerPage);
    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    return res.status(200).json({ ok: false, message: err.message });
  }
};
