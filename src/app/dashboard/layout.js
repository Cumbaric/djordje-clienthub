import DashboardSidebar from "@/components/DashboardSidebar";
import ToastProvider from "@/components/ToastProvider";
import "@/styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('dashboard-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
        }}
      />
      <ToastProvider>
        <div className="dashboard-shell">
          <DashboardSidebar />
          <main className="dashboard-main">{children}</main>
        </div>
      </ToastProvider>
    </>
  );
}
