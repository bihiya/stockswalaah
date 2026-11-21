import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRoutes } from "./routes/health.routes.js";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:5173" }));
  app.use(express.json({ limit: "1mb" }));
  app.get("/", (_request, response) =>
    response.json({
      name: "StockWallah API Gateway",
      docs: "/docs",
      health: "/health",
    }),
  );
  app.use("/health", healthRoutes);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(errorHandler);
  return app;
}
