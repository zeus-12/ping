import { Schema } from "mongoose";

const pointSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default pointSchema;
