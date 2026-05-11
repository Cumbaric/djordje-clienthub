import { notes } from "@/data/notes";

export default function NotesPage() {
  const totalNotes = notes.length;

  const doneNotes = notes.filter((note) => note.status === "Done").length;

  const openNotes = notes.filter((note) => note.status === "Open").length;

  const backlogNotes = notes.filter((note) => note.status === "Backlog").length;

  const noteStats = [
    {
      label: "Total notes",
      value: totalNotes,
      description: "All work log notes",
    },
    {
      label: "Done notes",
      value: doneNotes,
      description: "Completed project notes",
    },
    {
      label: "Open notes",
      value: openNotes,
      description: "Notes that need follow-up",
    },
    {
      label: "Backlog notes",
      value: backlogNotes,
      description: "Ideas or notes for later phases",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Work log</p>
        <h1>Notes</h1>
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
            <p className="dashboard-label">Overview</p>
            <h2>Recent notes</h2>
          </div>
        </div>

        <div className="dashboard-notes-list">
          {notes.map((note) => (
            <article className="dashboard-note-card" key={note.slug}>
              <div className="dashboard-note-main">
                <div>
                  <p className="dashboard-label">Note</p>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${note.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {note.status}
                </span>
              </div>

              <div className="dashboard-task-meta">
                <span>Project: {note.project}</span>
                <span>Type: {note.type}</span>
                <span>Date: {note.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
