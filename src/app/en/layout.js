import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import "@/styles/public-pages.css";

export default function EnLayout({ children }) {
  return (
    <div className="public-layout">
      <PublicHeader lang="en" />
      <ScrollAnimator />
      {children}
      <PublicFooter lang="en" />
    </div>
  );
}
