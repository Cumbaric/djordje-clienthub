# SEO-TODO — stvari koje se ne rešavaju u kodu

Redosled je okvirno po prioritetu. Označi `[x]` kad završiš.

## 1. http → https i www → apex (Apache) — VISOK PRIORITET
Stanje (provereno 12.11.2026): `http://dwebsolutions.rs/en` i `https://www.dwebsolutions.rs/en`
vraćaju 200 sa punim sadržajem, tj. postoje 4 verzije sajta. `.htaccess` nije u repou, pa
pravila moraju na server.

Kod u repou već radi `https://www.dwebsolutions.rs/*` → `https://dwebsolutions.rs/*` (308) preko
`redirects()` u `next.config.mjs`, ali http varijante se moraju rešiti na Apache nivou
(namerno NE preko `x-forwarded-proto`, zbog rizika od petlje iza Passenger-a).

- [ ] Otvori `.htaccess` u document root-u domena (cPanel → File Manager → `public_html`,
      ili root aplikacije). **Iznad** bloka koji je cPanel/Passenger generisao
      (`# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN`) dodaj:

```apache
RewriteEngine On

# 1) Bilo koji www host -> https apex (jedan skok)
RewriteCond %{HTTP_HOST} ^www\.dwebsolutions\.rs$ [NC]
RewriteRule ^ https://dwebsolutions.rs%{REQUEST_URI} [L,R=301]

# 2) http -> https
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://dwebsolutions.rs%{REQUEST_URI} [L,R=301]
```

- [ ] Ako sajt ikad ide iza Cloudflare-a/proxy-ja, `%{HTTPS}` više nije pouzdan — tada koristi
      `RewriteCond %{HTTP:X-Forwarded-Proto} =http` umesto njega.
- [ ] Test posle izmene (svi moraju vratiti `301` i `Location: https://dwebsolutions.rs/...`):
      ```
      curl -sI http://dwebsolutions.rs/en
      curl -sI http://www.dwebsolutions.rs/en
      curl -sI https://www.dwebsolutions.rs/en
      ```
      a `https://dwebsolutions.rs/en` mora ostati `200`.
- [ ] Tek kada ovo radi u produkciji: uključi HSTS (vidi `next.config.mjs`, stavka 14, ostavljeno
      zakomentarisano).

## 2. Bot zaštita na hostingu
Spoljni automatski klijenti dobijaju stranicu *"One moment, please… request is being verified"*
(verovatno Imunify360). To može blokirati Googlebot/Bingbot i alate za pregled linkova.
- [ ] U hosting panelu (Imunify360 / WAF / bot zaštita) dodaj izuzetak za verifikovane botove
      (Googlebot, Bingbot, LinkedInBot, facebookexternalhit, Twitterbot) ili ih stavi na whitelist.
- [ ] Proveri: Bing Webmaster Tools → URL Inspection, i LinkedIn Post Inspector
      (https://www.linkedin.com/post-inspector/) za `https://dwebsolutions.rs/en`.

## 3. Search Console i Bing Webmaster Tools
- [ ] Google Search Console: verifikuj domen `dwebsolutions.rs` (DNS TXT je najpouzdaniji;
      u repou već postoji `public/google6cd319bd94434e3a.html` — proveri da li je property već verifikovan).
- [ ] Pošalji `https://dwebsolutions.rs/sitemap.xml`.
- [ ] Bing Webmaster Tools: uvezi sajt iz GSC-a, pošalji sitemap.
- [ ] Posle deploya ove grane: "Request indexing" za `/en` i `/sr`.

## 4. Merenje brzine
Lokalno merenje nije pouzdano (korporativni proxy daje ~3.6 s TLS i za github.com).
- [ ] PageSpeed Insights (https://pagespeed.web.dev/) za `/en`, `/sr`, jednu stranicu usluge i
      jedan projekat — mobilni i desktop.
- [ ] Lighthouse iz Chrome-a sa privatne mreže (bez proxyja).

## 5. Lokalno prisustvo i backlinkovi
- [ ] Google Business Profile (kategorija npr. "Web designer" / "Software company"; area served Beograd/Srbija).
- [ ] Prikupi recenzije klijenata (GBP + Trustpilot/Clutch ako ima smisla).
- [ ] Zatraži link sa sajtova klijenata ("Izrada sajta: DWeb Solutions") — Musical Duo Studio,
      Wellness Concept, Lektura i prevod itd.
- [ ] Prijave u direktorijume: Clutch, GoodFirms, DesignRush, srpski poslovni direktorijumi.

## 6. Plan prvih blog članaka (srpski)
Blog je prazan, pa su `/en/blog` i `/sr/blog` privremeno `noindex`. Čim se objavi prvi članak,
automatski postaju indeksirani i ulaze u sitemap.
1. Izrada sajta Beograd — šta je uključeno i kako izabrati agenciju
2. Cena izrade sajta u Srbiji 2026 — od čega zavisi
3. WordPress ili custom sajt — šta je bolje za mali biznis
4. Lokalni SEO za biznise u Beogradu (Google Business Profile + sajt)
5. Održavanje sajta — zašto je potrebno i šta košta

## 7. Podaci koji fale (NAP / schema) — popuni u `src/data/contact.js`
Sva polja su trenutno prazna i zato se NE prikazuju i NE ulaze u schema.org. Čim ih popuniš,
automatski se pojave u Organization/ProfessionalService schemi, footer-u i na kontakt stranici.
- [ ] `business.telephone` — E.164 format (npr. `+381601234567`); `telephoneDisplay` je opcioni lepši prikaz.
- [ ] `business.hours.en` / `business.hours.sr` — tekst za prikaz (npr. "Mon–Fri, 09:00–17:00" / "Pon–Pet, 09:00–17:00")
      i `business.openingHours` u schema formatu (npr. `["Mo-Fr 09:00-17:00"]`).
- [ ] `business.streetAddress` i `business.postalCode` — samo ako želiš javnu adresu (za lokalni SEO/GBP je
      bitno da se poklapa sa Google Business Profile). Sada je u schemi samo Beograd, RS.
- [ ] `socialLinks.github` — URL GitHub profila.
- [ ] **Logo** — ne postoji u repou (favicon se namerno ne koristi). Dodaj fajl u `public/` (npr. `public/logo.png`,
      min. 112×112, idealno kvadratni ili 16:9 PNG/SVG) i upiši putanju u `business.logo`. Google koristi
      `logo` iz Organization schema za Knowledge Panel/rezultate.
- [ ] Posle popunjavanja proveri: https://validator.schema.org/ i Google Rich Results Test za `/en` i `/sr`.

## 8. HSTS (posle http → https redirekta)
Sigurnosna zaglavlja su uključena u `next.config.mjs` (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `frame-ancestors`, `Permissions-Policy`). **HSTS namerno nije uključen.**
- [ ] Kad Apache pravila iz tačke 1 rade u produkciji, dodaj u `securityHeaders`:
      `{ key: "Strict-Transport-Security", value: "max-age=86400" }` (1 dan, bez `includeSubDomains` i bez `preload`).
- [ ] Posle nedelju dana bez problema podigni na `max-age=2592000`, pa po potrebi na godinu dana.
