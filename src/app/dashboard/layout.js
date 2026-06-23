import DashboardSidebar from "@/components/DashboardSidebar";
import ToastProvider from "@/components/ToastProvider";
import "@/styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <ToastProvider>
      <div className="dashboard-shell">
        <DashboardSidebar />
        <main className="dashboard-main">{children}</main>
      </div>
    </ToastProvider>
  );
}
