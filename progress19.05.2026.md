# Djordje ClientHub — dnevnik rada

Datum: 19.05.2026.

## Poglavlje 8 — Header & Hero Visual Polish

Poglavlje 8 je završeno.

Cilj poglavlja bio je da se header i hero sekcija podignu na premium vizuelni nivo — animacije, interaktivni 3D element, cursor efekat i mobilna navigacija.

---

## 8.1 — Sticky header fix

### Problem

`PublicHeader` nije radio kao sticky element — skrolovao se sa stranicom.

### Uzrok

U `globals.css` bio je postavljen `overflow-x: hidden` na `html, body`. Ovo kreira novi scroll container i remeti `position: sticky`.

### Rešenje

Uklonjen `overflow-x: hidden` iz `globals.css`.

### Izmenjeni fajlovi

```text
src/app/globals.css
```

---

## 8.2 — Header visual polish

Dodata su tri vizuelna unapređenja na desktop header:

### Gradient border-bottom

Umesto jednobojnog `border-bottom`, dodat je gradient koji ide:
`transparent → blue → cyan → transparent` s leva na desno.
Efekat se intenzivira kada korisnik skroluje (`.scrolled` stanje).

### Nav link hover glow

Na hover navigacijskih linkova dodat je blagi `rgba(59, 130, 246, 0.08)` background pill efekat.

### Login pill stil

Login link je vizuelno odvojen od ostalih nav linkova — dobio je posebnu klasu `.navLogin` sa pill border stilom.

### Izmenjeni fajlovi

```text
src/components/PublicHeader.module.css
src/components/PublicHeader.js
```

---

## 8.3 — Premium hero sekcije

### Full-width layout

Hero sekcije su proširene na punu širinu viewporta. Sadržaj ostaje ograničen na `max-width: 1180px` unutar hero sekcije.

Implementirano tako što je `PageHero` komponenta iznesena van `.public-page` containera na svim interior stranicama.

### PageHero vizuelni elementi

Dodati su:

* Blueprint grid overlay (`::before` pseudo-element)
* Radijalni glow orbs (primary top-right, secondary bottom-left)
* Bottom fade gradijent (`::after`)
* Podrška za `actions` prop — CTA dugmad unutar hero sekcije

### Shimmer i ghost dugmad

U `public-pages.css` kreirane su globalne klase:

```text
.hero-action-primary  — shimmer efekat na hover
.hero-action-secondary — ghost/blur efekat
```

### Izmenjeni fajlovi

```text
src/components/PageHero.js
src/components/PageHero.module.css
src/styles/public-pages.css
src/app/(public)/page.module.css
src/app/en/page.js
src/app/sr/page.js
src/app/en/services/page.js
src/app/sr/usluge/page.js
src/app/en/process/page.js
src/app/sr/proces/page.js
src/app/en/contact/page.js
src/app/sr/kontakt/page.js
src/app/en/projects/wellness-concept/page.js
src/app/sr/projekti/wellness-concept/page.js
```

---

## 8.4 — HeroCube — 3D interaktivni element

Kreiran je novi klijentski komponent `HeroCube` koji se prikazuje u desnoj koloni home hero sekcije.

### Opis

3D CSS kocka sa 6 strana. Svaka strana prikazuje ikonu i naziv jedne usluge:

```text
Front   — WordPress
Back    — SEO
Right   — Speed
Left    — Mobile
Top     — WooCommerce
Bottom  — AI Workflow
```

### Tehničke karakteristike

* CSS `transform-style: preserve-3d` + `perspective` za 3D renderovanje
* Auto-spin pokretan JavaScript `requestAnimationFrame` petljom (~18°/s)
* Drag interakcija mišem i touchom — `onPointerDown/Move/Up` sa `setPointerCapture`
* Delta akumulacija pokreta — Y osa je beskonačna, bez ograničenja rotacije
* Na puštanje miša: smooth snap na najbližu stranu (višekratnik 90°) via CSS tranzicija
* 12 floating čestica (6 blue + 6 cyan) oko kocke — 4 različita float pattern
* Faces su skoro potpuno providne (`background: rgba(8, 8, 22, 0.03)`)
* `prefers-reduced-motion`: auto-spin se ne pokreće, drag ostaje funkcionalan
* Mobilni (≤640px): kocka sakrivena
* Desktop veličina: `200×200px`

