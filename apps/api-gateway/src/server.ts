import { createLogger } from "@stockwallah/shared-logger";
import { connectMongo } from "./config/database.js";
import { env } from "./config/env.js";
import { connectRedis } from "./config/redis.js";
import { createApp } from "./app.js";

const logger = createLogger("api-gateway");

async function start(): Promise<void> {
  await connectMongo();
  await connectRedis();
  const server = createApp().listen(env.PORT, () =>
    logger.info(`API Gateway listening on ${env.PORT}`),
  );
  const shutdown = () => server.close(() => process.exit(0));
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

void start().catch((error: unknown) => {
  logger.error("API Gateway failed to start", { error });
  process.exitCode = 1;
});
