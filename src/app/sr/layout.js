import PublicHeader from "@/components/PublicHeader";
import "@/styles/public-pages.css";

export default function SrLayout({ children }) {
  return (
    <>
      <PublicHeader lang="sr" />
      {children}
    </>
  );
}
