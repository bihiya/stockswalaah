import type { ErrorRequestHandler } from "express";
import { AppError } from "@stockwallah/shared-errors";
import { errorResponse } from "@stockwallah/shared-response";
import { createLogger } from "@stockwallah/shared-logger";

const logger = createLogger("api-gateway");

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  request,
  response,
  next,
) => {
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
