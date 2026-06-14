import type { Metadata, Viewport } from "next";
import {
  Boldonse,
  Inter,
  JetBrains_Mono,
  Permanent_Marker,
} from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-var",
});

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kaio",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-permanent-marker",
});

export const metadata: Metadata = {
  title: "Hemang Doshi — AI-Native Engineer & Systems Builder",
  description:
    "Portfolio of Hemang Doshi: agent infrastructure, cloud-ready systems, local AI workflows, and focused products people can actually use.",
  openGraph: {
    title: "Hemang Doshi — AI-Native Engineer & Systems Builder",
    description:
      "Work, thinking, and product craft across agent infrastructure, cloud systems, local AI, and creator workflows.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${boldonse.variable} ${jetBrainsMono.variable} ${permanentMarker.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
