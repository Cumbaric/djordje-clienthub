import { db } from "@/db";
import { notes as notesTable } from "@/db/schema";
import { statusLabel } from "@/lib/dashboardLabels";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const notes = await db.select().from(notesTable).orderBy(notesTable.id);

  const totalNotes = notes.length;

  const doneNotes = notes.filter((note) => note.status === "Done").length;

  const openNotes = notes.filter((note) => note.status === "Open").length;

  const backlogNotes = notes.filter((note) => note.status === "Backlog").length;

  const noteStats = [
    {
      label: "Ukupno beleški",
      value: totalNotes,
      description: "Sve beleške radnog dnevnika",
    },
    {
      label: "Završene",
      value: doneNotes,
      description: "Završene beleške projekata",
    },
    {
      label: "Otvorene",
      value: openNotes,
      description: "Beleške koje traže naredni korak",
    },
    {
      label: "Za kasnije",
      value: backlogNotes,
      description: "Ideje ili beleške za naredne faze",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Radni dnevnik</p>
        <h1>Beleške</h1>
        <p>
          Radne beleške, dnevnik aktivnosti i tehničke napomene po klijentima i
          projektima.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        {noteStats.map((item) => (
          <article className="dashboard-stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Pregled</p>
            <h2>Nedavne beleške</h2>
          </div>
        </div>

        <div className="dashboard-notes-list">
          {notes.map((note) => (
            <article className="dashboard-note-card" key={note.slug}>
              <div className="dashboard-note-main">
                <div>
                  <p className="dashboard-label">Beleška</p>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${note.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {statusLabel(note.status)}
                </span>
              </div>

              <div className="dashboard-task-meta">
                <span>Projekat: {note.project}</span>
                <span>Tip: {note.type}</span>
                <span>Datum: {note.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
