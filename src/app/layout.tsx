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
  description: "AI-Native Engineer & Systems Builder.",
  openGraph: {
    title: "Hemang Doshi — AI-Native Engineer & Systems Builder",
    description: "AI-Native Engineer & Systems Builder.",
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
      suppressHydrationWarning
    >
      <head>
        {/* SECURITY WARNING: Keep this theme initialization script static. Do NOT interpolate user inputs or dynamic variables to prevent XSS. */}
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
      <body>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
