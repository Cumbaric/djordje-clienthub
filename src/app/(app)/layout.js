import "../globals.css";
import { geist, siteMetadata } from "@/lib/siteMetadata";

export const metadata = siteMetadata;

export default function AppRootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
