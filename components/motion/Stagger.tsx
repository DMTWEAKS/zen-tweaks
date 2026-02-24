"use client";

import { ReactNode, Children, isValidElement } from "react";
import { useInViewOnce } from "./useInViewOnce";

const DEFAULTS = {
  staggerMs: 100,
  startDelayMs: 0,
  durationMs: 600,
  distance: 16,
  threshold: 0.1,
};

type Direction = "up" | "down" | "left" | "right";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  staggerMs?: number;
  startDelayMs?: number;
  baseDelayMs?: number;
  durationMs?: number;
  yPx?: number;
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

export default function Stagger({
  children,
  className = "",
  style,
  direction = "up",
  staggerMs = DEFAULTS.staggerMs,
  startDelayMs,
  baseDelayMs = DEFAULTS.startDelayMs,
  durationMs = DEFAULTS.durationMs,
  yPx,
  once = true,
  threshold = DEFAULTS.threshold,
}: StaggerProps) {
  const { ref, isInView, prefersReducedMotion } = useInViewOnce({
    threshold,
    once,
  });

  const initialDelay = startDelayMs ?? baseDelayMs;
  const distance = yPx ?? DEFAULTS.distance;

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const isShown = isInView;

  return (
    <div
      ref={ref}
      className={`stagger ${className}`}
      data-state={isShown ? "shown" : "hidden"}
      style={{
        "--stagger-translate": getTranslate(direction, distance),
        "--stagger-duration": `${durationMs}ms`,
        ...style,
      } as React.CSSProperties}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const delay = initialDelay + index * staggerMs;
          return (
            <div
              className="stagger-item"
              style={{
                "--stagger-delay": `${delay}ms`,
              } as React.CSSProperties}
            >
              {child}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  return (
    <div
      className={`stagger-item ${className}`}
      style={{
        "--stagger-delay": `${delayMs}ms`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export { Stagger };
