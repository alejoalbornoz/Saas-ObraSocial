import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const protectedRoutes = ["/home-user", "/perfil", "/afiliado"];

  const tryingToAccessProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 🔥 1. Si YA tiene token y quiere ir a login/register → lo echamos
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/home-user", req.url));
  }

  // 🔥 2. Si NO tiene token y quiere entrar a rutas protegidas → a login
  if (tryingToAccessProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home-user/:path*",
    "/perfil/:path*",
    "/afiliado/:path*",
    "/login",
    "/register",
  ],
};
