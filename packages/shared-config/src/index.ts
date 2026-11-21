import { Redis, type RedisOptions } from "ioredis";
import { z } from "zod";

export function loadEnv<T extends z.ZodType>(
  schema: T,
  source: NodeJS.ProcessEnv = process.env,
): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return result.data;
}

export const commonEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGO_URI: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  KAFKA_BROKERS: z.string().default("localhost:9092"),
  JWT_SECRET: z.string().min(32).optional(),
});

export const cacheTtl = {
  short: 60,
  default: 300,
  long: 3600,
} as const;

export function createRedisOptions(url: string): RedisOptions {
  return {
    lazyConnect: true,
    maxRetriesPerRequest: 2,
    retryStrategy: (attempt) => Math.min(attempt * 200, 2000),
    ...parseRedisUrl(url),
  };
}

function parseRedisUrl(url: string): RedisOptions {
  const parsed = new URL(url);
  const options: RedisOptions = {
    host: parsed.hostname,
    port: Number(parsed.port) || 6379,
  };
  if (parsed.password) options.password = decodeURIComponent(parsed.password);
  if (parsed.username) options.username = decodeURIComponent(parsed.username);
  if (parsed.protocol === "rediss:") options.tls = {};
  return options;
}

export function createRedisClient(url: string): Redis {
  return new Redis({ ...createRedisOptions(url), lazyConnect: true });
}

export async function getCache<T>(
  client: Redis,
  key: string,
): Promise<T | null> {
  const value = await client.get(key);
  return value === null ? null : (JSON.parse(value) as T);
}

export async function setCache<T>(
  client: Redis,
  key: string,
  value: T,
  ttlSeconds = cacheTtl.default,
): Promise<void> {
  await client.set(key, JSON.stringify(value), "EX", ttlSeconds);
}

export async function deleteCache(client: Redis, key: string): Promise<void> {
  await client.del(key);
}
