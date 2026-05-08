export default function NotesPage() {
  const notes = [
    {
      title: "Poglavlje 3 completed",
      project: "Djordje ClientHub",
      type: "Project log",
      date: "08.05.2026",
      status: "Done",
      description:
        "Public portfolio deo je završen. Proverene su rute, header linkovi, Contact dugmad, responsive prikaz i case study stranica.",
    },
    {
      title: "Dashboard overview prepared",
      project: "Djordje ClientHub",
      type: "Dashboard UI",
      date: "08.05.2026",
      status: "Done",
      description:
        "Kreirana je dashboard overview stranica sa statistikama, quick actions karticama i recent work sekcijom.",
    },
    {
      title: "Clients, Projects and Tasks pages structured",
      project: "Djordje ClientHub",
      type: "Private workspace",
      date: "08.05.2026",
      status: "Done",
      description:
        "Pripremljene su dashboard stranice za klijente, projekte i zadatke sa statičnim podacima i responsive karticama.",
    },
    {
      title: "Wellness Concept next focus",
      project: "Wellness Concept",
      type: "Client note",
      date: "Next work block",
      status: "Open",
      description:
        "Sledeći fokus za Wellness Concept može biti pregled mobilnih performansi, hero slika i SEO opisa za tretmane.",
    },
    {
      title: "Future database connection",
      project: "Djordje ClientHub",
      type: "Technical note",
      date: "Later phase",
      status: "Backlog",
      description:
        "Dashboard trenutno koristi statične podatke. Kasnije će se povezati MySQL baza preko Prisma ORM-a.",
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

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Overview</p>
            <h2>Recent notes</h2>
          </div>
        </div>

        <div className="dashboard-notes-list">
          {notes.map((note) => (
            <article className="dashboard-note-card" key={note.title}>
              <div className="dashboard-note-main">
                <div>
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