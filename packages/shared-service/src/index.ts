import cors from "cors";
import express, { type ErrorRequestHandler, type Router } from "express";
import swaggerUi from "swagger-ui-express";
import { AppError, ValidationError } from "@stockwallah/shared-errors";
import { createLogger } from "@stockwallah/shared-logger";
import { errorResponse, successResponse } from "@stockwallah/shared-response";
import type { ZodType } from "zod";

export function createHealthRouter(serviceName: string): Router {
  const router = express.Router();
  router.get("/", (request, response) => {
    response.json(
      successResponse(
        { service: serviceName, status: "ok" },
        request.get("x-request-id"),
      ),
    );
  });
  return router;
}

export function createSwaggerSpec(serviceName: string, port: number) {
  return {
    openapi: "3.0.3",
    info: { title: `StockWallah ${serviceName} API`, version: "0.1.0" },
    servers: [{ url: `http://localhost:${port}` }],
    paths: {},
  };
}

export function createErrorHandler(serviceName: string): ErrorRequestHandler {
  const logger = createLogger(serviceName);
  return (error: unknown, request, response, next) => {
    if (response.headersSent) {
      next(error);
      return;
    }
    const appError =
      error instanceof AppError ? error : new AppError("Internal server error");
    if (!(error instanceof AppError))
      logger.error("Unhandled request error", { error, path: request.path });
    response
      .status(appError.statusCode)
      .json(
        errorResponse(
          appError.code,
          appError.message,
          request.get("x-request-id"),
        ),
      );
  };
}

export function validateBody<T>(schema: ZodType<T>): express.RequestHandler {
  return (request, _response, next) => {
    try {
      request.body = schema.parse(request.body);
      next();
    } catch (error) {
      next(
        new ValidationError(
          error instanceof Error ? error.message : "Invalid request body",
        ),
      );
    }
  };
}

export function createBaseApp(options: {
  serviceName: string;
  healthRouter: Router;
  swaggerSpec: object;
  errorHandler: ErrorRequestHandler;
}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:5173" }));
  app.use(express.json({ limit: "1mb" }));
  app.get("/", (_request, response) =>
    response.json({
      name: options.serviceName,
      docs: "/docs",
      health: "/health",
    }),
  );
  app.use("/health", options.healthRouter);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(options.swaggerSpec));
  app.use(options.errorHandler);
  return app;
}
