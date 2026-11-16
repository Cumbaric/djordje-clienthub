# Email modul (`/dashboard/email`)

Privatni email klijent za `info@dwebsolutions.rs` unutar dashboard-a (IMAP + SMTP, Superhosting).
Radi **isključivo server-side u Node.js runtime-u** (Passenger), a vidi ga samo jedan, eksplicitno određen nalog.

## Env promenljive

Primer je u [`.env.example`](../.env.example). Prave vrednosti idu samo u `.env.local` (lokalno) ili u panel hostinga
(cPanel → Setup Node.js App → Environment variables). Lozinka se nikad ne commit-uje, ne loguje i ne šalje klijentu.

| Promenljiva | Obavezna | Opis |
|---|---|---|
| `EMAIL_IMAP_HOST`, `EMAIL_IMAP_PORT` | da | IMAP preko SSL/TLS (`mail.dwebsolutions.rs`, `993`) |
| `EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT` | da | SMTP preko SSL/TLS (`mail.dwebsolutions.rs`, `465`) |
| `EMAIL_USERNAME` | da | korisničko ime naloga; ujedno fiksna `From` adresa (`info@dwebsolutions.rs`) |
| `EMAIL_PASSWORD` | da | lozinka naloga |
| `CLIENTHUB_EMAIL_ADMIN_USERNAME` | da | korisničko ime dashboard naloga koji sme da koristi modul |
| `EMAIL_FROM_NAME` | ne | prikazno ime u `From` zaglavlju |
| `EMAIL_ALLOWED_ORIGIN` | ne | samo ako sajt radi iza proxy-ja koji menja `Host` (CSRF provera) |

Ako nešto od obaveznog fali, modul prijavljuje „Email servis nije podešen” (503) bez ikakvih detalja klijentu;
u server logu se vide samo **nazivi** problematičnih promenljivih.

TLS je uvek uključen (`secure: true`) i sertifikat se uvek validira. Ne postoji opcija za isključivanje.
Ako `mail.dwebsolutions.rs` ima sertifikat izdat na drugo ime, ispravka je u hostname-u (`EMAIL_*_HOST`), ne u gašenju provere.

## Autorizacija

`src/lib/email/authz.js`. Identitet dolazi **samo** iz potpisanog session cookie-ja (`sub`).
Pristup postoji samo ako su sva četiri uslova ispunjena:

1. sesija je važeća (potpis, rok) – inače 401 / redirect na `/login`;
2. `CLIENTHUB_EMAIL_ADMIN_USERNAME` je postavljen i nije prazan;
3. `sub` je **tačno** jednak toj vrednosti (poređenje u konstantnom vremenu);
4. tačno jedan konfigurisan dashboard login (`CLIENTHUB_LOGIN_USERNAME` / `_2`) ima to korisničko ime – inače 403.

Drugi korisnik ne vidi stavku „Email” (layout), a direktan URL daje stranicu „Pristup zabranjen”; svaki API endpoint ima
sopstvenu proveru i vraća 401/403. Query parametri, telo i zaglavlja ne mogu da daju privilegije.

## Arhitektura

```
src/lib/email/
  limits.js      ograničenja (jedini izvor, koristi i UI)
  config.js      env -> konfiguracija, bez tajni u greškama
  authz.js       requireEmailAdmin / authorizeApiRequest / isEmailAdmin
  imap.js        imapflow: lista, čitanje, pretraga, flagovi, prilozi, append u Sent
  smtp.js        nodemailer: slanje, klasifikacija grešaka
  parse.js       mailparser -> DTO (bez tela priloga)
  validation.js  adrese, naslov, prilozi, parametri
  service.js     jedino mesto koje spaja IMAP + SMTP (slanje, threading, idempotency)
  handlers.js    HTTP sloj: guard (auth -> CSRF -> rate limit -> config), no-store odgovori
  routes.js      povezivanje zavisnosti (process-level limiteri)
  compose.js     Reply / Reply All / Forward nacrti (čista logika)
  sanitizeHtml.js  DOMPurify pravila + sandbox/CSP za prikaz HTML poruka
  client.js      browser helperi za /api/email/*
src/app/(app)/api/email/**   5 tankih route fajlova (runtime nodejs, force-dynamic)
src/app/(app)/dashboard/email/   stranica + UI komponente + email.module.css
```

API: `GET /api/email/messages`, `GET /api/email/messages/[uid]`, `POST /api/email/messages/[uid]/flags`,
`GET /api/email/messages/[uid]/attachments/[index]`, `POST /api/email/send`.

## Ponašanje IMAP-a

