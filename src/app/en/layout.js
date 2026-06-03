import { GoogleAnalytics } from "@next/third-parties/google";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import "@/styles/public-pages.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function EnLayout({ children }) {
  return (
    <div className="public-layout">
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
