"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./DashboardSidebar.module.css";
import DarkModeToggle from "./DarkModeToggle";

const navItems = [
  { label: "Pregled", href: "/dashboard" },
  { label: "Klijenti", href: "/dashboard/clients" },
  { label: "Projekti", href: "/dashboard/projects" },
  { label: "Zadaci", href: "/dashboard/tasks", badgeKey: "tasks" },
  { label: "Beleške", href: "/dashboard/notes" },
  { label: "Finansije", href: "/dashboard/finances", badgeKey: "invoices" },
  { label: "Kalendar", href: "/dashboard/calendar" },
];

export default function DashboardSidebar({ taskAlertCount = 0, invoiceAlertCount = 0 }) {
  const badges = { tasks: taskAlertCount, invoices: invoiceAlertCount };
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
          <strong>Kontrolna tabla</strong>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={isMenuOpen ? "Zatvori meni" : "Otvori meni"}
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

            const badgeCount = item.badgeKey ? (badges[item.badgeKey] ?? 0) : 0;
            return (
              <Link
                href={item.href}
                key={item.href}
                className={isActive ? styles.activeLink : undefined}
                onClick={closeMenu}
              >
                {item.label}
                {badgeCount > 0 && (
                  <span className={styles.navBadge}>{badgeCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <DarkModeToggle />

          <Link href="/" onClick={closeMenu}>
            Nazad na portfolio
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