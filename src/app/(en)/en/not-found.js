import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <main>
      <PageHero
        eyebrow="404"
        title="Page not found"
        actions={
          <>
            <Link href="/en" className="hero-action-primary">
              Back to home
            </Link>
            <Link href="/en/services" className="hero-action-secondary">
              View services
            </Link>
          </>
        }
      >
        The page you are looking for does not exist or may have been moved.
      </PageHero>
    </main>
  );
}
