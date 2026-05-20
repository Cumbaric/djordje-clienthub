# Djordje ClientHub — dnevnik rada

Datum: 20.05.2026.

## Poglavlje 10 — Home stranica: About sekcija, SectionOrb, CTA redesign

---

## 10.1 — About sekcija — kompletna restrukturacija

Sekcija "O meni" / "About" na home stranici prošla je kroz nekoliko iteracija i kompletnu restrukturaciju layouta.

### Finalni layout

**Leva kolona (`1fr`):**
- Eyebrow label ("About Me" / "O meni")
- H2 heading sa plavim akcentom ("ClientHub")
- Lead paragraf
- Blockquote sa cijan levom linijom
- 3 feature itema horizontalno (ikona levo, naslov + opis desno)
- Workflow kartica (ispod feature itema, u levoj koloni)
- Availability badge

**Desna kolona (`1fr`):**
- Workspace kartica (slika 16:9, dominantna)
- Skills kartica (7 brendiranih badge-ova)

### Izmenjeni fajlovi

```
src/app/(public)/page.module.css
src/app/en/page.js
src/app/sr/page.js
```

### Ključne CSS promjene

| Klasa | Izmjena |
|---|---|
| `.introInner` | `grid-template-columns: 1fr 1fr`, `padding: 100px 24px 112px`, `gap: 64px` |
| `.introText` | Dodat `position: relative` |
| `.introSection` | Dodat `position: relative; overflow: hidden` |
| `.featurePills` | `grid-template-columns: repeat(3, 1fr)` — 3 itema horizontalno |
| `.featurePill` | `flex-direction: row; align-items: flex-start` — ikona levo, tekst desno |
| `.featurePillIcon` | Fiksni `40×40px` kvadrat, ne stretch |
| `.aboutCard` | `border: rgba(148,163,184,0.18)`, `background: rgba(15,23,42,0.6)`, `border-radius: 20px` |
| `.aboutCardHeader` | `padding: 14px 18px`, border `rgba(148,163,184,0.1)` |
| `.aboutQuote` | Cijan leva linija `rgba(6,182,212,0.55)`, italic |
| `.rightVisualGrid` | Uklonjen iz JSX (workflow premješten u lijevu kolonu) |
| `.sectionInner` | Dodat `position: relative` |
| `.workSectionHeader` | Dodat `position: relative; overflow: hidden` |

---

## 10.2 — SectionOrb komponenta

Kreirana nova reusable dekorativna komponenta — animirani blue/cyan energy orb koji pali animaciju kada sekcija uđe u viewport.

### Fajlovi

```
src/components/SectionOrb.js      — nova komponenta (client component)
src/components/SectionOrb.module.css — animacije i stilovi
```

### Animacijski tok

1. **Ulaz** — orba ulazi sa leve strane (`translateX(var(--orb-travel))`)
2. **Putanja** — kreće od pozicije podnaslova, staje na 30% kontejnera (`left: 340px`)
3. **Trail** — comet trag vidljiv tokom kretanja, fade-out nakon zaustavljanja
4. **Float** — nakon zaustavljanja, beskonačno lagano lebdi gore-dole (±5px)

### IntersectionObserver

Komponenta koristi `IntersectionObserver` (native browser API, bez novih dependency-ja):
- `threshold: 0.2` — pali se kada 20% sekcije uđe u viewport
- `observer.disconnect()` — animacija se pali samo jednom
- Svaki orb radi nezavisno dok korisnik skroluje

### Props

| Prop | Default | Opis |
|---|---|---|
| `delay` | `"0s"` | Kašnjenje nakon ulaska u viewport |
| `duration` | `"1.4s"` | Dužina travel animacije |
| `className` | `""` | Override za pozicioniranje |
| `style` | `{}` | CSS custom properties |

### CSS custom properties

| Varijabla | Default | Opis |
|---|---|---|
| `--orb-top` | `28px` | Vertikalna pozicija |
| `--orb-left` | `auto` | Horizontalna pozicija (finalna) |
| `--orb-right` | `auto` | Alternativna horizontalna pozicija |
| `--orb-travel` | `-80px` | Dužina putanje (negativna = kreće s lijeva) |
| `--orb-duration` | `1.4s` | Trajanje travel animacije |
| `--orb-float-duration` | `3.2s` | Trajanje float ciklusa |

### Gdje se koristi

| Sekcija | Kontejner | `top` | `left` | Travel |
|---|---|---|---|---|
| O meni / About | `introText` | `8px` | `340px` | `-340px` |
| Radovi / Recent Work | `workSectionHeader` | `6px` | `340px` | `-340px` |
| Projekti / Projects | `sectionInner` | `78px` | `340px` | `-340px` |
| Veštine i alati / Tech Stack | `sectionInner` | `78px` | `340px` | `-340px` |
| Usluge / Services | `sectionInner` | `78px` | `340px` | `-340px` |
| Kontakt / Contact | unutar `CTASection` | `62px` | `340px` | `-340px` |

### Accessibility & Performance

- `aria-hidden="true"` na svim orb elementima
- `pointer-events: none`
- `will-change: transform, opacity` samo na `.orbActive`
- `prefers-reduced-motion` — statična orba bez animacije
- Nema novih dependency-ja

---

## 10.3 — CTASection vizuelni redesign

CTASection koristila je CSS varijable iz light dashboard theme-a. Kompletno restilovana za dark public theme.

### Fajlovi

```
src/components/CTASection.js
src/components/CTASection.module.css
```

### Promjene

| Element | Staro | Novo |
|---|---|---|
| Background | `var(--color-surface-dark)` = `#111827` | `#0d0d1a` (dark navy) |
| Border | nema | `1px solid rgba(59,130,246,0.15)` |
| Border-radius | nema | `28px` |
| Padding | `40px` | `56px 48px` |
| Eyebrow color | `var(--color-primary-light)` = `#93c5fd` | `#60a5fa` |
| Title color | `#ffffff` | `#f1f5f9` |
| Description color | `var(--color-border-strong)` = `#d1d5db` | `#64748b` |
| Button background | `#ffffff` (bijeli) | `linear-gradient(135deg, #3b82f6, #2563eb)` |
| Button color | `var(--color-text)` = tamni | `#ffffff` |
| Button hover | passive | `translateY(-1px)` + `box-shadow` + shimmer |

---

## Git commit-ovi ovog poglavlja

_(nakon ovog izvještaja)_

---

## Finalna struktura novih fajlova

```
src/components/SectionOrb.js
src/components/SectionOrb.module.css
```

## Accessibility & Performance

- `prefers-reduced-motion` poštovan u svim novim animacijama
- `aria-hidden="true"` na svim dekorativnim elementima
- Nema novih dependency-ja
- `npm run build` — prošao bez grešaka

## Deploy

Sve promjene deployovane na Vercel putem GitHub `master` branch automatskog triggera.

Live URL: `https://djordje-clienthub.vercel.app`

---

## Sledeće poglavlje

Poglavlje 11 — Interior stranice i dalje unapređivanje sadržaja.
