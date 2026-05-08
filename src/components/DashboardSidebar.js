import Link from "next/link";
import styles from "./DashboardSidebar.module.css";

export default function DashboardSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandLabel}>ClientHub</span>
        <strong>Dashboard</strong>
      </div>

      <nav className={styles.nav}>
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/clients">Clients</Link>
        <Link href="/dashboard/projects">Projects</Link>
        <Link href="/dashboard/tasks">Tasks</Link>
        <Link href="/dashboard/notes">Notes</Link>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link href="/">Back to portfolio</Link>
      </div>
    </aside>
  );
}
