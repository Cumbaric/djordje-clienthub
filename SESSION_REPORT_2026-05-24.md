# Session Report — 2026-05-24

## Pregled

Sesija je obuhvatila tri javne stranice portfolia: **Početna**, **Projekti** i **Usluge**.
Ukupno: **18 commita**, bilingual podrška (SR/EN) za svaku izmenu.

---

## 1. Početna stranica (`/sr` · `/en`)

### 1.1 Tech Stack — TechSlider snap carousel

**Problem:** 5 tech grupa u `repeat(4, 1fr)` gridu davalo je neuravnotežen 4+1 layout.

**Rešenje:** Zamenjen grid sa horizontalnim snap karuselom.

**Nove komponente:**
- `src/components/TechSlider.js` — `"use client"` komponenta
- `src/components/TechSlider.module.css`

**Funkcionalnosti:**
- CSS `scroll-snap-type: x mandatory` za snap navigaciju
- Nav dugmad (←/→) i dot indikatori koji se sinhronizuju sa scrollom
- Aktivni slide: `opacity 1`, `scale(1)`, plavi border glow
- Neaktivni slidovi: `opacity 0.42`, `scale(0.96)`
- `mask-image` gradijent na ivicama trake za efekt fade-out
- Tastatura: strelice levo/desno
- Branded SVG ikone tehnologija (SimpleIcons paths)

**Izmenjeni fajlovi:** `src/app/sr/page.js`, `src/app/en/page.js`

---

### 1.2 Stats sekcija — interaktivne kartice sa count-up animacijom

**Problem:** Originalni stats bar bio je vizuelno siromašan i ne uklapa se u ostatak sajta.

**Rešenje:** Potpuno redesajnirana sekcija sa 4 interaktivne kartice.

**Nova komponenta:** `src/components/StatsSection.js` + `StatsSection.module.css`

**Statistike (SR):**
| Kartica | Vrednost | Ikona | Akcentna boja |
|---------|----------|-------|---------------|
| Završenih projekata | 6 | check | zelena |
| Projekata u izradi | 2 | code | plava |
| Godine iskustva | 2+ | calendar | ljubičasta |
| Vreme odgovora | <24h | zap | žuta |

**Funkcionalnosti:**
- `IntersectionObserver` okida count-up animaciju pri ulasku u viewport
- `requestAnimationFrame` + ease-out cubic (`1 - Math.pow(1 - t, 3)`)
- Trajanje: 1600ms
- Hover glow po kartici koristeći CSS `color-mix()` sa `--accent` custom property
- Živući indikator (pulsing zelena tačka) na kartici "u izradi"
- Per-kartica akcentna boja via `--accent` CSS custom property

---

### 1.3 FAQ sekcija

**Nova komponenta:** `src/data/faq.js` — bilingual FAQ data fajl

**Sadržaj (6 pitanja):**
1. Koliko košta izrada sajta?
2. Koliko traje izrada?
3. Radite i WordPress i custom sajtove?
4. Da li dobijam podršku nakon isporuke?
5. Kako izgleda proces rada?
6. Šta mi treba da bih poručio sajt?

**Ispravke sadržaja:**
- Landing page: 3–5 dana (umesto 1–2 nedelje)
- WordPress prezentacioni sajt: 1–2 nedelje
- WooCommerce prodavnica: dodata kao opcija (2–4 nedelje, zavisi od broja proizvoda)
- Uklonjene sve reference na "Custom Next.js" / "React/Next.js" — zamenjeno sa "custom code"

**Implementacija:** Native `<details>/<summary>` HTML (bez JS), CSS animacija za reveal

---

### 1.4 Scroll-triggered entry animacije — RevealSection

**Nova komponenta:** `src/components/RevealSection.js` + `RevealSection.module.css`

**Princip:**
- `IntersectionObserver` sa `threshold: 0.07` i `rootMargin: "0px 0px -48px 0px"`
- Animacija se okida jednom (observer se disconnect-uje nakon prvog triggera)
- Fade-up: `opacity 0 → 1`, `translateY(28px) → 0`
- Trajanje: `0.65s cubic-bezier(0.4, 0, 0.2, 1)`
- `delay` prop za staggerovani ulaz između sekcija

