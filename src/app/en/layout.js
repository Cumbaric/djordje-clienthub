import PublicHeader from "@/components/PublicHeader";
import "@/styles/public-pages.css";

export default function EnLayout({ children }) {
  return (
    <>
      <PublicHeader lang="en" />
      {children}
    </>
  );
}
