import { createRedisClient } from "@stockwallah/shared-config";
import { env } from "./env.js";
export const redis = env.REDIS_URL
  ? createRedisClient(env.REDIS_URL)
  : undefined;
export async function connectRedis(): Promise<void> {
  if (redis) await redis.connect();
}
