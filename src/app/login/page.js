"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function clearError() {
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Pogrešno korisničko ime ili lozinka.");
      }
    } catch {
      setError("Greška pri povezivanju sa serverom. Pokušaj ponovo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.loginWrapper}>
      <div className={styles.loginCard}>

        {/* ── Header ── */}
        <div className={styles.loginHeader}>
          <span className={styles.appBadge}>
            <span className={styles.appBadgeDot} />
            Djordje ClientHub
          </span>
          <h1 className={styles.loginTitle}>Pristup kontrolnoj tabli</h1>
          <p className={styles.loginSubtitle}>
            Ovo je privatni deo aplikacije. Pristup imaju samo ovlašćeni korisnici.
          </p>
        </div>

        {/* ── Form ── */}
        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="username">
              Email ili korisničko ime
            </label>
            <input
              id="username"
              className={styles.fieldInput}
              type="text"
              placeholder="djordje@example.com"
              autoComplete="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); clearError(); }}
              disabled={isLoading}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="password">
              Lozinka
            </label>
            <input
              id="password"
              className={styles.fieldInput}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
              disabled={isLoading}
            />
          </div>

          {/* Greška */}
          {error && (
            <div className={styles.loginError} role="alert">
              <span className={styles.messageIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button
            className={styles.loginButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Prijava u toku..." : "Prijavi se"}
          </button>

        </form>

        {/* ── Footer ── */}
        <div className={styles.loginFooter}>
          <Link href="/" className={styles.backLink}>
            ← Nazad na portfolio
          </Link>
          <p className={styles.demoNote}>
            Pristup je dozvoljen samo ovlašćenim korisnicima.
          </p>
        </div>

      </div>
    </main>
  );
}
