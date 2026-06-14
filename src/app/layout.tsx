import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hemang Doshi — Proof of Work",
  description:
    "AI-native full-stack engineer building agent-first tools, cloud-ready systems, and proof-of-work products.",
  openGraph: {
    title: "Hemang Doshi — Proof of Work",
    description:
      "AI-native full-stack engineer building agent-first tools, cloud-ready systems, and proof-of-work products.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171721",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-deep-space antialiased">
      <body className="min-h-full bg-deep-space font-[family:var(--font-arcadia)] text-starlight">
        {children}
      </body>
    </html>
  );
}