### Novi fajlovi

```text
src/components/HeroCube.js
src/components/HeroCube.module.css
```

---

## 8.5 — Hero entry animacije

Dodate su entry animacije za sve public hero sekcije pri učitavanju stranice.

### Efekat

Svaki element dolazi iz:
* `opacity: 0 → 1`
* `translateY(26px) → 0`
* `blur(5px) → 0`

Koristi se `cubic-bezier(0.22, 1, 0.36, 1)` easing koji daje "settle" osećaj.

### Stagger redosled

| Element | Trajanje | Delay |
|---|---|---|
| Eyebrow | 1.0s | 0.10s |
| H1 naslov | 1.1s | 0.30s |
| Opis | 1.0s | 0.52s |
| CTA dugmad | 1.0s | 0.72s |
| HeroCube | 1.2s | 0.40s |

### Izmenjeni fajlovi

```text
src/app/(public)/page.module.css
src/components/PageHero.module.css
```

---

## 8.6 — Hamburger meni (mobilni)

Na mobilnim uređajima (≤640px) desktop navigacija je sakrivena i zamijenjena hamburger dugmetom.

### Ponašanje

* Klik na hamburger → 3 linije se animiraju u X
* Otvara se full-screen overlay sa backdrop blur efektom
* Overlay sadrži sve nav linkove vertikalno, login link i language switch
* Klik na link → meni se zatvara i vrši navigacija
* Promjena rute → meni se automatski zatvara
* Dok je meni otvoren → body scroll je blokiran
* `prefers-reduced-motion`: animacije isključene

### Izmenjeni fajlovi

```text
src/components/PublicHeader.js
src/components/PublicHeader.module.css
```

---

## 8.7 — Grid cursor spotlight

Na hero sekcijama dodat je interaktivni efekat koji prati kursor miša.

### Opis

Kada korisnik pomjeri miš po hero sekciji, grid linije se osvetljavaju u radijusu **180px** oko kursora. Van tog radijusa vidljiv je samo tamni grid kao i ranije.

### Tehničke karakteristike

Implementirano kroz klijentski komponent `HeroGlow`:

* Apsolutno pozicioniran overlay, `pointer-events: none`
* Prati `mousemove` event na parent hero elementu
* Updateuje CSS custom properties `--gx` i `--gy`
* Isti grid pattern kao pozadina, ali sa `rgba(59, 130, 246, 0.45)` intenzitetom
* `mask-image: radial-gradient(circle 180px at var(--gx) var(--gy), ...)` — maska otkriva svetliji grid samo u radijusu kursora
* Na `mouseleave` → opacity fade na 0
* `prefers-reduced-motion`: komponent skriven

### Novi fajlovi

```text
src/components/HeroGlow.js
src/components/HeroGlow.module.css
```

### Izmenjeni fajlovi

```text
src/components/PageHero.js
src/app/en/page.js
src/app/sr/page.js
src/app/(public)/page.module.css
```

---

## Finalna struktura novih fajlova

```text
src/components/HeroCube.js
src/components/HeroCube.module.css
src/components/HeroGlow.js
src/components/HeroGlow.module.css
```

## Accessibility & Performance

* `prefers-reduced-motion` podržan na svim animacijama i interaktivnim elementima
* `aria-hidden="true"` na svim dekorativnim elementima
* Nema novih dependency-ja — sve je vanilla CSS i React
* Dashboard nije dotican
* Sve rute nepromijenjene

## Deploy

Sve promjene su deployovane na Vercel putem GitHub `master` branch automatskog triggera.

Live URL: `https://djordje-clienthub.vercel.app`

---

## Sledeće poglavlje

Poglavlje 9 — Sadržaj javnih stranica i SEO priprema.
