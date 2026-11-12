import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import "@/styles/public-pages.css";

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      {children}
      <PublicFooter />
    </>
  );
}