**Wrapper sekcije na početnoj (SR + EN):**
- Tech Stack: delay 0
- O meni (About): delay 0
- Statistike: delay 0
- Usluge: delay 0.05
- Radovi: delay 0.05
- FAQ: delay 0.05
- CTA: delay 0.08

**Podrška za `prefers-reduced-motion`:** animacija se isključuje, sadržaj odmah vidljiv

---

### 1.5 CTA heading — SEO optimizacija

**Pre:** `"Imaš WordPress projekat koji treba srediti ili razviti?"`

**SR:** `"Pokreni projekat — izrada sajta po tvojoj meri"`

**EN:** `"Start your project — a website built around your needs"`

**Razlog:** Prethodni naslov bio previše usko fokusiran na WordPress. Novi naslovi sadrže ključne reči i pokrivaju širi spektar usluga.

---

## 2. Projekti stranica (`/sr/projekti` · `/en/projects`)

### 2.1 Image-first card redesign

**Problem:** Kartice su bile čisto tekstualne — bez vizuelnog identiteta projekata.

**Rešenje:** Novi image-first layout sa cover fotografijom, status badge-om i CTA hint-om.

**Nova struktura kartice:**
```
┌─────────────────────────────────────┐
│  [Cover slika 16:9]    [Status ●]   │
├─────────────────────────────────────┤
│  Type (plavi eyebrow)               │
│  Naslov projekta                    │
│  Opis projekta                      │
│  [Tag] [Tag] [Tag]                  │
│  Pogledaj →                         │
└─────────────────────────────────────┘
```

**Nove CSS klase u `public-pages.css`:**
| Klasa | Namena |
|-------|--------|
| `.project-card-img` | 16:9 wrapper za next/image (fill) |
| `.project-card-status` | Overlay badge sa `data-status` atributom |
| `.project-card-body` | Paddingovana zona ispod slike |
| `.project-card-cta` | "Pogledaj →" hint sa animiranim gap-om |

**Status badge — color coding:**
| `data-status` | Boja | Projekat |
|---------------|------|---------|
| `active` | 🟢 zelena | Wellness Concept |
| `dev` | 🔵 plava | Djordje ClientHub |
| `done` | ⚫ siva | Ostali portfolio projekti |

**Hover efekti:**
- Cover slika: `scale(1.04)` na hover (0.5s ease)
- Kartica: `translateY(-5px)` + plavi border glow
- CTA gap: `6px → 10px` animirano

**Bilingual status labels:** `statusMap` objekat u oba page.js fajla mapira `project.status` u lokalizovani tekst i `data-status` vrednost.

**Izmenjeni fajlovi:** `src/app/sr/projekti/page.js`, `src/app/en/projects/page.js`, `src/styles/public-pages.css`

---

## 3. Usluge stranica (`/sr/usluge` · `/en/services`)

### 3.1 Unified card grid — spajanje dupliranih sekcija (P1)

**Problem:** Stranica je imala dve odvojene sekcije sa istim sadržajem:
- Overview grid (6 kartica, samo naslov + opis)
- Detail lista (iste 6 usluge, opis + bullet lista)

Korisnik je čitao iste informacije dva puta. Stranica je bila nepotrebno dugačka. Kartice nisu bile klikabilne.

**Rešenje:** Dve sekcije spojene u jednu bogatu `services-unified-grid`.

**Nova struktura kartice:**
```
┌─────────────────────────────────────┐
│  [🔷 Ikona]  Naziv usluge           │
│                                     │
│  Opis usluge                        │
│                                     │
│  ✓ Stavka 1                         │
│  ✓ Stavka 2                         │
│  ✓ Stavka 3                         │
│  ✓ Stavka 4                         │
│  ✓ Stavka 5                         │
├─────────────────────────────────────┤
│  Pogledaj detalje →                 │
└─────────────────────────────────────┘
```

**Ikone po usluzi (Feather-style SVG):**
| Slug | Ikona | Opis |
|------|-------|------|
| `html-css-js` | `</>` | Code brackets |
| `react-nextjs` | `⚡` | Zap / lightning |
| `seo-optimization` | `🔍` | Search circle |
| `wordpress-website-development` | `☐` | Layout grid |
| `ecommerce-store` | `🛍` | Shopping bag |
| `website-maintenance` | `🔧` | Tool / wrench |

