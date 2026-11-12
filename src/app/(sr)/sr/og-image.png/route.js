import { siteOgImage } from "@/lib/ogImage";

// Stable URL for the site-wide Open Graph card (referenced by seoMeta()). Prerendered at build.
export const dynamic = "force-static";

export function GET() {
  return siteOgImage("sr");
}
