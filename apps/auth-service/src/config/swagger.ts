import { createSwaggerSpec } from "@stockwallah/shared-service";
import { env } from "./env.js";
export const swaggerSpec = createSwaggerSpec("Auth Service", env.PORT);
