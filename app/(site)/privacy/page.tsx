import LegalHeader from "@/components/sections/legal/LegalHeader";
import PrivacyBody from "@/components/sections/legal/PrivacyBody";
import LegalFooterNote from "@/components/sections/legal/LegalFooterNote";

export default function PrivacyPage() {
  return (
    <section className="relative min-h-screen w-full" style={{ background: '#020308' }}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 pt-[72px] pb-16 sm:gap-[92px] sm:px-8 sm:pb-[96px] lg:px-0">
        <div className="flex w-full max-w-[628px] flex-col items-start gap-12 sm:gap-[72px]">
          <LegalHeader
            title="Privacy Policy"
            lastUpdated="Last updated on December 29, 2025"
          />
          
          <PrivacyBody />
        </div>
        
        <LegalFooterNote
          agreementText="By using Zen Tweaks, you agree to our Privacy Policy. If you have questions, please contact us through our official channels."
        />
      </div>
    </section>
  );
}
