import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cors from "cors";
import { eventsHandler } from "./handlers/sseHandler.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;
const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
    app.listen(PORT);
  })
  .then(console.log(`Server listening on port ${PORT}`))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/connect", eventsHandler);
app.use("/api", router);
