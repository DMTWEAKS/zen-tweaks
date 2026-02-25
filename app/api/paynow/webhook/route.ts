import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { Resend } from "resend";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAYNOW_SIGNING_SECRET = process.env.PAYNOW_SIGNING_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "ZenTweaks <noreply@zentweaks.com>";

const PRODUCT_NAME = "ZenTweaks Lifetime License";
const TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes tolerance for timestamp

// ────────────────────────────────────────────────
// Logging helper
// ────────────────────────────────────────────────
function log(
  level: "INFO" | "WARN" | "ERROR",
  context: string,
  message: string,
  data?: Record<string, unknown>
) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [PAYNOW_WEBHOOK] [${level}] [${context}]`;

  const logData = data ? JSON.stringify(data, null, 2) : "";

  if (level === "ERROR") console.error(prefix, message, logData);
  else if (level === "WARN") console.warn(prefix, message, logData);
  else console.log(prefix, message, logData);
}

// ────────────────────────────────────────────────
// Email templates
// ────────────────────────────────────────────────
function generateLicenseEmailHtml(licenseKey: string, productName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${productName} License Key</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" style="max-width:600px;width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:30px 40px;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px 16px 0 0;">
              <h1 style="margin:0;color:#3fdbff;font-size:28px;font-weight:600;">ZenTweaks</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;background:#141414;border-left:1px solid rgba(63,219,255,0.1);border-right:1px solid rgba(63,219,255,0.1);">
              <h2 style="margin:0 0 20px;color:#ffffff;font-size:24px;font-weight:600;">Thank you for your purchase!</h2>
              <p style="margin:0 0 30px;color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;">
                Your ${productName} is ready. Here's your license key:
              </p>
              <div style="background:linear-gradient(135deg,rgba(63,219,255,0.1) 0%,rgba(63,219,255,0.05) 100%);border:1px solid rgba(63,219,255,0.2);border-radius:12px;padding:24px;margin-bottom:30px;">
                <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">License Key</p>
                <p style="margin:0;color:#3fdbff;font-size:20px;font-weight:600;font-family:'Courier New',monospace;word-break:break-all;">${licenseKey}</p>
              </div>
              <h3 style="margin:0 0 16px;color:#ffffff;font-size:18px;font-weight:600;">How to activate:</h3>
              <ol style="margin:0 0 30px;padding-left:20px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.8;">
                <li>Download ZenTweaks from our website</li>
                <li>Run the installer and open the application</li>
                <li>Go to Settings → License</li>
                <li>Enter your license key and click Activate</li>
              </ol>
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;">
                Keep this email safe. Need help? Contact us at 
                <a href="mailto:support@zentweaks.com" style="color:#3fdbff;text-decoration:none;">support@zentweaks.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 40px;background:#0d0d0d;border-radius:0 0 16px 16px;border:1px solid rgba(63,219,255,0.1);border-top:none;">
              <p style="margin:0;color:rgba(255,255,255,0.4);font-size:13px;text-align:center;">
                © ${new Date().getFullYear()} ZenTweaks. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function generateLicenseEmailText(licenseKey: string, productName: string): string {
  return `
Thank you for purchasing ${productName}!

Your License Key: ${licenseKey}

How to activate:
1. Download ZenTweaks from our website
2. Run the installer and open the application
3. Go to Settings → License
4. Enter your license key and click Activate

Keep this email safe. If you need help, contact us at support@zentweaks.com

