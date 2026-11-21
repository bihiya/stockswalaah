import mongoose from "mongoose";
import { createLogger } from "@stockwallah/shared-logger";
import { env } from "./env.js";

const logger = createLogger("api-gateway");

export async function connectMongo(): Promise<void> {
  if (!env.MONGO_URI) return;
  await mongoose.connect(env.MONGO_URI);
  logger.info("MongoDB connected");
}
