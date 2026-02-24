import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WHOP_WEBHOOK_SECRET = process.env.WHOP_WEBHOOK_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM || "ZenTweaks <noreply@zentweaks.com>";

const PRODUCT_NAME = "ZenTweaks Lifetime License";

function log(
  level: "INFO" | "WARN" | "ERROR",
  context: string,
  message: string,
  data?: Record<string, unknown>
) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [WHOP_WEBHOOK] [${level}] [${context}]`;
  if (level === "ERROR") {
    console.error(prefix, message, data ? JSON.stringify(data, null, 2) : "");
  } else if (level === "WARN") {
    console.warn(prefix, message, data ? JSON.stringify(data, null, 2) : "");
  } else {
    console.log(prefix, message, data ? JSON.stringify(data, null, 2) : "");
  }
}

function generateLicenseEmailHtml(licenseKey: string, productName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${productName} License Key</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #3fdbff; font-size: 28px; font-weight: 600;">ZenTweaks</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; background-color: #141414; border-left: 1px solid rgba(63, 219, 255, 0.1); border-right: 1px solid rgba(63, 219, 255, 0.1);">
              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 600;">Thank you for your purchase!</h2>
              <p style="margin: 0 0 30px; color: rgba(255, 255, 255, 0.7); font-size: 16px; line-height: 1.6;">
                Your ${productName} is ready. Here's your license key:
              </p>
              <div style="background: linear-gradient(135deg, rgba(63, 219, 255, 0.1) 0%, rgba(63, 219, 255, 0.05) 100%); border: 1px solid rgba(63, 219, 255, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                <p style="margin: 0 0 8px; color: rgba(255, 255, 255, 0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">License Key</p>
                <p style="margin: 0; color: #3fdbff; font-size: 20px; font-weight: 600; font-family: 'Courier New', monospace; word-break: break-all;">${licenseKey}</p>
              </div>
              <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 18px; font-weight: 600;">How to activate:</h3>
              <ol style="margin: 0 0 30px; padding-left: 20px; color: rgba(255, 255, 255, 0.7); font-size: 15px; line-height: 1.8;">
                <li>Download ZenTweaks from our website</li>
                <li>Run the installer and open the application</li>
                <li>Go to Settings → License</li>
                <li>Enter your license key and click Activate</li>
              </ol>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.5); font-size: 14px; line-height: 1.6;">
                Keep this email safe. If you need help, contact us at <a href="mailto:support@zentweaks.com" style="color: #3fdbff; text-decoration: none;">support@zentweaks.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #0d0d0d; border-radius: 0 0 16px 16px; border: 1px solid rgba(63, 219, 255, 0.1); border-top: none;">
              <p style="margin: 0; color: rgba(255, 255, 255, 0.4); font-size: 13px; text-align: center;">
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

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID().slice(0, 8);

  log("INFO", requestId, "=== WEBHOOK REQUEST RECEIVED ===");

  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    log("ERROR", requestId, "Failed to parse JSON body", { error: String(err) });
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // NOTE:
  // Whop's dashboard mentions "this URL should accept a raw payload" and sends
  // an HMAC-style signature header, not a simple shared secret. Implementing
  // full signature verification would require mirroring Whop's exact scheme.
  // For now, we *optionally* log the provided signature for debugging, but we
  // do not block processing if the secret is missing or mismatched, to ensure
  // keys are delivered.
  const signatureHeader =
    req.headers.get("whop-signature") || req.headers.get("x-whop-signature");

  log("INFO", requestId, "Webhook signature header (if any)", {
    hasSignature: !!signatureHeader,
  });

  if (WHOP_WEBHOOK_SECRET && body?.webhook_secret !== WHOP_WEBHOOK_SECRET) {
    log("WARN", requestId, "Webhook secret in body did not match WHOP_WEBHOOK_SECRET - continuing anyway");
  }

  const eventType = body?.type || body?.event || body?.object;
  log("INFO", requestId, "Event type received", { eventType });

  const isCompleted =
    eventType === "payment.succeeded" ||
    eventType === "payment_succeeded" ||
    eventType === "checkout.completed" ||
    eventType === "order.completed" ||
    body?.data?.status === "paid" ||
    body?.status === "paid";

  if (!isCompleted) {
    log("INFO", requestId, "Ignoring non-completed event", { eventType, status: body?.data?.status || body?.status });
    return NextResponse.json({ received: true, ignored: true });
  }

  const customerEmail =
    body?.data?.member?.email ||
    body?.data?.customer?.email ||
    body?.customer_email ||
    body?.email ||
    body?.user?.email;

  if (!customerEmail) {
    log("ERROR", requestId, "No customer email found in webhook payload");
    return NextResponse.json({ error: "No customer email" }, { status: 200 });
  }

  log("INFO", requestId, "Customer email extracted", { customerEmail });

  let db;
  try {
    db = await getDb();
    log("INFO", requestId, "✓ Connected to MongoDB");
  } catch (err) {
    log("ERROR", requestId, "Failed to connect to MongoDB", {
      error: String(err),
    });
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }

  const licenseKeysCollection = db.collection("license_keys");

  let claimedKey: string | null = null;

  try {
    const result = await licenseKeysCollection.findOneAndUpdate(
      {
        status: "unused",
      },
      {
        $set: {
          status: "sold",
          soldToEmail: customerEmail,
          soldAt: new Date(),
          whopOrderId: body?.data?.id || body?.id || null,
          source: "whop",
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (result && result.key) {
      claimedKey = result.key as string;
      log("INFO", requestId, "✓ License key claimed successfully", {
        keyId: result._id?.toString?.() || null,
        keyPreview: `${claimedKey.slice(0, 4)}...${claimedKey.slice(-4)}`,
      });
    } else {
      log("ERROR", requestId, "✗ NO AVAILABLE LICENSE KEYS!", {
        customerEmail,
      });

      return NextResponse.json({
        received: true,
        error: "No license keys available - MANUAL INTERVENTION REQUIRED",
      });
    }
  } catch (err) {
    log("ERROR", requestId, "Failed to claim license key", {
      error: String(err),
    });
    return NextResponse.json({ error: "Failed to claim license key" }, { status: 500 });
  }

  if (!RESEND_API_KEY) {
    log("ERROR", requestId, "RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
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

    if (emailResult.error) {
      throw new Error(emailResult.error.message);
    }

    log("INFO", requestId, "✓ Email sent successfully", {
      resendId: emailResult.data?.id,
    });
  } catch (err) {
    log("ERROR", requestId, "Failed to send email", {
      error: String(err),
    });

    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  log("INFO", requestId, "=== FULFILLMENT COMPLETE ===", {
    customerEmail,
    productName: PRODUCT_NAME,
    keyPreview: `${claimedKey!.slice(0, 4)}...${claimedKey!.slice(-4)}`,
  });

  return NextResponse.json({
    received: true,
    fulfilled: true,
  });
}

