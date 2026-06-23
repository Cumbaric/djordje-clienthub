import { db } from "@/db";
import { notes as notesTable } from "@/db/schema";
import { createNote } from "./actions";
import NoteCard from "./NoteCard";
import DashboardEmpty from "@/components/DashboardEmpty";
import "@/styles/dashboard-forms.css";

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
            <p className="dashboard-label">Dodaj novo</p>
            <h2>Nova beleška</h2>
          </div>
        </div>

        <form action={createNote} className="dashboard-form">
          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Naslov *</span>
              <input name="title" type="text" required placeholder="Naslov beleške" />
            </label>
            <label className="dashboard-field">
              <span>Projekat</span>
              <input name="project" type="text" placeholder="npr. Wellness Concept" />
            </label>
          </div>

          <div className="dashboard-form-row">
            <label className="dashboard-field">
              <span>Tip</span>
              <input name="type" type="text" placeholder="npr. Beleška klijenta" />
            </label>
            <label className="dashboard-field">
              <span>Status</span>
              <select name="status" defaultValue="Open">
                <option value="Open">Otvoren</option>
                <option value="Done">Završen</option>
                <option value="Backlog">Za kasnije</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Datum</span>
              <input name="date" type="text" placeholder="npr. 03.06.2026." />
            </label>
          </div>

          <label className="dashboard-field dashboard-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} placeholder="Sadržaj beleške" />
          </label>

          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-btn">
              Dodaj belešku
            </button>
          </div>
        </form>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Pregled</p>
            <h2>Nedavne beleške</h2>
          </div>
        </div>

        <div className="dashboard-notes-list">
          {notes.length === 0 && (
            <DashboardEmpty message="Još nema beleški — dodaj prvu pomoću forme iznad." />
          )}
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}
