"use client";

import { useEffect, useState } from "react";
import PayNowJS from "@paynow-gg/paynow.js";

interface PayNowCheckoutButtonProps {
  token: string;
}

export function PayNowCheckoutButton({ token }: PayNowCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleCompleted = (event: { orderId: string }) => {
      console.log("[PayNow] Order completed:", event.orderId);
      PayNowJS.checkout.close();
      window.location.href = `/success?orderId=${encodeURIComponent(event.orderId)}`;
    };

    const handleReady = () => {
      console.log("[PayNow] Checkout ready");
    };

    const handleClosed = () => {
      console.log("[PayNow] Checkout closed");
    };

    PayNowJS.checkout.on("ready", handleReady);
    PayNowJS.checkout.on("completed", handleCompleted);
    PayNowJS.checkout.on("closed", handleClosed);

    return () => {
      PayNowJS.checkout.off("ready", handleReady);
      PayNowJS.checkout.off("completed", handleCompleted);
      PayNowJS.checkout.off("closed", handleClosed);
    };
  }, []);

  const openCheckout = async () => {
    try {
      setLoading(true);

      let checkoutToken = token;

      // If a static token wasn't provided, request a fresh one from our API.
      if (!checkoutToken) {
        const res = await fetch("/api/paynow/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          console.error("[PayNow] Failed to create checkout session", await res.text());
          alert("Something went wrong starting the checkout. Please try again.");
          return;
        }

        const data = (await res.json()) as { token?: string };
        if (!data.token) {
          alert("Checkout could not be started. Please contact support.");
          return;
        }
        checkoutToken = data.token;
      }

      PayNowJS.checkout.open({ token: checkoutToken });
    } catch (err) {
      console.error("[PayNow] Error opening checkout", err);
      alert("Something went wrong starting the checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-[20px] px-[48px] py-[14px] font-inter text-[17px] font-medium tracking-[-0.34px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(63,219,255,0.4)] active:scale-[0.98]"
      style={{
        background: "#3fdbff",
        color: "#090909",
        backdropFilter: "blur(4px)",
      }}
    >
      {loading ? "Processing..." : "Buy now"}
    </button>
  );
}

