import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://djordjepopovic.com/sr" },
    { "@type": "ListItem", "position": 2, "name": "Projekti", "item": "https://djordjepopovic.com/sr/projekti" },
    { "@type": "ListItem", "position": 3, "name": "Luma Dental", "item": "https://djordjepopovic.com/sr/projekti/luma-dental" },
  ],
};

const IMAGES = [
  "/Projects/luma_dental_1.png",
  "/Projects/luma_dental_2.png",
  "/Projects/luma_dental_3.png",
  "/Projects/luma_dental_4.png",
  "/Projects/luma_dental_5.png",
  "/Projects/luma_dental_6.png",
  "/Projects/luma_dental_7.png",
];

export const metadata = {
  title: "Luma Dental Case Study",
  description:
    "Next.js landing page za stomatološku ordinaciju — mreža usluga, tim doktora, galerija ordinacije, FAQ i forma za zakazivanje termina.",
  openGraph: {
    title: "Luma Dental Case Study",
    description:
      "Next.js sajt za stomatološku ordinaciju sa čistom medicinskom estetikom, strukturisanim uslugama i formom za zakazivanje.",
  },
  alternates: {
    canonical: "/sr/projekti/luma-dental",
    languages: {
      en: "/en/projects/luma-dental",
      sr: "/sr/projekti/luma-dental",
    },
  },
};

