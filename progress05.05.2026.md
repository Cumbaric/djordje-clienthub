# Djordje ClientHub — dnevnik rada

Datum: 05.05.2026.

## Kratak opis projekta

Djordje ClientHub je web aplikacija koja treba da ima dva dela:

1. Javni portfolio deo koji mogu da vide potencijalni klijenti.
2. Privatni dashboard deo za upravljanje WordPress klijentima, projektima, zadacima i radnim beleškama.

Aplikacija se razvija prvo lokalno, bez deploy-a i bez povezivanja domena. Domen se povezuje tek kada MVP bude stabilan.

## Izabrana tehnologija

Za projekat je izabrana sledeća osnova:

* Next.js
* React
* App Router
* JavaScript
* CSS bez Tailwinda
* MySQL kasnije
* Prisma ORM kasnije
* Auth.js / NextAuth kasnije
* GitHub kasnije
* Vercel kasnije

## Poglavlje 1 — Postavljanje projekta lokalno

Poglavlje 1 je završeno.

Urađeno je:

* Kreiran je novi Next.js projekat pod nazivom `djordje-clienthub`.
* Projekat je kreiran lokalno u folderu `Portfolio Project`.
* Projekat je otvoren u Visual Studio Code-u.
* Pokrenut je lokalni razvojni server komandom `npm run dev`.
* Aplikacija radi na adresi `http://localhost:3000`.
* Početna Next.js stranica je zamenjena osnovnom početnom stranicom za Djordje ClientHub.
* Podešen je osnovni `globals.css` bez default dark mode podešavanja.
* Potvrđeno je da radimo običan CSS, bez Tailwinda.
* Kreirana je osnovna struktura foldera u `src` folderu.

Trenutna osnovna struktura:

```text
src
├── app
├── components
├── data
├── lib
└── styles
```

## Poglavlje 2 — Arhitektura aplikacije

Poglavlje 2 je završeno.

Cilj poglavlja bio je da se postavi osnovna arhitektura javnog i privatnog dela aplikacije.

### Public deo

Kreirane su javne rute:

```text
/
/projects
/services
/process
/contact
```

Za svaku javnu rutu napravljen je osnovni `page.js` fajl sa naslovom i kratkim opisom.

Kreirana je komponenta:

```text
src/components/PublicHeader.js
```

Kreiran je CSS modul:

```text
src/components/PublicHeader.module.css
```

Public navigacija trenutno sadrži:

```text
Djordje ClientHub
Projects
Services
Process
Contact
Login
```

### Stil javnih stranica

Kreiran je fajl:

```text
src/styles/public-pages.css
```

U njemu je definisana osnovna klasa:

```text
.public-page
```

Ova klasa se koristi za osnovni razmak, širinu sadržaja i tipografiju javnih stranica.

### Private / dashboard deo

Kreirane su privatne dashboard rute:

```text
/login
/dashboard
/dashboard/clients
/dashboard/projects
/dashboard/tasks
/dashboard/notes
```

Za sada ove rute nisu zaštićene login sistemom. Login i zaštita ruta dolaze u kasnijem poglavlju.

### Odvajanje public i dashboard layout-a

Urađeno je odvajanje public i dashboard dela preko Next.js route group strukture.

Kreiran je folder:

```text
src/app/(public)
```

U njega su premeštene javne stranice:

```text
src/app/(public)/page.js
src/app/(public)/projects/page.js
src/app/(public)/services/page.js
src/app/(public)/process/page.js
src/app/(public)/contact/page.js
```

Kreiran je public layout:

```text
src/app/(public)/layout.js
```

Public layout koristi `PublicHeader`, pa se header prikazuje samo na javnim stranicama.

Glavni root layout je očišćen i sada služi kao osnovni HTML wrapper.

### Dashboard layout

Kreirana je komponenta:

```text
src/components/DashboardSidebar.js
```

Kreiran je CSS modul:

```text
src/components/DashboardSidebar.module.css
```

Kreiran je dashboard CSS fajl:

```text
src/styles/dashboard.css
```

Kreiran je dashboard layout:

```text
src/app/dashboard/layout.js
```

Dashboard layout koristi sidebar navigaciju i prikazuje je na svim dashboard rutama.

Dashboard sidebar trenutno sadrži:

```text
Overview
Clients
Projects
Tasks
Notes
Back to portfolio
```

### Trenutna finalna struktura relevantnih foldera

```text
src
├── app
│   ├── (public)
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── page.module.css
│   │   ├── projects
│   │   │   └── page.js
│   │   ├── services
│   │   │   └── page.js
│   │   ├── process
│   │   │   └── page.js
│   │   └── contact
│   │       └── page.js
│   ├── dashboard
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── clients
│   │   │   └── page.js
│   │   ├── projects
│   │   │   └── page.js
│   │   ├── tasks
│   │   │   └── page.js
│   │   └── notes
│   │       └── page.js
│   ├── login
│   │   └── page.js
│   ├── globals.css
│   └── layout.js
├── components
│   ├── PublicHeader.js
│   ├── PublicHeader.module.css
│   ├── DashboardSidebar.js
│   └── DashboardSidebar.module.css
├── data
├── lib
└── styles
    ├── public-pages.css
    └── dashboard.css
```

## Proverene rute

Provereno je da rade sledeće rute:

```text
http://localhost:3000
http://localhost:3000/projects
http://localhost:3000/services
http://localhost:3000/process
http://localhost:3000/contact
http://localhost:3000/login
http://localhost:3000/dashboard
http://localhost:3000/dashboard/clients
http://localhost:3000/dashboard/projects
http://localhost:3000/dashboard/tasks
http://localhost:3000/dashboard/notes
```

Public deo ima `PublicHeader`.

Dashboard deo ima `DashboardSidebar`.

Public i dashboard layout su uspešno odvojeni.

## Važne napomene

* Login sistem još nije implementiran.
* Dashboard rute još nisu zaštićene.
* Baza podataka još nije povezana.
* Prisma još nije instalirana.
* GitHub još nije povezan.
* Deploy još nije urađen.
* Domen se ne povezuje dok MVP ne bude stabilan.

## Sledeće poglavlje

Sledeće poglavlje je:

## Poglavlje 3 — Public portfolio deo

Plan za sledeće poglavlje:

1. Srediti Home stranicu.
2. Napraviti ozbiljniji hero section.
3. Dodati kratko predstavljanje.
4. Dodati preview projekata.
5. Dodati osnovne usluge.
6. Pripremiti Projects stranicu.
7. Pripremiti prvi case study.

Cilj sledećeg poglavlja je da javni portfolio deo počne da liči na ozbiljan portfolio projekat koji može da se pokaže potencijalnim klijentima.
