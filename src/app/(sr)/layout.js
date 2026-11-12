import "../globals.css";
import { geist, siteMetadata } from "@/lib/siteMetadata";

export const metadata = siteMetadata;

export default function SrRootLayout({ children }) {
  return (
    <html lang="sr-Latn" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
