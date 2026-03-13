import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { User } from "./models/User";
import {
  createSessionToken,
  getSessionCookieOptions,
  COOKIE_NAME,
} from "./_core/auth";

/**
 * Staff accounts are seeded from MongoDB (see server/mongodb.ts seedStaffAccounts).
 * These are the login credentials for all non-buyer roles.
 *
 * Role Login Details:
 * ─────────────────────────────────────────────────────────────────
 *  Role        │ Email                      │ Password
 * ─────────────────────────────────────────────────────────────────
 *  admin       │ admin@sahadstores.com       │ Admin@123456
 *  manager     │ manager@sahadstores.com     │ Manager@123456
 *  delivery    │ delivery@sahadstores.com    │ Delivery@123456
 *  developer   │ developer@sahadstores.com   │ Developer@123456
 * ─────────────────────────────────────────────────────────────────
 *  Buyers sign up with any email + password via the buyer signup endpoint.
 */

export const authRouter = router({
  /**
   * Returns the currently authenticated user (or null).
   * Used by the frontend to check session state on load.
   */
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return null;
    const { passwordHash, ...safeUser } = ctx.user as any;
    return safeUser;
  }),

  /**
   * Logs out the current user by clearing the session cookie.
   */
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.clearCookie(COOKIE_NAME, { path: "/" });
    return { success: true } as const;
  }),

  /**
   * BUYER SIGNUP
   * Creates a new buyer account with email + password.
   * Auto-logs in after creation.
   * All new sign-ups are buyers by default.
   */
  signupBuyer: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.password !== input.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const existing = await User.findOne({
        email: input.email.toLowerCase().trim(),
      });
      if (existing) {
        throw new Error(
          "Email already registered. Please sign in instead."
        );
      }

      const user = await User.create({
        name: input.name.trim(),
        email: input.email.toLowerCase().trim(),
        passwordHash: input.password, // pre-save hook hashes this
        phone: input.phone?.trim() || undefined,
        role: "buyer",
        isActive: true,
      });

      const token = await createSessionToken(user);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

      return {
        success: true,
        message: "Account created successfully! Welcome to Sahad Stores.",
        role: "buyer",
      };
    }),

  /**
   * BUYER LOGIN
   * Authenticates a buyer by email + password.
   */
  loginBuyer: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await User.findOne({
        email: input.email.toLowerCase().trim(),
      }).select("+passwordHash");

      if (!user) {
        // Generic message to avoid email enumeration
        throw new Error("Invalid email or password.");
      }

      if (!user.isActive) {
        throw new Error(
          "Your account has been deactivated. Please contact support."
        );
      }

      if (user.role !== "buyer" && user.role !== "reader") {
        throw new Error(
          "Staff accounts must use the Staff Portal login."
        );
      }

      const isValid = await user.comparePassword(input.password);
      if (!isValid) {
        throw new Error("Invalid email or password.");
      }

      await User.findByIdAndUpdate(user._id, { lastSignedIn: new Date() });

      const token = await createSessionToken(user);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

      return {
        success: true,
        message: "Welcome back!",
        role: user.role,
      };
    }),

  /**
   * STAFF LOGIN
   * Authenticates admin / manager / delivery / developer by email + password.
   * Staff accounts are seeded into MongoDB at server startup.
   */
  loginStaff: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await User.findOne({
        email: input.email.toLowerCase().trim(),
      }).select("+passwordHash");

      if (!user) {
        throw new Error("Invalid email or password.");
      }

      if (!user.isActive) {
        throw new Error("Account deactivated. Please contact the administrator.");
      }

      const staffRoles = ["admin", "manager", "delivery", "developer"];
      if (!staffRoles.includes(user.role)) {
        throw new Error(
          "Buyer accounts must use the Shop Account login."
        );
      }

      const isValid = await user.comparePassword(input.password);
      if (!isValid) {
        throw new Error("Invalid email or password.");
      }

      await User.findByIdAndUpdate(user._id, { lastSignedIn: new Date() });

      const token = await createSessionToken(user);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

      return {
        success: true,
        message: `Logged in as ${user.role}`,
        role: user.role,
      };
    }),
});
