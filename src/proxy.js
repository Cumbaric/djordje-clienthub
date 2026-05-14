import { NextResponse } from "next/server";

const COOKIE_NAME = "clienthub_auth";

export function proxy(request) {
  const loginUrl = new URL("/login", request.url);
  const authCookie = request.cookies.get(COOKIE_NAME);

  if (!authCookie || authCookie.value !== "authenticated") {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
