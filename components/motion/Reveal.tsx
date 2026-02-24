"use client";

import { ReactNode } from "react";
import { useInViewOnce } from "./useInViewOnce";

const DEFAULTS = {
  delayMs: 0,
  durationMs: 600,
  distance: 16,
  threshold: 0.1,
};

type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  delayMs?: number;
  durationMs?: number;
  yPx?: number;
  xPx?: number;
  once?: boolean;
  threshold?: number;
}

function getTranslate(direction: Direction, distance: number): string {
  switch (direction) {
    case "up": return `translateY(${distance}px)`;
    case "down": return `translateY(-${distance}px)`;
    case "left": return `translateX(${distance}px)`;
    case "right": return `translateX(-${distance}px)`;
  }
}

export default function Reveal({
  children,
  className = "",
  style,
  direction = "up",
  delayMs = DEFAULTS.delayMs,
  durationMs = DEFAULTS.durationMs,
  yPx,
  xPx,
  once = true,
  threshold = DEFAULTS.threshold,
}: RevealProps) {
  const { ref, isInView, prefersReducedMotion } = useInViewOnce({
    threshold,
    once,
  });

  const distance = yPx ?? xPx ?? DEFAULTS.distance;

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const isShown = isInView;

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-state={isShown ? "shown" : "hidden"}
      style={{
        "--reveal-translate": getTranslate(direction, distance),
        "--reveal-delay": `${delayMs}ms`,
        "--reveal-duration": `${durationMs}ms`,
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export { Reveal };
