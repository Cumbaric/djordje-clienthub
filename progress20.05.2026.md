# Djordje ClientHub — dnevnik rada

Datum: 20.05.2026.

## Poglavlje 9 — Public Footer & HeroGlow Stabilizacija

Poglavlje 9 je završeno.

Cilj poglavlja bio je kreiranje kompletnog public footer-a sa bilingvalnim sadržajem (EN/SR), cursor spotlight animacijom identičnom onoj u hero sekcijama, te rešavanje produkcijskih problema sa HeroGlow komponentom i HeroCube providnošću.

---

## 9.1 — Public footer

Kreirana je nova komponenta `PublicFooter` koja se uključuje u sve javne layout fajlove.

### Struktura

Footer je podijeljen na dva dijela:

**Gornji grid (4 kolone):**

| Kolona | Sadržaj |
|---|---|
| Brand | Logo naziv, opis, badge sa servisima |
| Navigation | Linkovi na sve javne rute |
| Services | Lista usluga kao tekst |
| CTA | Naslov, kratki opis, dugme za kontakt |

**Donja traka:**

* Copyright tekst lijevo
* "Built with Next.js" desno

### Vizuelni elementi

* Blueprint grid pozadinska mreža (isti pattern kao hero sekcije)
* Gradient top border — `transparent → blue → cyan → transparent`
* Ambient glow u pozadini
* Shimmer efekat na CTA dugmetu pri hoveru

### Bilingvalnost

Sadržaj je organizovan u `CONTENT` objekat unutar komponente:

```text
CONTENT.en — engleski sadržaj
CONTENT.sr — srpski sadržaj
```

Svaki layout prosleđuje `lang` prop:

```jsx
<PublicFooter lang="en" />
<PublicFooter lang="sr" />
```

### Responzivnost

| Breakpoint | Layout |
|---|---|
| > 1024px | 4 kolone (1.6fr 1fr 1fr 1.4fr) |
| ≤ 1024px | 3 kolone, CTA ide na punu širinu |
| ≤ 768px | 2 kolone, brand i CTA na punoj širini |
| ≤ 480px | 1 kolona, bottom bar u koloni |

### Novi fajlovi

```text
src/components/PublicFooter.js
src/components/PublicFooter.module.css
```

### Izmenjeni fajlovi

```text
src/app/(public)/layout.js
src/app/en/layout.js
src/app/sr/layout.js
```

---

## 9.2 — Cursor spotlight u footer-u

U footer je uključen isti `HeroGlow` komponent koji postoji u hero sekcijama.

### Efekat

Kada korisnik pomjeri miš po footer-u, grid linije se osvetljavaju u radijusu 180px oko kursora — identičan efekat kao u hero sekcijama.

### Izmenjeni fajlovi

```text
src/components/PublicFooter.js
```

---

## 9.3 — Footer nav link hover animacija

Nav linkovi u footer-u dobili su isti hover stil koji ima header navigacija.

### Efekat

Na hover linka pojavljuje se tanka plava linija ispod teksta, expanduje se od centra ka ivicama, i nestaje na mouseleave.

Implementirano kroz `.colLink::after` pseudo-element sa CSS `width` tranzicijom.

---

## 9.4 — HeroGlow Vercel stabilizacija

### Problem

HeroGlow animacija radila je lokalno na svim stranicama, ali na Vercel produkcijskom deployu radila je samo u footer-u — u hero sekcijama (`/en`, `/sr`) nije bila aktivna.

### Dijagnoza

Problem je bio u načinu pronalaska roditeljskog elementa unutar `HeroGlow.js`. Komponent je koristio `el.parentElement` za dobijanje containera na koji se vezuju `mousemove` / `mouseleave` eventi.

U produkcijskoj Next.js hydration fazi, React Server Component tree može da ima drugačiju DOM strukturu od development tree-a — `parentElement` u određenim slučajevima ne referiše ispravni element.

### Rešenje

Dodat je `data-glow-container` atribut na sve elemente koji hostuju `HeroGlow`. Komponent sada koristi `el.closest("[data-glow-container]")` sa `parentElement` kao fallback:

```js
const hero = el.closest("[data-glow-container]") ?? el.parentElement;
```

### Izmenjeni fajlovi

