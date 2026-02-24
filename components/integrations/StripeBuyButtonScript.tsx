import Script from "next/script";

export default function StripeBuyButtonScript() {
  return (
    <Script
      id="stripe-buy-button-script"
      src="https://js.stripe.com/v3/buy-button.js"
      strategy="afterInteractive"
    />
  );
}

