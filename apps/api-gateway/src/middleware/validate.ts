import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { ValidationError } from "@stockwallah/shared-errors";

export function validateBody<T>(schema: ZodType<T>): RequestHandler {
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
