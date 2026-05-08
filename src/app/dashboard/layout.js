import DashboardSidebar from "@/components/DashboardSidebar";
import "@/styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-shell">
      <DashboardSidebar />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
