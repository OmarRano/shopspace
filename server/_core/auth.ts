import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import type { IUser } from "../models/User";

export const COOKIE_NAME = "sahad_session";
const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long");
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

/**
 * Signs a JWT session token containing userId, email, role, and name.
 * Expires in 1 year by default.
 */
export async function createSessionToken(
  user: Pick<IUser, "_id" | "email" | "role" | "name">,
  options: { expiresInMs?: number } = {}
): Promise<string> {
  const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
  const expirationSeconds = Math.floor((Date.now() + expiresInMs) / 1000);
  const secretKey = getSecretKey();

  return new SignJWT({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expirationSeconds)
    .sign(secretKey);
}

/**
 * Verifies a JWT session token and returns the payload, or null if invalid.
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
    const { userId, email, role, name } = payload as Record<string, unknown>;
    if (
      typeof userId !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string" ||
      typeof name !== "string"
    ) {
      return null;
    }
    return { userId, email, role, name };
  } catch {
    return null;
  }
}

/**
 * Extracts the session token from cookies in an Express request.
 */
export function getSessionToken(req: Request): string | undefined {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;
  const cookies = parseCookieHeader(cookieHeader);
  return cookies[COOKIE_NAME];
}

/**
 * Returns consistent cookie options for session cookies.
 */
export function getSessionCookieOptions(req: Request) {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "strict" : "lax") as "strict" | "lax",
    maxAge: ONE_YEAR_MS,
    path: "/",
  };
}
