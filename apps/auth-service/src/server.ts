import { createLogger } from "@stockwallah/shared-logger";
import { connectMongo } from "./config/database.js";
import { env } from "./config/env.js";
import { connectRedis } from "./config/redis.js";
import { createApp } from "./app.js";
const logger = createLogger("auth-service");
async function start(): Promise<void> {
  await Promise.all([connectMongo(), connectRedis()]);
  const server = createApp().listen(env.PORT, () =>
    logger.info(`Auth Service listening on ${env.PORT}`),
  );
  const shutdown = () => server.close(() => process.exit(0));
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}
void start().catch((error: unknown) => {
  logger.error("Auth Service failed to start", { error });
  process.exitCode = 1;
});
