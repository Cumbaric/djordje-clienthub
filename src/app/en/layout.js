import PublicHeader from "@/components/PublicHeader";
import ScrollAnimator from "@/components/ScrollAnimator";
import "@/styles/public-pages.css";

export default function EnLayout({ children }) {
  return (
    <div className="public-layout">
      <PublicHeader lang="en" />
      <ScrollAnimator />
      {children}
    </div>
  );
}
