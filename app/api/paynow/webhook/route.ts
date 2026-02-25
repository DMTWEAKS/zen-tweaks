import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { Resend } from "resend";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAYNOW_SIGNING_SECRET = process.env.PAYNOW_SIGNING_SECRET!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM || "ZenTweaks <noreply@zentweaks.com>";

const PRODUCT_NAME = "ZenTweaks Lifetime License";
const TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes

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
<html>
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
                <li>Download ZenTweaks from our setup guide: <a href="https://zen-tweaks.gitbook.io/zen-tweaks-setup-guide/" style="color:#3fdbff;">https://zen-tweaks.gitbook.io/zen-tweaks-setup-guide/</a></li>
                <li>Run the installer and open the application</li>
                <li>Go to Settings → License</li>
                <li>Enter your license key and click Activate</li>
              </ol>
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;">
                For enhanced support, join our Discord and open a ticket with your proof of purchase: <a href="https://discord.gg/zentweaks" style="color:#3fdbff;">https://discord.gg/zentweaks</a><br>
                Keep this email safe. Contact support at <a href="mailto:support@zentweaks.com" style="color:#3fdbff;text-decoration:none;">support@zentweaks.com</a>
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
1. Download ZenTweaks from our setup guide: https://zen-tweaks.gitbook.io/zen-tweaks-setup-guide/
2. Run the installer and open the application
3. Go to Settings → License
4. Enter your license key and click Activate

For enhanced support: Join our Discord: https://discord.gg/zentweaks

Keep this email safe. Contact support at support@zentweaks.com

© ${new Date().getFullYear()} ZenTweaks. All rights reserved.
  `.trim();
}

// ────────────────────────────────────────────────
// Webhook handler
// ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID().slice(0, 8);
  log("INFO", requestId, "=== WEBHOOK REQUEST RECEIVED ===");

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    log("ERROR", requestId, "Failed to read raw body", { error: String(err) });
    return NextResponse.json({ error: "Failed to read body" }, { status: 400 });
  }

  if (!PAYNOW_SIGNING_SECRET) {
    log("ERROR", requestId, "PAYNOW_SIGNING_SECRET not configured");
    return NextResponse.json({ error: "Signing secret not configured" }, { status: 500 });
  }

  const timestampHeader = req.headers.get("paynow-timestamp");
  const signatureHeader = req.headers.get("paynow-signature");

  if (!timestampHeader || !signatureHeader) {
    log("ERROR", requestId, "Missing PayNow signature headers");
    return NextResponse.json({ error: "Missing signature headers" }, { status: 400 });
  }

  const timestampInt = Number(timestampHeader);
  if (!Number.isFinite(timestampInt)) {
    log("ERROR", requestId, "Invalid timestamp format", { timestampHeader });
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
  }

  const now = Date.now();
  if (Math.abs(now - timestampInt) > TOLERANCE_MS) {
    log("WARN", requestId, "Timestamp out of tolerance", {
      timestampInt,
      now,
      diffMs: now - timestampInt,
    });
    return NextResponse.json({ error: "Timestamp out of tolerance" }, { status: 401 });
  }

  // Verify signature
  const payloadWithTimestamp = `${timestampHeader}.${rawBody}`;
  const hmac = crypto.createHmac("sha256", PAYNOW_SIGNING_SECRET);
  hmac.update(payloadWithTimestamp);
  const expectedSignature = hmac.digest("base64");

  const providedSigBuf = Buffer.from(signatureHeader, "base64");
  const expectedSigBuf = Buffer.from(expectedSignature, "base64");

  if (
    providedSigBuf.length !== expectedSigBuf.length ||
    !crypto.timingSafeEqual(providedSigBuf, expectedSigBuf)
  ) {
    log("ERROR", requestId, "Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch (err) {
    log("ERROR", requestId, "Failed to parse JSON body", { error: String(err) });
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = body as any;
  const eventType: string | undefined = event?.event_type || event?.eventType || event?.type;
  log("INFO", requestId, "Event type received", { eventType });

  if (eventType !== "ON_ORDER_COMPLETED") {
    log("INFO", requestId, "Ignoring non-order-completed event", { eventType });
    return NextResponse.json({ received: true, ignored: true });
  }

  const customerEmail: string | undefined =
    event?.body?.billing_email ||
    event?.body?.customer?.email ||
    event?.body?.customer?.billing_email ||
    event?.customer?.email ||
    event?.user?.email ||
    event?.delivery_item?.metadata?.email ||
    event?.metadata?.email;

  if (!customerEmail) {
    log("ERROR", requestId, "No customer email found", { bodyPreview: JSON.stringify(body).slice(0, 500) });
    return NextResponse.json({ error: "No customer email" }, { status: 200 });
  }

  log("INFO", requestId, "Customer email extracted", { customerEmail });

  let db;
  try {
    db = await getDb();
    log("INFO", requestId, "✓ Connected to MongoDB");
  } catch (err) {
    log("ERROR", requestId, "Failed to connect to MongoDB", { error: String(err) });
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }

  const licenseKeysCollection = db.collection("license_keys");

  let claimedKey: string | null = null;

  try {
    const result = await licenseKeysCollection.findOneAndUpdate(
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

    // Handle MongoDB response safely
    const updatedDoc = result.value ?? null;
    if (updatedDoc?.key) {
      claimedKey = updatedDoc.key as string;
      log("INFO", requestId, "✓ License key claimed successfully", {
        keyId: updatedDoc._id?.toString() || null,
        keyPreview: `${claimedKey.slice(0, 4)}...${claimedKey.slice(-4)}`,
      });
    } else {
      log("ERROR", requestId, "✗ NO AVAILABLE LICENSE KEYS!", { customerEmail });
      return NextResponse.json(
        { received: true, error: "No license keys available - MANUAL INTERVENTION REQUIRED" },
        { status: 200 }
      );
    }
  } catch (err) {
    log("ERROR", requestId, "Failed to claim license key", { error: String(err) });
    return NextResponse.json({ error: "Failed to claim license key" }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    log("INFO", requestId, "Sending license email...", {
      to: customerEmail,
      from: EMAIL_FROM,
      subject: `Your ${PRODUCT_NAME} License Key`,
    });

    const emailResult = await resend.emails.send({
      from: EMAIL_FROM,
      to: customerEmail,
      subject: `Your ${PRODUCT_NAME} License Key`,
      html: generateLicenseEmailHtml(claimedKey!, PRODUCT_NAME),
      text: generateLicenseEmailText(claimedKey!, PRODUCT_NAME),
    });

    if (emailResult.error) throw new Error(emailResult.error.message);

    log("INFO", requestId, "✓ Email sent successfully", { resendId: emailResult.data?.id });
  } catch (err) {
    log("ERROR", requestId, "Failed to send email", { error: String(err) });
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  log("INFO", requestId, "=== FULFILLMENT COMPLETE ===", {
    customerEmail,
    productName: PRODUCT_NAME,
    keyPreview: `${claimedKey!.slice(0, 4)}...${claimedKey!.slice(-4)}`,
  });

  return NextResponse.json({ received: true, fulfilled: true });
}
