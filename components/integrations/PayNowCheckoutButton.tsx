"use client";

import { useEffect } from "react";
import PayNowJS from "@paynow-gg/paynow.js";

interface PayNowCheckoutButtonProps {
  token: string;
}

export function PayNowCheckoutButton({ token }: PayNowCheckoutButtonProps) {
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

  const openCheckout = () => {
    PayNowJS.checkout.open({ token });
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      className="inline-flex items-center justify-center rounded-[20px] px-[48px] py-[14px] font-inter text-[17px] font-medium tracking-[-0.34px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(63,219,255,0.4)] active:scale-[0.98]"
      style={{
        background: "#3fdbff",
        color: "#090909",
        backdropFilter: "blur(4px)",
      }}
    >
      Buy now
    </button>
  );
}

