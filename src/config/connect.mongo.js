import mongoose from "mongoose";
import { config } from "./config.js";

export function connectDB() {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}
