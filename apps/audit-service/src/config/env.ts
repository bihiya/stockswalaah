import { commonEnvSchema, loadEnv } from "@stockwallah/shared-config";
export const env = loadEnv(commonEnvSchema, {
  ...process.env,
  PORT: process.env.AUDIT_SERVICE_PORT ?? process.env.PORT,
});
