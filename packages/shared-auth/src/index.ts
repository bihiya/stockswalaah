import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";

export interface JwtClaims {
  sub: string;
  roles?: string[];
}

export function signToken(
  claims: JwtClaims,
  secret: string,
  expiresIn: SignOptions["expiresIn"] = "15m",
): string {
  if (secret.length < 32)
    throw new Error("JWT secret must be at least 32 characters");
  return jwt.sign(claims, secret, { expiresIn, issuer: "stockwallah" });
}

export function verifyToken<T extends object = JwtClaims>(
  token: string,
  secret: string,
): T {
  return jwt.verify(token, secret, { issuer: "stockwallah" }) as T;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
