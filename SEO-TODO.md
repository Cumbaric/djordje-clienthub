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
- [x] **Logo** — dodat (`public/brand/dweb-logo.png`, 512×512, upisan u `business.logo` kao ImageObject u Organization schemi); favicon `src/app/{favicon.ico,icon.png,apple-icon.png}`, header/footer/OG kartice koriste isti logo (generisano skriptom `node scripts/build-brand-assets.mjs` iz `src/assets/brand/dweb-logo-source.png`). Google osvežava favicon/logo tek posle ponovnog indeksiranja (Search Console → URL Inspection → Request indexing).
- [ ] Posle popunjavanja proveri: https://validator.schema.org/ i Google Rich Results Test za `/en` i `/sr`.

## 8. HSTS (posle http → https redirekta)
Sigurnosna zaglavlja su uključena u `next.config.mjs` (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `frame-ancestors`, `Permissions-Policy`). **HSTS namerno nije uključen.**
- [ ] Kad Apache pravila iz tačke 1 rade u produkciji, dodaj u `securityHeaders`:
      `{ key: "Strict-Transport-Security", value: "max-age=86400" }` (1 dan, bez `includeSubDomains` i bez `preload`).
- [ ] Posle nedelju dana bez problema podigni na `max-age=2592000`, pa po potrebi na godinu dana.

## 9. Lokalno razvijanje: koristi zasebnu dev bazu
Pri lokalnom `npm run build` / `npm start` u logu se vidi `Access denied for user 'u325204828_clienthub'@'<tvoja IP>'`,
što znači da `DATABASE_URL` u lokalnom `.env.local` pokazuje na **produkcionu** bazu (hosting je samo odbio tvoju IP).
Ako bi ti IP jednom bila dozvoljena u hosting panelu (Remote MySQL), lokalni build, sitemap, blog i dashboard bi
čitali i **pisali** u produkcione podatke.
- [ ] Napravi zasebnu bazu za razvoj (lokalni MySQL/MariaDB ili druga baza na hostingu) i u `.env.local` postavi njen `DATABASE_URL`.
- [ ] Šemu napravi sa `npm run db:push`, a probne podatke sa `npm run db:seed` (samo nad dev bazom!).
- [ ] Ne dodaji svoju IP u Remote MySQL produkcione baze samo zbog lokalnog rada.
- [ ] Proveri: `.env.local` je u `.gitignore` i nikad nije commit-ovan (provereno 12.11.2026 kroz `git log --all`).
      Ako su kredencijali ikad bili poslati negde van repoa, rotiraj lozinku baze.

## 9. Blog naslovne slike
- [ ] Naslovnu sliku članka (polje „coverImage" u dashboard-u) unosi kao link do **WebP/AVIF** fajla (idealno 1200×675, ≤ 150 KB).
      Slike iz baze su proizvoljni spoljni URL-ovi, pa ih Next ne optimizuje; kod samo drži raspored stabilnim
      (deklarisane dimenzije, 16:9, lazy za liste, visok prioritet za naslovnu sliku članka).
