import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import "@/styles/public-pages.css";

export default function SrLayout({ children }) {
  return (
    <div className="public-layout">
      <PublicHeader lang="sr" />
      <ScrollAnimator />
      {children}
      <PublicFooter lang="sr" />
    </div>
  );
}