© ${new Date().getFullYear()} ZenTweaks. All rights reserved.
  `.trim();
}

// ────────────────────────────────────────────────
// Webhook handler
// ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID().slice(0, 8);
  log("INFO", requestId, "=== PAYNOW WEBHOOK RECEIVED ===");

  // 1. Read raw body
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    log("ERROR", requestId, "Failed to read request body", { error: String(err) });
    return NextResponse.json({ error: "Failed to read body" }, { status: 400 });
  }

  // 2. Verify environment variables
  if (!PAYNOW_SIGNING_SECRET) {
    log("ERROR", requestId, "PAYNOW_SIGNING_SECRET is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  if (!RESEND_API_KEY) {
    log("ERROR", requestId, "RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // 3. Signature & timestamp validation
  const timestampHeader = req.headers.get("paynow-timestamp");
  const signatureHeader = req.headers.get("paynow-signature");

  if (!timestampHeader || !signatureHeader) {
    log("ERROR", requestId, "Missing required PayNow headers");
    return NextResponse.json({ error: "Missing signature headers" }, { status: 400 });
  }

  const timestamp = Number(timestampHeader);
  if (!Number.isInteger(timestamp)) {
    log("ERROR", requestId, "Invalid timestamp format", { timestampHeader });
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
  }

  const ageMs = Date.now() - timestamp;
  if (ageMs > TOLERANCE_MS || ageMs < -TOLERANCE_MS) {
    log("WARN", requestId, "Request timestamp outside tolerance", { ageMs });
    return NextResponse.json({ error: "Timestamp out of tolerance" }, { status: 401 });
  }

  // Verify HMAC signature
  const payloadToSign = `${timestamp}.${rawBody}`;
  const hmac = crypto.createHmac("sha256", PAYNOW_SIGNING_SECRET);
  hmac.update(payloadToSign);
  const expectedSignature = hmac.digest("base64");

  const providedSig = Buffer.from(signatureHeader, "base64");
  const expectedSig = Buffer.from(expectedSignature, "base64");

  if (providedSig.length !== expectedSig.length || !crypto.timingSafeEqual(providedSig, expectedSig)) {
    log("ERROR", requestId, "Invalid PayNow signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 4. Parse payload
  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    log("ERROR", requestId, "Invalid JSON in payload", { error: String(err) });
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = payload as Record<string, any>;
  const eventType = event.event_type ?? event.eventType ?? event.type;

  log("INFO", requestId, "Event received", { eventType });

  if (eventType !== "ON_ORDER_COMPLETED") {
    log("INFO", requestId, "Ignoring non-relevant event", { eventType });
    return NextResponse.json({ received: true, ignored: true });
  }

  // 5. Extract customer email (robust fallback chain)
  const customerEmail =
    event?.body?.billing_email ??
    event?.body?.customer?.email ??
    event?.body?.customer?.billing_email ??
    event?.customer?.email ??
    event?.user?.email ??
    event?.delivery_item?.metadata?.email ??
    event?.metadata?.email ??
    event?.billing_email;

  if (!customerEmail || typeof customerEmail !== "string" || !customerEmail.includes("@")) {
    log("ERROR", requestId, "No valid customer email found", {
      payloadPreview: JSON.stringify(payload).slice(0, 400),
    });
    return NextResponse.json({ received: true }, { status: 200 });
  }

  log("INFO", requestId, "Customer email extracted", { customerEmail });

  // 6. Connect to database & claim license key
  let db;
  try {
    db = await getDb();
  } catch (err) {
    log("ERROR", requestId, "MongoDB connection failed", { error: String(err) });
    return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  }

  const licenseKeys = db.collection("license_keys");

  let claimedKey: string | null = null;

  try {
    const result = await licenseKeys.findOneAndUpdate(
      { status: "unused" },
      {
        $set: {
          status: "sold",
          soldToEmail: customerEmail,
          soldAt: new Date(),
          paynowEventId: event?.event_id ?? null,
          paynowEventType: eventType,
          source: "paynow",
        },
      },
      { returnDocument: "after" }
    );

    if (result?.value && result.value.key) {
      claimedKey = result.value.key as string;
      log("INFO", requestId, "License key claimed", {
        keyId: result.value._id?.toString(),
        keyPreview: `${claimedKey.slice(0, 4)}...${claimedKey.slice(-4)}`,
      });
    } else {
      log("ERROR", requestId, "NO UNUSED LICENSE KEYS AVAILABLE", { customerEmail });
      // Still return 200 — we don't want PayNow retrying endlessly
      return NextResponse.json(
        { received: true, error: "No license keys available – manual action required" },
        { status: 200 }
      );
    }
  } catch (err) {
    log("ERROR", requestId, "Failed to claim license key", { error: String(err) });
    return NextResponse.json({ error: "License assignment failed" }, { status: 500 });
  }

  // 7. Send email via Resend
  const resend = new Resend(RESEND_API_KEY);

  try {
    log("INFO", requestId, "Sending license email", { to: customerEmail });

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: customerEmail,
      subject: `Your ${PRODUCT_NAME} License Key`,
      html: generateLicenseEmailHtml(claimedKey, PRODUCT_NAME),
      text: generateLicenseEmailText(claimedKey, PRODUCT_NAME),
    });

    if (error) {
      throw new Error(error.message);
    }

    log("INFO", requestId, "Email sent successfully", { resendId: data?.id });
  } catch (err) {
    log("ERROR", requestId, "Failed to send license email", { error: String(err) });
    // Still return 200 so PayNow doesn't retry — email failure is recoverable
    return NextResponse.json({ received: true, emailFailed: true }, { status: 200 });
  }

  log("INFO", requestId, "=== FULFILLMENT SUCCESS ===", {
    customerEmail,
    keyPreview: `${claimedKey.slice(0, 4)}...${claimedKey.slice(-4)}`,
  });

  return NextResponse.json({ received: true, fulfilled: true });
}
