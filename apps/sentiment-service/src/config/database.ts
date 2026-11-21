import mongoose from "mongoose";
import { env } from "./env.js";
export async function connectMongo(): Promise<void> {
  if (env.MONGO_URI) await mongoose.connect(env.MONGO_URI);
}
