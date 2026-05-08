import PublicHeader from "@/components/PublicHeader";
import "@/styles/public-pages.css";

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
}
