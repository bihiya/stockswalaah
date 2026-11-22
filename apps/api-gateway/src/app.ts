import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRoutes } from "./routes/health.routes.js";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? "http://localhost:3001";

async function proxyJson(
  request: express.Request,
  response: express.Response,
  path: string,
): Promise<void> {
  const upstream = await fetch(`${AUTH_SERVICE_URL}${path}`, {
    method: request.method,
    headers: {
      "content-type": "application/json",
      "x-request-id": request.get("x-request-id") ?? "",
    },
    body: request.method === "GET" ? undefined : JSON.stringify(request.body),
  });

  const body = await upstream.json().catch(() => null);
  response.status(upstream.status).json(body);
}

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

  app.post("/auth/signup", (request, response, next) => {
    proxyJson(request, response, "/auth/signup").catch(next);
  });
  app.post("/auth/login", (request, response, next) => {
    proxyJson(request, response, "/auth/login").catch(next);
  });

  app.use(errorHandler);
  return app;
}
