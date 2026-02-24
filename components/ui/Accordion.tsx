"use client";

import { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-[var(--text)]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-sm font-medium text-[var(--text)]">
          {title}
        </span>
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center text-[var(--primary)] transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="6" y1="0" x2="6" y2="12" />
            <line x1="0" y1="6" x2="12" y2="6" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-xs leading-relaxed text-[var(--muted)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div>{children}</div>;
}
