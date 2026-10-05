import { NextResponse } from "next/server";
import { getAuthCookieName } from "@/lib/auth";

export async function POST() {
  const cookieName = getAuthCookieName();

  if (!cookieName) {
    return NextResponse.json(
      { success: false, error: "Logout konfiguracija nije podešena." },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}