**Sinhronizacija podataka (P2 + P3):** Page.js fajlovi su kompletno prešli na `data/services.js` kao jedini izvor. Uklonjen duplirani inline `usluge`/`services` array. Slug detail stranice su već koristile `data/services.js`.

**Linkovanje:** Svaka kartica je `<Link>` koji vodi na odgovarajuću detail stranicu (`/sr/usluge/[slug]`).

**Layout:** 2-col desktop → 1-col mobilni (breakpoint 760px)

**Izmenjeni fajlovi:** `src/app/sr/usluge/page.js`, `src/app/en/services/page.js`, `src/styles/public-pages.css`

---

### 3.2 Entry animacije + hover color promene

**Entry animacije:**
- `RevealSection` dodat na sve 4 sekcije (intro, grid, value, CTA)
- Staggerovani delays: intro 0s, grid 0.08s, value 0.05s, CTA 0.05s

**Hover color sistem na `.service-card`:**
| Elemenat | Base | Hover |
|----------|------|-------|
| Background | `#111118` | `#0d1121` (plavo-tamni) |
| H3 naslov | `#f1f5f9` (bela) | `#93c5fd` (svetlo plava) |
| Icon box bg | `rgba(59,130,246,0.10)` | `rgba(59,130,246,0.18)` |
| Icon box border | `rgba(59,130,246,0.20)` | `rgba(59,130,246,0.45)` |
| Icon glow | — | `0 0 16px rgba(59,130,246,0.25)` |
| Radial `::before` | opacity 0 | opacity 1 (prati miša) |

**Globalni radial glow sistem:** `.service-card` dodat u sve 4 grupe `::before` selektora (position, definition, hover, z-index) i u `prefers-reduced-motion` overrides.

---

## Novi fajlovi (sesija)

| Fajl | Tip | Namena |
|------|-----|--------|
| `src/components/TechSlider.js` | Client component | Snap carousel za tech stack |
| `src/components/TechSlider.module.css` | CSS Module | Stilovi karusela |
| `src/components/StatsSection.js` | Client component | Count-up stats kartice |
| `src/components/StatsSection.module.css` | CSS Module | Stilovi stats sekcije |
| `src/components/RevealSection.js` | Client component | Scroll-triggered fade-up |
| `src/components/RevealSection.module.css` | CSS Module | Reveal animacija |
| `src/data/faq.js` | Data | Bilingual FAQ sadržaj |

---

## Commits (hronološki)

```
cd54fae refactor(home): move Tech Stack after About, remove Izdvojeni projekti
9f815e4 feat(services): individual service detail pages + HTML/CSS/JS + CTA fix
c1cd355 refactor(home): reorder sections — Usluge after About, then Tech Stack, then Radovi
b36f691 content: update hero headline — custom websites + WordPress dual positioning
e297a81 refactor(services): restructure service list — new order and lineup
42e075d feat(home): service cards link to /services page instead of individual slugs
bc756b6 feat(tech-stack): branded icon pills + hover glow — Option C
ed01480 feat(tech-stack): real brand SVG logos on tech pills (SimpleIcons paths)
6ee1972 feat(tech-stack): replace grid with TechSlider snap carousel
8ba989e feat(home): add stats bar and FAQ section
62fa46a feat(home): redesign stats section — cards, count-up, icons, live dot
50159da content(faq): update timelines and pricing answers
157d6cd content(faq): replace Next.js/React references with generic "custom code"
5113635 feat(animations): scroll-triggered fade-up entry on all sections
ef6511a content(cta): update CTA heading with SEO-friendly copy
92fa675 feat: redesign projects grid with image-first cards
83cc646 feat(services): merge overview+detail into unified icon card grid (P1)
704f739 feat(services): add entry animations and enhanced card hover color
```

---

## Otvorene stavke (za narednu sesiju)

| Prioritet | Stavka |
|-----------|--------|
| Value grid fix | 5 kartica u 3-col gridu — neuravnotežen 2+2+1 layout |
| Kontakt stranica | Pregled i eventualni redizajn |
| Proces stranica | Pregled i eventualni redizajn |
| SEO optimizacija | sitemap.xml, robots.txt, hreflang, JSON-LD, meta opisi |
| Recenzije / Testimonials | Kada klijenti ostave ocene — dodati sekciju i povratiti "zadovoljnih klijenata" stat |
