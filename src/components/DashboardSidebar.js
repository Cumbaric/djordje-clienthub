"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./DashboardSidebar.module.css";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Clients", href: "/dashboard/clients" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Tasks", href: "/dashboard/tasks" },
  { label: "Notes", href: "/dashboard/notes" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    closeMenu();

    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        router.push("/login");
      } else {
        if (process.env.NODE_ENV === "development") {
          console.error("Logout failed:", res.status);
        }
        setIsLoggingOut(false);
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Logout error:", err);
      }
      setIsLoggingOut(false);
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={styles.brand}>
          <span className={styles.brandLabel}>ClientHub</span>
          <strong>Dashboard</strong>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={isMenuOpen ? "Close dashboard menu" : "Open dashboard menu"}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`${styles.menuContent} ${
          isMenuOpen ? styles.menuContentOpen : ""
        }`}
      >
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className={isActive ? styles.activeLink : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" onClick={closeMenu}>
            Back to portfolio
          </Link>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Odjava..." : "Odjavi se"}
          </button>
        </div>
      </div>
    </aside>
  );
}