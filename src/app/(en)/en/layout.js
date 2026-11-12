import { GoogleAnalytics } from "@next/third-parties/google";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import JsonLd from "@/components/JsonLd";
import "@/styles/public-pages.css";

// GA4 Measurement ID — public (visible in page source), safe to hardcode.
const gaId = "G-T8R88TQFCE";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dwebsolutions.rs/#organization",
      "name": "DWeb Solutions",
      "url": "https://dwebsolutions.rs",
      "description": "Web development agency building clean, structured and SEO-ready websites for small businesses and service providers.",
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

export default function EnLayout({ children }) {
  return (
    <div className="public-layout">
      <JsonLd data={siteSchema} />
      <PublicHeader lang="en" />
      <ScrollAnimator />
      {children}
      <PublicFooter lang="en" />
      {process.env.NODE_ENV === "production" && gaId && (
        <GoogleAnalytics gaId={gaId} />
      )}
    </div>
  );
}
