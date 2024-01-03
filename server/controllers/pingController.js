import Camera from "../models/cameraModel.js";
import { v4 as uuidv4 } from "uuid";
import { maxDistanceMetres } from "../utils/constants.js";
import { sendPing } from "../handlers/sseHandler.js";
import Ping from "../models/pingModel.js";
import { formatLocationFromCoordinates } from "../utils/helper.js";

export const sendRequest = async (lat, lng, res) => {
  try {
    const nearestCameras = await getNearestCameras(lat, lng);

    const pingObject = {
      id: uuidv4(),
      label: nearestCameras[0]
        ? nearestCameras[0].building_name
        : "No Cameras Nearby",
      createdAt: new Date().toUTCString(),
      location: {
        lat,
        lng,
      },
      nearestCameras,
    };

    sendPing(pingObject);
    await Ping.create(
      formatLocationFromCoordinates({
        lat,
        lng,
        nearest_cameras: nearestCameras,
      })
    );
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }

  return res.status(200).json({ ok: true });
};

const getNearestCameras = async (lat, lng) => {
  lat = +lat;
  lng = +lng;

  try {
    const result = await Camera.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistanceMetres,
        },
      },
    }).sort("-score");

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
