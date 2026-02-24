"use client";

import { useEffect, useState, useCallback } from "react";
import { getCookie, getPartnerId } from "@/components/integrations/PartneroStripeBridge";

/**
 * Test Affiliate Page
 *
 * This page is a local test harness for validating Partnero affiliate tracking
 * without needing real Stripe credentials.
 *
 * How to test:
 * 1. Visit: /test-affiliate?aff=TEST_PARTNER_123
 * 2. The Partnero script should set the `partnero_partner` cookie
 * 3. The bridge should update the Stripe link and button with the partner ID
 * 4. Check the debug panel below to verify everything is working
 */

interface DebugState {
  cookieValue: string | null;
  computedPartnerId: string | null;
  urlAffParam: string | null;
  stripeLinkHref: string;
  buyButtonClientRef: string | null;
  partneroScriptLoaded: boolean;
  lastUpdated: string;
}

export default function TestAffiliatePage() {
  const [debug, setDebug] = useState<DebugState>({
    cookieValue: null,
    computedPartnerId: null,
    urlAffParam: null,
    stripeLinkHref: "https://buy.stripe.com/test_dummy",
    buyButtonClientRef: null,
    partneroScriptLoaded: false,
    lastUpdated: new Date().toISOString(),
  });

  const [manualCookie, setManualCookie] = useState("");

  const refreshDebugState = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Check if Partnero script is loaded
    const partneroLoaded = typeof (window as unknown as { po?: unknown }).po === "function";

    // Get the current state of our test elements
    const stripeLink = document.querySelector<HTMLAnchorElement>("#test-stripe-link");
    const buyButton = document.querySelector("#test-buy-button");

    setDebug({
      cookieValue: getCookie("partnero_partner"),
      computedPartnerId: getPartnerId(),
      urlAffParam: urlParams.get("aff"),
      stripeLinkHref: stripeLink?.href || "https://buy.stripe.com/test_dummy",
      buyButtonClientRef: buyButton?.getAttribute("client-reference-id") || null,
      partneroScriptLoaded: partneroLoaded,
      lastUpdated: new Date().toISOString(),
    });
  }, []);

  useEffect(() => {
    // Initial refresh
    refreshDebugState();

    // Set up interval to refresh debug state
    const interval = setInterval(refreshDebugState, 1000);

    return () => clearInterval(interval);
  }, [refreshDebugState]);

  const setTestCookie = () => {
    if (manualCookie) {
      document.cookie = `partnero_partner=${encodeURIComponent(manualCookie)}; path=/; max-age=31536000`;
      refreshDebugState();
    }
  };

  const clearTestCookie = () => {
    document.cookie = "partnero_partner=; path=/; max-age=0";
    setManualCookie("");
    refreshDebugState();
  };

  const copyTestUrl = () => {
    const testUrl = `${window.location.origin}/test-affiliate?aff=TEST_PARTNER_123`;
    navigator.clipboard.writeText(testUrl);
    alert("Test URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🧪 Affiliate Tracking Test Harness</h1>
        <p className="text-gray-400 mb-8">
          Use this page to validate Partnero → Stripe affiliate tracking without real credentials.
        </p>

        {/* Test Instructions */}
        <section className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📋 Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>
              Open an <strong>incognito/private window</strong> to start with a clean slate
            </li>
            <li>
              Visit this page with an affiliate param:{" "}
              <code className="bg-gray-700 px-2 py-1 rounded text-green-400">
                /test-affiliate?aff=TEST_PARTNER_123
              </code>
            </li>
            <li>
              Wait 1-2 seconds for Partnero to set the <code>partnero_partner</code> cookie
            </li>
            <li>Check the Debug Panel below to verify the cookie was set</li>
            <li>
              Verify the Stripe link and button below have{" "}
              <code>client_reference_id=TEST_PARTNER_123</code>
            </li>
            <li>Navigate to another page and back - tracking should persist</li>
          </ol>
          <button
            onClick={copyTestUrl}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors"
          >
            📋 Copy Test URL
          </button>
        </section>

        {/* Debug Panel */}
        <section className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">🔍 Debug Panel</h2>
            <button
              onClick={refreshDebugState}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DebugItem
              label="Partnero Script Loaded"
              value={debug.partneroScriptLoaded ? "✅ Yes" : "❌ No"}
              status={debug.partneroScriptLoaded ? "success" : "error"}
            />
            <DebugItem
              label="URL ?aff= Param"
              value={debug.urlAffParam || "(not present)"}
              status={debug.urlAffParam ? "success" : "neutral"}
            />
            <DebugItem
              label="partnero_partner Cookie"
              value={debug.cookieValue || "(not set)"}
              status={debug.cookieValue ? "success" : "warning"}
            />
            <DebugItem
              label="Computed Partner ID"
              value={debug.computedPartnerId || "(none)"}
              status={debug.computedPartnerId ? "success" : "warning"}
            />
            <DebugItem
              label="Stripe Link href"
              value={debug.stripeLinkHref}
              status={debug.stripeLinkHref.includes("client_reference_id") ? "success" : "warning"}
              fullWidth
            />
            <DebugItem
              label="Buy Button client-reference-id"
              value={debug.buyButtonClientRef || "(not set)"}
              status={debug.buyButtonClientRef ? "success" : "warning"}
              fullWidth
            />
          </div>

          <p className="text-xs text-gray-500 mt-4">Last updated: {debug.lastUpdated}</p>
        </section>

        {/* Manual Cookie Control */}
        <section className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🍪 Manual Cookie Control</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Use this to manually set/clear the cookie for testing (bypasses Partnero script).
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualCookie}
              onChange={(e) => setManualCookie(e.target.value)}
              placeholder="Enter partner ID..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
            />
            <button
              onClick={setTestCookie}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-medium transition-colors"
            >
              Set Cookie
            </button>
            <button
              onClick={clearTestCookie}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition-colors"
            >
              Clear Cookie
            </button>
          </div>
        </section>

        {/* Test Stripe Elements */}
        <section className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">💳 Test Stripe Elements</h2>
          <p className="text-gray-400 mb-6 text-sm">
            These are dummy elements that the PartneroStripeBridge should update with the partner
            ID.
          </p>

          {/* Test Stripe Payment Link */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Stripe Payment Link (anchor)</h3>
            <a
              id="test-stripe-link"
              href="https://buy.stripe.com/test_dummy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              💳 Pay with Stripe (Test Link)
            </a>
            <p className="text-xs text-gray-500 mt-2">
              Current href:{" "}
              <code className="bg-gray-700 px-1 rounded">{debug.stripeLinkHref}</code>
            </p>
          </div>

          {/* Test Stripe Buy Button */}
          <div>
            <h3 className="font-medium mb-2">Stripe Buy Button (custom element)</h3>
            <div className="bg-gray-700 p-4 rounded-lg">
              {/* @ts-expect-error - stripe-buy-button is a custom element */}
              <stripe-buy-button
                id="test-buy-button"
                buy-button-id="buy_btn_test_dummy"
                publishable-key="pk_test_dummy"
              />
              <p className="text-xs text-gray-500 mt-2">
                (This won&apos;t render an actual button without valid Stripe keys - that&apos;s expected)
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Current client-reference-id:{" "}
              <code className="bg-gray-700 px-1 rounded">
                {debug.buyButtonClientRef || "(not set)"}
              </code>
            </p>
          </div>
        </section>

        {/* Additional Test Links */}
        <section className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🔗 Additional Test Links</h2>
          <p className="text-gray-400 mb-4 text-sm">
            These links should also be updated by the bridge:
          </p>
          <div className="space-y-2">
            <a
              href="https://buy.stripe.com/another_test"
              className="block text-blue-400 hover:text-blue-300 underline"
            >
              https://buy.stripe.com/another_test
            </a>
            <a
              href="https://checkout.stripe.com/test_checkout"
              className="block text-blue-400 hover:text-blue-300 underline"
            >
              https://checkout.stripe.com/test_checkout
            </a>
          </div>
        </section>

        {/* Console Instructions */}
        <section className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
            💡 Enable Debug Logging
          </h2>
          <p className="text-gray-300 mb-4">
            To see detailed logs in the browser console, set the environment variable:
          </p>
          <code className="block bg-gray-800 p-3 rounded text-green-400 mb-4">
            NEXT_PUBLIC_PARTNERO_DEBUG=true
          </code>
          <p className="text-gray-400 text-sm">
            Then restart your dev server. You&apos;ll see logs like:
          </p>
          <pre className="bg-gray-800 p-3 rounded text-xs text-gray-300 mt-2 overflow-x-auto">
{`[Partnero] Universal script loaded successfully
[Partnero] Initializing with program ID: UXWBFOL8
[Partnero Bridge] Bridge initialized, pathname: /test-affiliate
[Partnero Bridge] Partner ID from cookie: TEST_PARTNER_123
[Partnero Bridge] Updated Stripe link: { before: "...", after: "..." }
[Partnero Bridge] Updated stripe-buy-button: { buyButtonId: "...", clientReferenceId: "..." }`}
          </pre>
        </section>
      </div>
    </div>
  );
}

function DebugItem({
  label,
  value,
  status,
  fullWidth,
}: {
  label: string;
  value: string;
  status: "success" | "warning" | "error" | "neutral";
  fullWidth?: boolean;
}) {
  const statusColors = {
    success: "text-green-400",
    warning: "text-yellow-400",
    error: "text-red-400",
    neutral: "text-gray-400",
  };

  return (
    <div className={`bg-gray-700/50 rounded p-3 ${fullWidth ? "md:col-span-2" : ""}`}>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`font-mono text-sm break-all ${statusColors[status]}`}>{value}</p>
    </div>
  );
}

