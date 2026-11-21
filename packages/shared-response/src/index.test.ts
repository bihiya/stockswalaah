import { describe, expect, it } from "vitest";
import { errorResponse, successResponse } from "./index.js";

describe("API response envelopes", () => {
  it("returns a timestamped success envelope", () => {
    const response = successResponse({ id: "1" }, "request-1");
    expect(response.success).toBe(true);
    expect(response.data).toEqual({ id: "1" });
    expect(response.meta.requestId).toBe("request-1");
    expect(Number.isNaN(Date.parse(response.meta.timestamp))).toBe(false);
  });

  it("returns a timestamped error envelope", () => {
    const response = errorResponse("INVALID", "Bad input");
    expect(response.success).toBe(false);
    expect(response.error).toEqual({ code: "INVALID", message: "Bad input" });
  });
});
