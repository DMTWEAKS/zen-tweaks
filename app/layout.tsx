import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import PartneroScripts from "@/components/integrations/PartneroScripts";
import PartneroStripeBridge from "@/components/integrations/PartneroStripeBridge";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zen Tweaks - Optimize Windows for Maximum Performance",
  description:
    "Stop missing out on performance. Get the most out of your system and start dominating in your favourite games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PartneroScripts />
      </head>

      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}

        <Suspense fallback={null}>
          <PartneroStripeBridge />
        </Suspense>
      </body>
    </html>
  );
}
