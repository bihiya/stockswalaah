import { commonEnvSchema, loadEnv } from "@stockwallah/shared-config";

export const env = loadEnv(commonEnvSchema, {
  ...process.env,
  PORT: process.env.API_GATEWAY_PORT ?? process.env.PORT,
});
