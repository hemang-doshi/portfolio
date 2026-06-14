import type { Metadata, Viewport } from "next";
import {
  Boldonse,
  Inter,
  JetBrains_Mono,
  Permanent_Marker, Geist } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, boldonse.variable, jetBrainsMono.variable, permanentMarker.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="cursor-none">
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
