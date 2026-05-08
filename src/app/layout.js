import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  title: "Djordje ClientHub",
  description: "Portfolio i interni alat za WordPress freelance posao.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
