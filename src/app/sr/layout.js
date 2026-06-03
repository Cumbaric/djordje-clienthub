import { GoogleAnalytics } from "@next/third-parties/google";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import "@/styles/public-pages.css";

// GA4 Measurement ID — public (visible in page source), safe to hardcode.
const gaId = "G-T8R88TQFCE";

export default function SrLayout({ children }) {
  return (
    <div className="public-layout">
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
