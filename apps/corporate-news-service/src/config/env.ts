import { commonEnvSchema, loadEnv } from "@stockwallah/shared-config";
export const env = loadEnv(commonEnvSchema, {
  ...process.env,
  PORT: process.env.CORPORATE_NEWS_SERVICE_PORT ?? process.env.PORT,
});
