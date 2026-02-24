import Hero from "@/components/sections/landing/Hero";
import GameLogosRow from "@/components/sections/landing/GameLogosRow";
import WhyChooseUs from "@/components/sections/landing/WhyChooseUs";
import HowItWorks from "@/components/sections/landing/HowItWorks";
import FAQ from "@/components/sections/landing/FAQ";
import BottomCTA from "@/components/sections/landing/BottomCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <GameLogosRow />
      <WhyChooseUs />
      <HowItWorks />
      <FAQ />
      <BottomCTA />
    </>
  );
}
