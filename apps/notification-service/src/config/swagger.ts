import { createSwaggerSpec } from "@stockwallah/shared-service";
import { env } from "./env.js";
export const swaggerSpec = createSwaggerSpec("Notification Service", env.PORT);
