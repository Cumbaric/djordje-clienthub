# Changelog — djordje-clienthub

## [v1.1.0] — 2026-06-23

### Dashboard unapređenja — vizualna analitika, toast notifikacije i potvrda brisanja

---

### Šta je dodato

#### 1. Vizualna analitika — Recharts grafikoni

Instaliran **Recharts** (v2) i kreirana nova klijentska komponenta `DashboardCharts`.

Na glavnoj stranici dashboarda (`/dashboard`), između statistika i brzih akcija, prikazuju se dva grafikona u 2-kolumnom gridu:

- **Donut grafikon** — prikazuje raspodelu projekata po statusu (Aktivan / U toku / Planiranje / Pauziran). Svaki status ima dodedjenu boju koja odgovara paleti već korištenoj za status badge-ove.
- **Bar grafikon** — prikazuje raspodelu zadataka po prioritetu (Visok / Srednji / Nizak). Stubovi su obojeni u crvenu, žutu i zelenu boju za intuitivan vizuelni pregled.

Oba grafikona su responzivna (`ResponsiveContainer`) i prelaze na jedan stub/kolonu na mobilnim ekranima.

**Izmenjeni fajlovi:**
- `src/components/DashboardCharts.js` — nova komponenta
- `src/app/dashboard/page.js` — uvoz i renderovanje `DashboardCharts`
- `src/styles/dashboard.css` — stilovi za `.dashboard-charts-grid` i `.dashboard-chart-card`

---

#### 2. Toast notifikacije posle CRUD akcija

Kreiran sistem toast notifikacija bez eksternih zavisnosti.

**`ToastProvider`** je React context provider dodat u dashboard layout. Izlaže `useToast()` hook koji svaka Controls komponenta koristi za prikazivanje feedback-a.

Toasts:
- Pojavljuju se dole-desno ekrana sa `slide-in` animacijom
- Automatski nestaju posle **3.5 sekunde**
- Dostupni tipovi: `success` (zelena) i `error` (crvena)
- Funkcionišu i posle server-side revalidacije stranice (state se čuva u layout-u)

**Triggeri:**
- Promena statusa klijenta / projekta / zadatka / beleške → `"Status X je ažuriran."`
- Brisanje entiteta → `"X je obrisan/obrisana."`

**Izmenjeni fajlovi:**
- `src/components/ToastProvider.js` — nova komponenta (context + provider + UI)
- `src/app/dashboard/layout.js` — `ToastProvider` wrappa ceo dashboard shell
- `src/app/dashboard/clients/ClientControls.js` — integrisan `useToast`
- `src/app/dashboard/projects/ProjectControls.js` — integrisan `useToast`
- `src/app/dashboard/tasks/TaskControls.js` — integrisan `useToast`
- `src/app/dashboard/notes/NoteControls.js` — integrisan `useToast`
- `src/styles/dashboard.css` — stilovi za `.toast-container`, `.toast`, `.toast-success`, `.toast-error`

---

#### 3. Potvrda brisanja — inline confirm UI

Dugme "Obriši" sada prikazuje inline potvrdu pre nego što se izvrši brisanje.

**Tok interakcije:**
1. Korisnik klikne **"Obriši"**
2. Dugme se zamenjuje inline UI-jem: `Obrisati? [Da] [Ne]`
3. Klik na **"Da"** → server action se poziva imperativno + prikazuje se toast
4. Klik na **"Ne"** → UI se vraća na normalno stanje, ništa se ne briše

Server akcije (`deleteClient`, `deleteProject`, `deleteTask`, `deleteNote`) se sada pozivaju **imperativno** (prosleđivanjem `FormData` direktno) umesto putem HTML form `action=` atributa — što omogućava async/await i toast feedback.

**Izmenjeni fajlovi:**
- `src/app/dashboard/clients/ClientControls.js`
- `src/app/dashboard/projects/ProjectControls.js`
- `src/app/dashboard/tasks/TaskControls.js`
- `src/app/dashboard/notes/NoteControls.js`
- `src/styles/dashboard-forms.css` — stilovi za `.dashboard-delete-confirm`, `.dashboard-confirm-yes`, `.dashboard-confirm-no`

---

### Tehničke napomene

- **Nema novih runtime zavisnosti** osim Recharts — toast i confirm su izgrađeni čistim React + CSS
- **Nema breaking changes** — sve server akcije rade identično, samo se pozivaju drugačije (imperativno vs. form submit)
- `DashboardCharts` je `"use client"` komponenta ugnježdena u SSR page — podatke prima kao serijalizovane props (nizovi plain objekata)
- Recharts koristi `window` interno, pa mora biti client komponenta — nema potrebe za `dynamic(..., { ssr: false })`

---

### Fajlovi izmenjeni u ovom commitu

| Fajl | Tip izmene |
|------|-----------|
| `src/components/ToastProvider.js` | Novo |
| `src/components/DashboardCharts.js` | Novo |
| `src/app/dashboard/layout.js` | Izmenjeno |
| `src/app/dashboard/page.js` | Izmenjeno |
| `src/app/dashboard/clients/ClientControls.js` | Izmenjeno |
| `src/app/dashboard/projects/ProjectControls.js` | Izmenjeno |
| `src/app/dashboard/tasks/TaskControls.js` | Izmenjeno |
| `src/app/dashboard/notes/NoteControls.js` | Izmenjeno |
| `src/styles/dashboard.css` | Izmenjeno |
| `src/styles/dashboard-forms.css` | Izmenjeno |
| `package.json` / `package-lock.json` | Izmenjeno (recharts) |
