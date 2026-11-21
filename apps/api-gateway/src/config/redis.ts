import { createRedisClient } from "@stockwallah/shared-config";
import { createLogger } from "@stockwallah/shared-logger";
import { env } from "./env.js";

const logger = createLogger("api-gateway");
export const redis = env.REDIS_URL
  ? createRedisClient(env.REDIS_URL)
  : undefined;

export async function connectRedis(): Promise<void> {
  if (!redis) return;
  redis.on("error", (error: Error) =>
    logger.error("Redis connection error", { error }),
  );
  await redis.connect();
  logger.info("Redis connected");
}
