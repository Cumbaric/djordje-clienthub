import { NextResponse } from "next/server";
import { getAuthCookieName, verifySessionToken } from "@/lib/auth";

export async function proxy(request) {
  const cookieName = getAuthCookieName();
  const token = cookieName ? request.cookies.get(cookieName)?.value : null;
  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
