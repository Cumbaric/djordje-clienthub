import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <main>
      <PageHero
        eyebrow="404"
        title="Stranica nije pronađena"
        actions={
          <>
            <Link href="/sr" className="hero-action-primary">
              Nazad na početnu
            </Link>
            <Link href="/sr/usluge" className="hero-action-secondary">
              Pogledaj usluge
            </Link>
          </>
        }
      >
        Stranica koju tražiš ne postoji ili je premeštena.
      </PageHero>
    </main>
  );
}
