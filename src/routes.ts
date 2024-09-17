// PUBLIC ROUTE
export const publicRoutes = [
  "/auth/new-verification",
  "/auth/reset",
  "/auth/new-password",
];

// AUTH ROUTE
export const authRoute = ["/login", "/register", "/error"];

// API AUTH ROUTE
export const apiRoutePrefix = "/api/auth";

const adminRoutes = [
  "/admin",
  "/admin/about",
  "/admin/meetings",
  "/admin/profile",
  "/admin/table",
];
const guestRoutes = ["/", "/about", "/meetings", "/profile", "/profile/bio"];

export const protectedRoutes = [...adminRoutes, ...guestRoutes];

export const DEFAULT_LOGIN_REDIRECT = "/";
