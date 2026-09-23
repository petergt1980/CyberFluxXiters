import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuth = req.cookies.get("cyberAuth")?.value === "true";
  const role = req.cookies.get("cyberRole")?.value;

  const isLoginPage = pathname === "/login";
  const isAdminRoute = pathname.startsWith("/admin");
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images") ||
    /\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|woff2?)$/i.test(pathname);

  if (isStaticAsset) {
    return NextResponse.next();
  }

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin" : "/", req.url)
    );
  }

  if (isAuth && role === "user" && isAdminRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};