import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Pročitaj env vrednosti
    const envUsername = process.env.CLIENTHUB_LOGIN_USERNAME;
    const envPassword = process.env.CLIENTHUB_LOGIN_PASSWORD;
    const cookieName = process.env.CLIENTHUB_AUTH_COOKIE;

    if (!envUsername || !envPassword || !cookieName) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 },
      );
    }

    // 2. Pročitaj body
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 },
      );
    }

    // 3. Proveri credentials
    if (username !== envUsername || password !== envPassword) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    // 4. Postavi cookie i vrati uspeh
    const response = NextResponse.json({ success: true });

    response.cookies.set(cookieName, "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
