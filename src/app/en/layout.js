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
      "@id": "https://djordjepopovic.com/#organization",
      "name": "Đorđe Popović",
      "url": "https://djordjepopovic.com",
      "description": "Freelance web developer building clean, structured and SEO-ready websites for small businesses and service providers.",
    },
    {
      "@type": "Person",
      "@id": "https://djordjepopovic.com/#person",
      "name": "Đorđe Popović",
      "jobTitle": "Freelance Web Developer",
      "url": "https://djordjepopovic.com/en",
      "worksFor": { "@id": "https://djordjepopovic.com/#organization" },
      "knowsAbout": ["WordPress", "Next.js", "HTML", "CSS", "JavaScript", "SEO", "Web Performance"],
    },
    {
      "@type": "WebSite",
      "@id": "https://djordjepopovic.com/#website",
      "name": "Đorđe Popović | Web Developer",
      "url": "https://djordjepopovic.com",
      "publisher": { "@id": "https://djordjepopovic.com/#organization" },
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
