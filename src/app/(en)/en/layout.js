import { GoogleAnalytics } from "@next/third-parties/google";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import JsonLd from "@/components/JsonLd";
import { buildSiteSchema } from "@/lib/schema";
import "@/styles/public-pages.css";

// GA4 Measurement ID — public (visible in page source), safe to hardcode.
const gaId = "G-T8R88TQFCE";

const siteSchema = buildSiteSchema("en");

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