```text
src/components/HeroGlow.js
src/app/en/page.js
src/app/sr/page.js
src/components/PublicFooter.js
```

### Napomena — prethodna verzija mask-image

U poglavlju 8.7 HeroGlow je bio implementiran sa CSS custom properties (`--gx`, `--gy`) unutar `mask-image` u CSS fajlu. Na Vercel produkciji CSS custom properties unutar `mask-image` nisu pouzdani. Rješenje iz commit-a `bf5a1e5` — `mask-image` se postavlja direktno kao inline stil iz JavaScript-a:

```js
el.style.maskImage = gradient;
el.style.webkitMaskImage = gradient;
```

Ovo je zadržano kao finalno rješenje.

---

## 9.5 — HeroCube face opacity korekcija

### Problem

Na Vercel produkcijskom deployu kocka je izgledala kao čisti wireframe — facevi potpuno nevidljivi. Na lokalnoj verziji facevi su bili vidljivi kao poluprovidne staklene ploče.

### Uzrok

Face background boja bila je `rgba(8, 8, 22, 0.03)` — gotovo identična boji pozadine stranice (`#06060e`). Čak i sa povišenim opacitetom na `rgba(8, 8, 22, 0.15)`, tamno-crna boja na tamnoj pozadini nije davala vidljiv kontrast.

### Rešenje

Promijenjena je baza boje na tamno-plavu umjesto crne, sa opacitetom 42%:

```css
background: rgba(10, 16, 50, 0.42);
```

Tamno-plava (`10, 16, 50`) pravi dovoljan vizuelni kontrast naspram skoro crne pozadine i daje facevima vidljiv stakleni izgled.

Pojačan je i `box-shadow` za više dubine:

```css
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.10),
  inset 0 0 0 1px rgba(59, 130, 246, 0.08),
  0 0 24px rgba(59, 130, 246, 0.10);
```

### Izmenjeni fajlovi

```text
src/components/HeroCube.module.css
```

---

## 9.6 — PageHero HeroGlow i dopune

Komponentu `PageHero` (koriste je interior stranice — Services, Process, Contact, Projects) dodate su dvije dopune koje nisu bile commitovane iz poglavlja 8:

### HeroGlow u PageHero

`HeroGlow` dodan direktno u `PageHero` komponent tako da cursor spotlight radi i na svim interior hero sekcijama.

### Bottom fade

Dodat `::after` pseudo-element na `.hero` u `PageHero.module.css` — blagi gradijent koji feiduje dno hero sekcije prema pozadini stranice.

### Izmenjeni fajlovi

```text
src/components/PageHero.js
src/components/PageHero.module.css
```

---

## 9.7 — Login pill stil (dopuna iz 8.2)

Login link u `PublicHeader` koji nije bio commitovan iz poglavlja 8.2:

Login link koristi klasu `.navLogin` umesto `.navLink` — pill border stil koji ga vizuelno odvaja od ostalih nav linkova.

### Izmenjeni fajlovi

```text
src/components/PublicHeader.js
src/components/PublicHeader.module.css
```

---

## Git commit-ovi ovog poglavlja

| Commit | Opis |
|---|---|
| `4419ff1` | feat: public footer — Chapter 9 |
| `7de762a` | feat: add grid cursor spotlight to footer (HeroGlow) |
| `bf5a1e5` | fix: set mask-image via JS inline style for Vercel production reliability |
| `0541169` | fix: cube face opacity + HeroGlow Vercel reliability (data-glow-container) |
| `03db979` | fix: cube face opacity — switch to dark-blue tint at 42% opacity |

---

## Finalna struktura novih fajlova

```text
src/components/PublicFooter.js
src/components/PublicFooter.module.css
```

## Accessibility & Performance

* `prefers-reduced-motion` podržan — shimmer i tranzicije na CTA dugmetu isključene
* `aria-hidden="true"` na svim dekorativnim elementima (blueprint grid, HeroGlow)
* Nema novih dependency-ja — sve je vanilla CSS i React
* Dashboard nije dotican
* Sve rute nepromijenjene

## Deploy

Sve promjene su deployovane na Vercel putem GitHub `master` branch automatskog triggera.

Live URL: `https://djordje-clienthub.vercel.app`

---

## Sledeće poglavlje

Poglavlje 10 — Sadržaj javnih stranica i SEO priprema.
