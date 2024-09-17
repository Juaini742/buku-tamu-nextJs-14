import NextAuth from "next-auth";
import { authRoute, protectedRoutes, publicRoutes } from "./routes";
import authConfig from "./auth.config";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);
const secret = process.env.NEXTAUTH_SECRET as string;

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoute.includes(nextUrl.pathname);

  const token = await getToken({ req, secret });

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute && isProtectedRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (token) {
    if (isProtectedRoute) {
      if (nextUrl.pathname.startsWith("/admin") && token.role === "GUEST") {
        return Response.redirect(new URL("/", nextUrl));
      }
    }

    if (isPublicRoute) {
      if (token.role === "ADMIN") {
        return Response.redirect(new URL("/admin", nextUrl));
      } else if (token.role === "GUEST") {
        return Response.redirect(new URL("/", nextUrl));
      }
    }
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
