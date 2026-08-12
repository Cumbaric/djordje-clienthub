import { GoogleAnalytics } from "@next/third-parties/google";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import JsonLd from "@/components/JsonLd";
import "@/styles/public-pages.css";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dwebsolutions.rs/#organization",
      "name": "DWeb Solutions",
      "url": "https://dwebsolutions.rs",
      "description": "Agencija za web razvoj koja pravi čiste, strukturirane i SEO-optimizovane sajtove za male biznise i pružaoce usluga.",
    },
    {
      "@type": "WebSite",
      "@id": "https://dwebsolutions.rs/#website",
      "name": "DWeb Solutions | Web Developer",
      "url": "https://dwebsolutions.rs",
      "publisher": { "@id": "https://dwebsolutions.rs/#organization" },
      "inLanguage": ["en", "sr"],
    },
  ],
};

// GA4 Measurement ID — public (visible in page source), safe to hardcode.
const gaId = "G-T8R88TQFCE";

export default function SrLayout({ children }) {
  return (
    <div className="public-layout">
      <JsonLd data={siteSchema} />
      <PublicHeader lang="sr" />
      <ScrollAnimator />
      {children}
      <PublicFooter lang="sr" />
      {process.env.NODE_ENV === "production" && gaId && (
        <GoogleAnalytics gaId={gaId} />
      )}
    </div>
  );
}
