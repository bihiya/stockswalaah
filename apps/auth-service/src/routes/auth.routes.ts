import express from "express";
import { z } from "zod";
import {
  comparePassword,
  hashPassword,
  signToken,
} from "@stockwallah/shared-auth";
import { AppError, UnauthorizedError, ValidationError } from "@stockwallah/shared-errors";
import { successResponse } from "@stockwallah/shared-response";
import { UserModel } from "../models/user.model.js";
import { env } from "../config/env.js";

const signupSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(72),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(72),
});

export const authRoutes = express.Router();

authRoutes.post("/signup", async (request, response, next) => {
  try {
    const parsed = signupSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid signup data");
    }

    if (!env.JWT_SECRET) throw new AppError("JWT_SECRET is not configured", 500, "AUTH_NOT_CONFIGURED");

    const { name, email, password } = parsed.data;
    if (await UserModel.exists({ email })) {
      throw new AppError("An account with this email already exists", 409, "EMAIL_IN_USE");
    }

    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({ name, email, passwordHash, roles: ["user"] });
    const accessToken = signToken(
      { sub: user.id, roles: user.roles },
      env.JWT_SECRET,
    );

    response.status(201).json(
      successResponse({
        accessToken,
        user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
      }, request.get("x-request-id")),
    );
  } catch (error) {
    next(error);
  }
});

authRoutes.post("/login", async (request, response, next) => {
  try {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid login data");
    }

    if (!env.JWT_SECRET) throw new AppError("JWT_SECRET is not configured", 500, "AUTH_NOT_CONFIGURED");

    const { email, password } = parsed.data;
    const user = await UserModel.findOne({ email }).select("+passwordHash");
    if (!user || !(await comparePassword(password, user.passwordHash))) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const accessToken = signToken(
      { sub: user.id, roles: user.roles },
      env.JWT_SECRET,
    );

    response.json(
      successResponse({
        accessToken,
        user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
      }, request.get("x-request-id")),
    );
  } catch (error) {
    next(error);
  }
});
