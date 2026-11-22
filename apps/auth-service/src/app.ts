import { createBaseApp } from "@stockwallah/shared-service";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRoutes } from "./routes/health.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { swaggerSpec } from "./config/swagger.js";

export const createApp = () => {
  const app = createBaseApp({
    serviceName: "auth-service",
    healthRouter: healthRoutes,
    swaggerSpec,
    errorHandler,
  });
  app.use("/auth", authRoutes);
  // Mount the routes again before the shared error handler so direct service
  // calls also support the documented /signup and /login paths.
  app.use("/signup", authRoutes);
  app.use("/login", authRoutes);
  return app;
};
