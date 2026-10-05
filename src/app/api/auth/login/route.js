import { NextResponse } from "next/server";
import {
  createSessionToken,
  getAuthCookieName,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";

// Svaki dodatni admin nalog je poseban par env varijabli:
// CLIENTHUB_LOGIN_USERNAME/PASSWORD, CLIENTHUB_LOGIN_USERNAME_2/PASSWORD_2, itd.
const credentialPairs = [
  ["CLIENTHUB_LOGIN_USERNAME", "CLIENTHUB_LOGIN_PASSWORD"],
  ["CLIENTHUB_LOGIN_USERNAME_2", "CLIENTHUB_LOGIN_PASSWORD_2"],
]
  .map(([userKey, passKey]) => ({
    username: process.env[userKey],
    password: process.env[passKey],
  }))
  .filter((pair) => pair.username && pair.password);

export async function POST(request) {
  try {
    // 1. Pročitaj env vrednosti
    const cookieName = getAuthCookieName();

    if (credentialPairs.length === 0 || !cookieName) {
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

    // 3. Proveri credentials protiv svih naloga
    const matchedPair = credentialPairs.find(
      (pair) => username === pair.username && password === pair.password,
    );

    if (!matchedPair) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    // 4. Postavi cookie i vrati uspeh
    const token = await createSessionToken(matchedPair.username);
    const response = NextResponse.json({ success: true });

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
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
