import { db } from "@/db";
import { tasks as tasksTable, invoices as invoicesTable } from "@/db/schema";
import DashboardSidebar from "@/components/DashboardSidebar";
import ToastProvider from "@/components/ToastProvider";
import "@/styles/dashboard.css";

export default async function DashboardLayout({ children }) {
  const in3Days = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const allTasks = await db
    .select({ due: tasksTable.due, status: tasksTable.status, archived: tasksTable.archived })
    .from(tasksTable);

  const taskAlertCount = allTasks.filter(
    (t) => !t.archived && t.status !== "Done" && t.due && t.due <= in3Days,
  ).length;

  let invoiceAlertCount = 0;
  try {
    const allInvoices = await db
      .select({ status: invoicesTable.status })
      .from(invoicesTable);
    invoiceAlertCount = allInvoices.filter(
      (i) => i.status === "Unpaid" || i.status === "Overdue",
    ).length;
  } catch (_) {
    // invoices table may not exist yet in production
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('dashboard-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
        }}
      />
      <ToastProvider>
        <div className="dashboard-shell">
          <DashboardSidebar
            taskAlertCount={taskAlertCount}
            invoiceAlertCount={invoiceAlertCount}
          />
          <main className="dashboard-main">{children}</main>
        </div>
      </ToastProvider>
    </>
  );
}
