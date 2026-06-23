import { db } from "@/db";
import { tasks as tasksTable } from "@/db/schema";
import CalendarClient from "./CalendarClient";
import "@/styles/dashboard-extras.css";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const tasks = await db.select().from(tasksTable);
  const activeTasks = tasks.filter((t) => !t.archived);

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Kalendarski prikaz</p>
        <h1>Kalendar</h1>
        <p>
          Pregled zadataka i rokova po datumu.
          Boja tačke označava prioritet: crvena = visok, narandžasta = srednji, zelena = nizak.
        </p>
      </div>
      <CalendarClient tasks={activeTasks} />
    </section>
  );
}
