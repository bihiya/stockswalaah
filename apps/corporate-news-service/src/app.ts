import { createBaseApp } from "@stockwallah/shared-service";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRoutes } from "./routes/health.routes.js";
import { swaggerSpec } from "./config/swagger.js";
export const createApp = () =>
  createBaseApp({
    serviceName: "corporate-news-service",
    healthRouter: healthRoutes,
    swaggerSpec,
    errorHandler,
  });
