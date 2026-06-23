"use client";

import { useState, useEffect } from "react";
import styles from "./DashboardSidebar.module.css";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dashboard-theme");
    setDark(stored === "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("dashboard-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("dashboard-theme", "light");
    }
  }

  return (
    <button type="button" onClick={toggle} className={styles.darkToggle}>
      {dark ? "Svetla tema" : "Tamna tema"}
    </button>
  );
}
