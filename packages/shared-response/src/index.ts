import type { ApiResponse } from "@stockwallah/shared-types";

export function successResponse<T>(
  data: T,
  requestId?: string,
): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: { requestId, timestamp: new Date().toISOString() },
  };
}

export function errorResponse(
  code: string,
  message: string,
  requestId?: string,
): ApiResponse<never> {
  return {
    success: false,
    error: { code, message },
    meta: { requestId, timestamp: new Date().toISOString() },
  };
}