- Poruke se adresiraju sa **folder + UID + UIDVALIDITY** (nikad rednim brojem). Ako se UIDVALIDITY promeni: 409 „Osveži listu”.
- Jedna kratka konekcija po operaciji, uvek `logout` i `lock.release()` u `finally`; najviše 2 istovremene IMAP sesije po procesu.
- Lista dohvata samo traženu stranicu (25), najnovije prvo; pretraga je server-side (`OR subject/from/to/body`).
- Čitanje poruke **ne menja** flagove; „pročitano” je eksplicitan POST. Brojač nepročitanih dolazi iz `STATUS UNSEEN` (best effort).
- Poruke veće od 25 MB se ne preuzimaju.

## Slanje

- `From` je fiksan. Validacija adresa, najviše 25 primalaca, naslov ≤ 200, tekst ≤ 100 000 karaktera,
  najviše 5 priloga, 5 MB po prilogu, 10 MB ukupno, blokirane izvršne ekstenzije.
- Reply/Reply All/Forward: `In-Reply-To` i `References` server **sam čita** iz originalne poruke (ne veruje klijentu).
  Forward može da priloži originalne priloge.
- Nakon uspešnog SMTP slanja kopija se upisuje u Sent preko IMAP `APPEND`. Ako upis ne uspe: poruka je poslata,
  korisnik dobija upozorenje, **slanje se ne ponavlja**.
- Zaštita od duplog slanja: `requestId` po compose sesiji (idempotency), onemogućeno dugme tokom slanja,
  rate limit 10 slanja / 10 min. Greška posle faze `DATA` se tretira kao „nepoznato” i ne dozvoljava ponovno slanje istim ID-jem.

## Bezbednost sadržaja

- HTML poruke se prikazuju samo u `<iframe sandbox="allow-popups allow-popups-to-escape-sandbox">` (bez skripti, bez same-origin,
  bez formi) sa CSP-om koji ne dozvoljava nijedan mrežni zahtev (`default-src 'none'; img-src data:`), nakon DOMPurify sanitizacije.
  Udaljene slike su blokirane (nema tracking piksela), linkovi samo `http(s)/mailto/tel` sa `noopener`.
- Tekst poruka, naslovi i imena priloga se prikazuju kao escape-ovan tekst.
- Prilozi se uvek šalju kao `application/octet-stream` + `attachment` + `nosniff` + `sandbox` CSP (nema inline prikaza).
- Svi odgovori su `private, no-store`; POST zahtevi traže `Origin` iste domene i zaglavlje `x-email-csrf`.
- `nodemailer` ima isključen pristup fajlovima i URL-ovima (`disableFileAccess`, `disableUrlAccess`).

## Testovi

```
npm run test:email     # 99 testova: authz, config, validacija, IMAP/SMTP (lažni server), handleri,
                       # sanitizacija (DOMPurify+jsdom), UI u headless Chrome-u (puppeteer-core), pravi `next start`
```

- UI testovi traže instaliran Chrome/Edge/Chromium (`EMAIL_UI_BROWSER` za prilagođenu putanju); bez njega se prijavljuju kao PENDING.
- `tests/email/next-routes.test.mjs` traži prethodni `npm run build`; mail server je namerno nedostupan (127.0.0.1:9), ništa se ne šalje.
- `EMAIL_UI_SHOTS=<folder> npm run test:email` čuva screenshot-ove ključnih scena.

## PENDING LIVE VERIFICATION (zahteva pravi Superhosting nalog)

Sledeće **nije** moguće potvrditi bez stvarnih kredencijala i odobrenja za test; označeno je kao nepotvrđeno u produkciji:

- [ ] prijava na `mail.dwebsolutions.rs:993` i `:465` sa validnim sertifikatom za taj hostname
- [ ] Inbox lista, otvaranje poruke, paginacija na stvarnom sandučetu
- [ ] server-side pretraga (`SEARCH OR … BODY`) sa srpskim dijakriticima
- [ ] naziv Sent foldera (`INBOX.Sent` / `\Sent`) i `APPEND` u njega
- [ ] `STATUS UNSEEN` brojač
- [ ] slanje jednog **kontrolisanog** test emaila + prijem, `In-Reply-To`/`References` threading u pravom klijentu
- [ ] preuzimanje priloga i slanje priloga
- [ ] CSRF provera iza Apache/Passenger (da `Host` odgovara `Origin`-u; ako ne, postaviti `EMAIL_ALLOWED_ORIGIN`)
- [ ] vidljivost stavke „Email” samo za određeni nalog u produkciji (stranica traži bazu za dashboard layout)
