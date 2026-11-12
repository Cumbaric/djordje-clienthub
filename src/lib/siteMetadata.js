import { Geist } from "next/font/google";

// Shared by the three root layouts ((en), (sr), (app)). Each root layout owns
// its own <html lang>, so everything else they have in common lives here.

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const siteMetadata = {
  metadataBase: new URL("https://dwebsolutions.rs"),
  title: {
    default: "DWeb Solutions | Web Developer Belgrade",
    template: "%s | DWeb Solutions",
  },
  description: "Web development agency based in Belgrade — WordPress websites, Next.js apps, WooCommerce stores and SEO optimization for small businesses.",
};
