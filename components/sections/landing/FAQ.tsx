"use client";

import { useState, useEffect } from "react";
import { Reveal, Stagger } from "@/components/motion";

const faqItems = [
  {
    question: "What is Zen Tweaks?",
    answer:
      "Zen Tweaks is a Windows tweaker built for smooth, responsive performance without the usual risk. It cuts system overhead, reduces latency, and keeps Windows stable - so your PC feels faster without breaking anything.",
    defaultOpen: true,
  },
  {
    question: "What features does Zen Tweaks offer?",
    answer:
      "Zen Tweaks offers GPU/CPU optimizations, network tweaks, Windows debloating, peripheral enhancements, game-specific boosters, BIOS recommendations, and advanced power management settings.",
    defaultOpen: false,
  },
  {
    question: "Does Zen Tweaks work for every game?",
    answer:
      "Zen Tweaks optimizes your entire Windows system, which benefits all games. We also offer game-specific profiles for popular titles like Valorant, Fortnite, and Call of Duty to maximize performance.",
    defaultOpen: false,
  },
  {
    question: "Which Windows version does Zen Tweaks support?",
    answer:
      "Zen Tweaks supports Windows 10 (version 1903 and later) and Windows 11. We recommend keeping your Windows installation up to date for the best results.",
    defaultOpen: false,
  },
  {
    question: "How does Zen Tweaks compare to other optimizers?",
    answer:
      "Unlike many optimizers that apply risky registry hacks or disable essential services, Zen Tweaks focuses on safe, tested optimizations. Every tweak is reversible, and we prioritize system stability alongside performance gains.",
    defaultOpen: false,
  },
];

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="h-[16px] w-[16px] overflow-hidden transition-transform duration-200"
      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <div className="h-[12px] w-[12px] overflow-hidden">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7.5 1.5H10.5V4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 7L10.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const answerId = `faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      className="cursor-pointer overflow-hidden border-b px-[12px] py-[26px] transition-colors duration-150 hover:bg-white/[0.02]"
      style={{ borderColor: 'rgba(63, 219, 255, 0.05)' }}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      aria-expanded={isOpen}
      aria-controls={answerId}
    >
      <div className="flex w-full items-center justify-between text-left">
        <span className="font-inter text-[16px] font-medium leading-[1.2] tracking-[-0.32px] text-white">
          {question}
        </span>
        <span className="text-white">
          <ChevronIcon isOpen={isOpen} />
        </span>
      </div>

      <div
        id={answerId}
        role="region"
        className="overflow-hidden transition-all duration-200"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
          transition: prefersReducedMotion 
            ? 'none' 
            : 'max-height 200ms ease, opacity 200ms ease',
        }}
      >
        <div className="pt-[12px]">
          <p
            className="font-inter text-[14px] font-medium leading-[1.5] tracking-[-0.28px]"
            style={{ color: '#6e6e6e' }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col px-4 pt-16 sm:px-8 sm:pt-[120px] lg:px-[96px]">
        <Reveal className="flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:pb-[48px]" style={{ borderColor: 'rgba(63, 219, 255, 0.05)' }}>
          <div className="flex flex-col gap-[18px]">
            <div className="flex items-center gap-[8px]">
              <div
                className="h-[14px] w-[4px] rounded-[6px]"
                style={{ background: '#3fdbff' }}
              />
              <span
                className="font-ibm-plex-mono text-[12px] font-semibold leading-[1.5]"
                style={{ color: '#808183' }}
              >
                FAQs
              </span>
            </div>

            <h2
              className="font-inter text-[28px] font-semibold leading-[1.2] tracking-[-0.56px] sm:text-[36px] sm:tracking-[-0.72px] lg:text-[40px] lg:tracking-[-0.8px]"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 109.9%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Have questions?
              <br />
              We got answers
            </h2>
          </div>

          <div className="flex flex-col gap-[12px]">
            <span
              className="font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px]"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Any more questions?
            </span>

            <a
              href="https://discord.gg/zentweaks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[8px]"
            >
              <span
                className="font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px] underline decoration-dotted"
                style={{
                  color: '#3fdbff',
                  textDecorationColor: 'rgba(63, 219, 255, 0.25)',
                  textUnderlineOffset: '30%',
                }}
            >
              Join our Discord
              </span>
              <span style={{ color: '#3fdbff' }}>
                <ExternalLinkIcon />
              </span>
            </a>
          </div>
        </Reveal>

        <Stagger className="flex flex-col gap-[8px]" staggerMs={80} yPx={12}>
          {faqItems.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              defaultOpen={item.defaultOpen}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
