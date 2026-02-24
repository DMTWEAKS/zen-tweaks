"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PARTNERO_DEBUG = process.env.NEXT_PUBLIC_PARTNERO_DEBUG === "true";

function debugLog(...args: unknown[]) {
  if (PARTNERO_DEBUG) {
    console.log("[Partnero Bridge]", ...args);
  }
}

function debugWarn(...args: unknown[]) {
  if (PARTNERO_DEBUG) {
    console.warn("[Partnero Bridge]", ...args);
  }
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name && cookieValue) {
      try {
        return decodeURIComponent(cookieValue);
      } catch {
        return cookieValue;
      }
    }
  }
  return null;
}

export function getPartnerId(): string | null {
  const fromCookie =
    getCookie("partnero_partner") || getCookie("partnero_referral");
  if (fromCookie) {
    debugLog("Partner ID from cookie:", fromCookie);
    return fromCookie;
  }

  if (typeof window !== "undefined") {
    const affParam = new URLSearchParams(window.location.search).get("aff");
    if (affParam) {
      debugLog("Partner ID from URL param:", affParam);
      return affParam;
    }
  }

  return null;
}

const processedElements = new WeakSet<Element>();

function applyPartneroTracking() {
  const partnerId = getPartnerId();

  debugLog("Applying tracking, partner ID:", partnerId || "(none)");
  debugLog(
    "Current cookie value:",
    getCookie("partnero_partner") ||
      getCookie("partnero_referral") ||
      "(not set)"
  );

  if (!partnerId) {
    debugLog("No partner ID found, skipping tracking application");
    return;
  }

  const buyButtons = document.querySelectorAll("stripe-buy-button");
  buyButtons.forEach((button) => {
    if (processedElements.has(button)) return;

    const currentRef = button.getAttribute("client-reference-id");
    if (!currentRef) {
      button.setAttribute("client-reference-id", partnerId);
      processedElements.add(button);
      debugLog("Updated stripe-buy-button:", {
        buyButtonId: button.getAttribute("buy-button-id"),
        clientReferenceId: partnerId,
      });
    } else {
      debugLog("stripe-buy-button already has client-reference-id:", currentRef);
    }
  });

  const stripeLinks = document.querySelectorAll<HTMLAnchorElement>(
    'a[href*="buy.stripe.com"], a[href*="checkout.stripe.com"]'
  );
  stripeLinks.forEach((link) => {
    if (processedElements.has(link)) return;

    try {
      const originalHref = link.href;
      const url = new URL(link.href);

      if (!url.searchParams.has("client_reference_id")) {
        url.searchParams.set("client_reference_id", partnerId);
        link.href = url.toString();
        processedElements.add(link);
        debugLog("Updated Stripe link:", {
          before: originalHref,
          after: link.href,
        });
      } else {
        debugLog("Stripe link already has client_reference_id:", link.href);
      }
    } catch {
      debugWarn("Invalid URL, skipping:", link.href);
    }
  });
}

export default function PartneroStripeBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const runTracking = useCallback(() => {
    requestAnimationFrame(() => {
      applyPartneroTracking();
    });
  }, []);

  useEffect(() => {
    debugLog("Bridge initialized, pathname:", pathname);
    debugLog("Search params:", searchParams?.toString() || "(none)");

    runTracking();

    const timeouts = [
      setTimeout(runTracking, 100),
      setTimeout(runTracking, 500),
      setTimeout(runTracking, 1000),
    ];

    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;

      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
              if (
                node.tagName === "STRIPE-BUY-BUTTON" ||
                node.querySelector?.("stripe-buy-button") ||
                (node.tagName === "A" &&
                  ((node as HTMLAnchorElement).href?.includes("buy.stripe.com") ||
                    (node as HTMLAnchorElement).href?.includes("checkout.stripe.com"))) ||
                node.querySelector?.(
                  'a[href*="buy.stripe.com"], a[href*="checkout.stripe.com"]'
                )
              ) {
                shouldReapply = true;
                debugLog("Detected new Stripe element:", node.tagName);
                break;
              }
            }
          }
        }
        if (shouldReapply) break;
      }

      if (shouldReapply) {
        runTracking();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [pathname, searchParams, runTracking]);

  return null;
}
