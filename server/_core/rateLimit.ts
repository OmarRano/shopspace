import type { Request, Response, NextFunction } from "express";

/**
 * In-memory rate limiter (production-ready upgrade: replace store with Upstash Redis).
 *
 * Upstash Redis integration (recommended for production):
 *   1. npm install @upstash/ratelimit @upstash/redis
 *   2. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env
 *   3. Replace the in-memory store below with:
 *      import { Ratelimit } from "@upstash/ratelimit";
 *      import { Redis } from "@upstash/redis";
 *      const ratelimit = new Ratelimit({
 *        redis: Redis.fromEnv(),
 *        limiter: Ratelimit.slidingWindow(10, "60 s"),
 *      });
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress ?? "unknown";
}

/**
 * Creates a rate-limit middleware.
 * @param maxRequests  Max allowed requests per window
 * @param windowMs     Window size in milliseconds
 * @param keyPrefix    Prefix to namespace different limiters
 */
export function createRateLimiter(
  maxRequests: number,
  windowMs: number,
  keyPrefix = "rl"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = getClientIp(req);
    const key = `${keyPrefix}:${ip}`;
    const now = Date.now();

    let entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      entry = { count: 1, resetAt: now + windowMs };
      store.set(key, entry);
      return next();
    }

    entry.count++;

    if (entry.count > maxRequests) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader("Retry-After", retryAfter);
      res.setHeader("X-RateLimit-Limit", maxRequests);
      res.setHeader("X-RateLimit-Remaining", 0);
      return res.status(429).json({
        error: "Too many requests. Please slow down and try again.",
        retryAfterSeconds: retryAfter,
      });
    }

    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", maxRequests - entry.count);
    next();
  };
}

/**
 * Strict limiter for auth endpoints: 10 attempts per 15 minutes per IP.
 * Prevents brute-force attacks on login/signup.
 */
export const authRateLimiter = createRateLimiter(10, 15 * 60 * 1000, "auth");

/**
 * General API limiter: 200 requests per minute per IP.
 */
export const apiRateLimiter = createRateLimiter(200, 60 * 1000, "api");
