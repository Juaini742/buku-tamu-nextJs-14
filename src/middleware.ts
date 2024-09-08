import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminRoutes = ["/admin", "/admin/about"];
const guestRoutes = ["/", "/about", "/table"];

const protectedRoutes = [...adminRoutes, ...guestRoutes];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = await getToken({ req });

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (token) {
    if (isProtectedRoute) {
      if (path === "/admin" && token.role === "GUEST") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }

    if (isPublicRoute) {
      if (token.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
      } else if (token.role === "GUEST") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes],
};
