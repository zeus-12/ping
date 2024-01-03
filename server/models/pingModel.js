import { model, Schema } from "mongoose";
import pointSchema from "./pointSchema.js";

const PingSchema = new Schema(
  {
    location: { type: pointSchema, required: true },

    // user_id: {
    //   type: String,
    //   required: true,
    // },
    nearest_cameras: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ping = model("Ping", PingSchema);

PingSchema.index({ location: "2dsphere" });

export default Ping;
