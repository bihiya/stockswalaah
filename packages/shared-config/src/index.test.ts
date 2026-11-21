import { describe, expect, it } from "vitest";
import { cacheTtl, createRedisOptions, loadEnv } from "./index.js";
import { z } from "zod";

describe("shared config", () => {
  it("validates and applies environment defaults", () => {
    expect(
      loadEnv(z.object({ PORT: z.coerce.number().default(3000) }), {}),
    ).toEqual({ PORT: 3000 });
  });

  it("rejects invalid environment values", () => {
    expect(() =>
      loadEnv(z.object({ PORT: z.coerce.number().positive() }), { PORT: "0" }),
    ).toThrow("Invalid environment configuration");
  });

  it("provides Redis options and explicit cache TTL defaults", () => {
    expect(createRedisOptions("redis://localhost:6380").port).toBe(6380);
    expect(cacheTtl).toEqual({ short: 60, default: 300, long: 3600 });
  });
});
