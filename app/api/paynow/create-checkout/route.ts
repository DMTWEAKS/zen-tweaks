import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Creates a new PayNow checkout session using the Management API.
 * Docs: https://docs.paynow.gg/management/management-api/checkout
 */
export async function POST(_req: NextRequest) {
  const apiKey = process.env.PAYNOW_API_KEY;
  const storeId = process.env.PAYNOW_STORE_ID;
  const customerId = process.env.PAYNOW_CUSTOMER_ID;
  const productId = process.env.PAYNOW_PRODUCT_ID;

  if (!apiKey || !storeId || !customerId || !productId) {
    return NextResponse.json(
      {
        error:
          "Missing PayNow config. Ensure PAYNOW_API_KEY, PAYNOW_STORE_ID, PAYNOW_CUSTOMER_ID and PAYNOW_PRODUCT_ID are set.",
      },
      { status: 500 }
    );
  }

  let bodyJson;
  try {
    bodyJson = await _req.json().catch(() => ({}));
  } catch {
    bodyJson = {};
  }

  const {
    returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/success`,
    cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/`,
  } = bodyJson as { returnUrl?: string; cancelUrl?: string };

  try {
    const res = await fetch(`https://api.paynow.gg/v1/stores/${storeId}/checkouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `APIKey ${apiKey}`,
      },
      body: JSON.stringify({
        customer_id: customerId,
        lines: [
          {
            quantity: 1,
            product_id: productId,
          },
        ],
        return_url: returnUrl,
        cancel_url: cancelUrl,
        auto_redirect: false,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[PAYNOW_CREATE_CHECKOUT] Failed:", res.status, errorText);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    const data = (await res.json()) as { token?: string; url?: string; id?: string };

    if (!data.token) {
      console.error("[PAYNOW_CREATE_CHECKOUT] No token in response", data);
      return NextResponse.json(
        { error: "No token returned from PayNow" },
        { status: 500 }
      );
    }

    return NextResponse.json({ token: data.token });
  } catch (err) {
    console.error("[PAYNOW_CREATE_CHECKOUT] Exception:", err);
    return NextResponse.json(
      { error: "Exception creating checkout session" },
      { status: 500 }
    );
  }
}

