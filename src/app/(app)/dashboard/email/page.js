import { requireEmailAdmin } from "@/lib/email/authz";
import { describeConfig, getEmailConfig } from "@/lib/email/config";
import EmailClient from "./EmailClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Email",
  robots: { index: false, follow: false },
};

export default async function EmailPage() {
  // Own authorization check: the dashboard proxy only proves "someone is logged in".
  const access = await requireEmailAdmin();

  if (!access.ok) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-header">
          <p className="dashboard-label">Komunikacija</p>
          <h1>Pristup zabranjen</h1>
          <p>Ovaj modul nije dostupan za tvoj nalog.</p>
        </div>
      </section>
    );
  }

  const config = describeConfig(getEmailConfig());
  return <EmailClient configured={config.configured} ownAddress={config.address ?? ""} />;
}
