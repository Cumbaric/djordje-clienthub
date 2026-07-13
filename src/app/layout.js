import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://djordjepopovic.com"),
  title: {
    default: "Đorđe Popović | Web Developer Belgrade",
    template: "%s | Đorđe Popović",
  },
  description: "Freelance web developer based in Belgrade — WordPress websites, Next.js apps, WooCommerce stores and SEO optimization for small businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
