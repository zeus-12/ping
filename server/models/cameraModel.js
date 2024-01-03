import { model, Schema } from "mongoose";
import pointSchema from "./pointSchema.js";
const CameraSchema = new Schema(
  {
    location: { type: pointSchema, required: true },
    building_name: { type: String, required: true },

    camera_name: { type: String, required: true },
    stream_url: String,

    isWorking: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Camera = model("Camera", CameraSchema);
CameraSchema.index({ location: "2dsphere" });

export default Camera;
