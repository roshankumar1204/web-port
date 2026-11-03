import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./css/globals.scss";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "Roshan Kumar | Software Engineer",
  description:
    "Roshan Kumar: software engineer (MCA 2026) building AI systems, BLE wearable apps and deployed backends. Python, C++, LLMs, FastAPI, PostgreSQL, Cloud Run.",
  openGraph: {
    title: "Roshan Kumar | Software Engineer",
    description:
      "Built an ERP that recouped ₹74,071 in missed GST credit and owned the architecture of a BLE wearable fitness app. AI, backend and IoT.",
    url: "https://rizhu.netlify.app/",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#07070b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
      {process.env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />}
    </html>
  );
}
