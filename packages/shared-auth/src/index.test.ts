import { describe, expect, it } from "vitest";
import {
  comparePassword,
  hashPassword,
  signToken,
  verifyToken,
} from "./index.js";

describe("shared auth primitives", () => {
  it("signs and verifies issuer-scoped JWTs", () => {
    const token = signToken(
      { sub: "user-1", roles: ["user"] },
      "a-32-character-or-longer-test-secret",
    );
    expect(
      verifyToken(token, "a-32-character-or-longer-test-secret"),
    ).toMatchObject({ sub: "user-1", roles: ["user"] });
    expect(() =>
      verifyToken(token, "another-32-character-or-longer-secret"),
    ).toThrow();
  });

  it("hashes passwords and compares without exposing the original", async () => {
    const hash = await hashPassword("correct horse battery staple");
    expect(hash).not.toContain("correct horse");
    await expect(
      comparePassword("correct horse battery staple", hash),
    ).resolves.toBe(true);
    await expect(comparePassword("wrong password", hash)).resolves.toBe(false);
  });
});
