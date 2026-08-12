import { NextResponse } from "next/server";

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
    const cookieName = process.env.CLIENTHUB_AUTH_COOKIE;

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
    const isValid = credentialPairs.some(
      (pair) => username === pair.username && password === pair.password,
    );

    if (!isValid) {
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