export default function LumaDentalCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Luma Dental — Next.js landing page za stomatološku ordinaciju"
        actions={
          <>
            <Link href="/sr/kontakt" className="hero-action-primary">
              Pokreni sličan projekat
            </Link>
            <Link href="/sr/usluge" className="hero-action-secondary">
              Pogledaj usluge
            </Link>
          </>
        }
      >
        Čist, profesionalni Next.js sajt za stomatološku ordinaciju u Beogradu
        — izrađen da smanji anksioznost pacijenata, jasno predstavi usluge,
        prikaže tim i olakša zakazivanje termina.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>Next.js / React / Landing Page</strong>
          </div>
          <div>
            <span>Industrija</span>
            <strong>Zdravstvo / Stomatološka ordinacija</strong>
          </div>
          <div>
            <span>Fokus</span>
            <strong>Poverenje, jasnoća usluga, prezentacija tima, konverzija zakazivanja</strong>
          </div>
          <div>
            <span>Uloga</span>
            <strong>Next.js razvoj, dizajn, layout, forma, responsive implementacija</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Galerija projekta</h2>
          <ProjectCarousel images={IMAGES} alt="Luma Dental" />
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            Luma Dental je sajt stomatološke ordinacije dizajniran da istovremeno
            komunicira profesionalnost i toplinu. Cilj je bio da potencijalnim
            pacijentima pruži sve što im je potrebno da se osete sigurno pri
            zakazivanju termina — jasne usluge, pouzdan tim, prijatnu ambijent
            ordinacije i jednostavan način za kontakt.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Izazov</h2>
          <p>
            Sajtovi zdravstvenih ustanova, posebno stomatoloških ordinacija,
            suočavaju se sa specifičnim izazovom: posetioci su često anksiozni
            pre prve posete. Sajt je morao da komunicira mir, sigurnost i
            profesionalnost — a istovremeno da olakša pronalaženje usluga i
            zakazivanje termina.
          </p>
          <ul className="case-study-list">
            <li>Stomatološka anksioznost zahtevala je mekan, umirijući vizuelni pristup</li>
            <li>Šest različitih usluga trebalo je jasno i ravnomerno predstaviti</li>
            <li>Tim je morao delovati lično i pristupačno, a ne klinički</li>
            <li>Forma za zakazivanje morala je biti jednostavna i fokusirana na konverziju</li>
            <li>Fotografije ordinacije trebalo je prikazati pozivajući, a ne zastrašujući</li>
            <li>FAQ je morao da odgovori na stvarne brige pacijenata pre prvog kontakta</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Ciljevi projekta</h2>
          <ul className="case-study-list">
            <li>Izgraditi miran, profesionalni sajt u medicinskoj zelenoj i krem paleti</li>
            <li>Predstaviti šest stomatoloških usluga u preglednoj mreži kartica</li>
            <li>Dodati &ldquo;Zašto LUMA&rdquo; sekciju sa ključnim statistikama ordinacije</li>
            <li>Prikazati tim doktora kroz kartice koje deluju lično</li>
            <li>Napraviti galeriju prostora ordinacije</li>
            <li>Uključiti sklopivi FAQ koji odgovara na česta pitanja</li>
            <li>Izgraditi formu za zakazivanje sa izborom usluge i datumom</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Šta je napravljeno</h2>
          <div className="case-study-grid">
            <article>
              <h3>Hero sekcija</h3>
              <p>
                Podeljeni hero layout sa naslovom koji direktno obraća
                emocijama pacijenta, fotografijom ordinacije sa quote overlay-em
                i dva jasna CTA dugmeta — jedno za zakazivanje i jedno za
                pregled usluga.
              </p>
            </article>
            <article>
              <h3>Mreža usluga</h3>
              <p>
                Šest stomatoloških usluga prikazano kao čiste kartice sa ikonama
                u responzivnoj 3-kolonnoj mreži — Opšta stomatologija, Estetska
                stomatologija, Ortodoncija, Implantologija, Protetika i Dečja
                stomatologija.
              </p>
            </article>
            <article>
              <h3>Zašto LUMA sekcija</h3>
              <p>
                Dvostubni layout koji kombinuje fotografiju ordinacije sa četiri
                kartice vrednosti i tamnu statistiku traku sa 15+ godina
                iskustva, 4.000+ pacijenata i 98% zadovoljstva.
              </p>
            </article>
            <article>
              <h3>Tim i zakazivanje</h3>
              <p>
                Tri kartice doktora sa specijalizacijama i ličnim opisima,
                praćene galerijom prostora ordinacije i strukturisanom formom
                za zakazivanje sa svim potrebnim poljima i opcionalnom porukom.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>CSS Modules</span>
            <span>Responsive design</span>
            <span>Mobile-first layout</span>
            <span>Forma za zakazivanje</span>
            <span>FAQ accordion</span>
            <span>Vercel deployment</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Rezultat</h2>
          <p>
            Luma Dental je kompletno web prisustvo stomatološke ordinacije koje
            balansira medicinsku profesionalnost sa toplinom i pristupačnošću.
            Prigušena zeleno-krem paleta smanjuje vizuelni stres, strukturisane
            sekcije prirodno vode posetioce od usluga do tima do zakazivanja, a
            FAQ sekcija rešava najčešća pitanja pacijenata pre nego što uopšte
            podignu slušalicu.
          </p>
          <ul className="case-study-list">
            <li>Mirna, pouzdana estetika prikladna za zdravstvo</li>
            <li>Šest usluga jasno strukturisano za brzo skeniranje</li>
            <li>Kredibilitet izgrađen kroz kartice tima i statistike ordinacije</li>
            <li>Pitanja pacijenata proaktivno rešena u FAQ sekciji</li>
            <li>Jasna putanja ka zakazivanju termina iz svake sekcije sajta</li>
            <li>Potpuno responzivan na desktop i mobile</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Mogući sledeći koraci</h2>
          <ul className="case-study-list">
            <li>Povezati formu za zakazivanje sa email sistemom ili kalendarom</li>
            <li>Dodati posebne stranice usluga za SEO</li>
            <li>Proširiti sekciju pacijenata sa više testimonijala</li>
            <li>Dodati pre/posle galeriju za estetske tretmane</li>
            <li>Implementirati Google Search Console i lokalnu SEO optimizaciju</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Treba ti Next.js sajt za ordinaciju ili uslužni biznis?</h2>
          <p>
            Ako ti treba čist, pouzdan sajt koji jasno predstavlja usluge,
            prikazuje tim i olakšava klijentima zakazivanje — mogu da ti pomognem
            da ga dizajniramo i izgradimo.
          </p>
          <div className="case-study-cta-actions">
            <Link href="/sr/kontakt">Kontakt</Link>
            <Link href="/sr/usluge" className="case-study-cta-secondary">
              Pogledaj usluge
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
