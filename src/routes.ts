/**
 * An array of public routes that are accessible to all users.
 * These routes are not protected by authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of auth routes that are used for authentication.
 * These routes are not protected by authentication.
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
];

/**
 * The prefix for all API routes.
 * Routes that start with this prefix are API routes used for authentication.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * An array of public routes that are accessible to all users.
 * These routes are not protected by authentication.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
