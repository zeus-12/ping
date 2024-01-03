import express from "express";
import authHandler from "../middleware/authHandler.js";
import PingRoute from "./pingRoute.js";
import CameraRoute from "./cameraRoute.js";
import UserRoute from "./userRoute.js";
import RecordRoute from "./recordRoute.js";

var router = express.Router();

router.use("/login", UserRoute);
router.use("/ping", PingRoute);
router.use("/record", authHandler, RecordRoute);
router.use("/camera", authHandler, CameraRoute);

export default router;
