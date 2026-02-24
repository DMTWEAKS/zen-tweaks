import { Suspense } from "react";
import BackgroundFX from "@/components/layout/BackgroundFX";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PartneroScripts from "@/components/integrations/PartneroScripts";
import StripeBuyButtonScript from "@/components/integrations/StripeBuyButtonScript";
import PartneroStripeBridge from "@/components/integrations/PartneroStripeBridge";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PartneroScripts />

      <div className="relative min-h-screen flex flex-col">
        <BackgroundFX />
        <Navbar />

        <main className="relative z-10 flex-1 pt-[var(--nav-height)]">
          {children}
        </main>

        <Footer />

        <StripeBuyButtonScript />

        <Suspense fallback={null}>
          <PartneroStripeBridge />
        </Suspense>
      </div>
    </>
  );
}

