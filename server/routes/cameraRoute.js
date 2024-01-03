import express from "express";
import {
  createCamera,
  deleteCamera,
  updateCameraById,
  getAllCameras,
} from "../controllers/cameraController.js";
var router = express.Router();

router.delete("/:CAMERA_ID", async (req, res) => {
  return deleteCamera(req.params.CAMERA_ID, res);
});

router.post("/", async (req, res) => {
  const { building_name, camera_name, lat, lng } = req.body;

  if (!building_name || !camera_name || !lat || !lng) {
    return res.status(400).json({ ok: false, message: "Invalid Camera Data" });
  }

  return createCamera(req.body, res);
});

router.put("/:CAMERA_ID", async (req, res) => {
  const camera_id = req.params.CAMERA_ID;
  const { building_name, camera_name, lat, lng } = req.body;

  if (!building_name || !camera_name || !lat || !lng) {
    return res.status(400).json({ ok: false, message: "Invalid Camera Data" });
  }

  return updateCameraById(camera_id, req.body, res);
});

router.get("/", async (req, res) => {
  const { page } = req.query;
  return getAllCameras(page, res);
});

export default router;
