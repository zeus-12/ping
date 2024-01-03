import { model, Schema } from "mongoose";

const Recording = model(
  "Recording",
  new Schema({
    camera_id: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
  })
);

export default Recording;
