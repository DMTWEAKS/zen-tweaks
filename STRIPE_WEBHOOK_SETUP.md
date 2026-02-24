# Stripe Payment Link Fulfillment Setup

This document explains how to set up and test the Stripe webhook for automatic license key delivery.

## Environment Variables

Add these to your `.env.local` file:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zentweaks?retryWrites=true&w=majority

# Stripe
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXX

# Resend (Email)
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXX
EMAIL_FROM=ZenTweaks <noreply@yourdomain.com>
```

## MongoDB Collections

The webhook uses two collections:

### `license_keys`
```javascript
{
  _id: ObjectId,
  key: "XXXXX-XXXXX-XXXXX-XXXXX",  // The license key
  status: "unused" | "sold",
  soldToEmail: "customer@example.com",  // Set when sold
  soldAt: ISODate,                       // Set when sold
  stripeSessionId: "cs_XXXXX",          // Set when sold
  stripeEventId: "evt_XXXXX",           // Set when sold
  stripePriceId: "price_XXXXX",         // Set when sold
  createdAt: ISODate
}
```

### `stripe_fulfillments`
```javascript
{
  _id: ObjectId,
  stripeEventId: "evt_XXXXX",
  stripeSessionId: "cs_XXXXX",
  customerEmail: "customer@example.com",
  licenseKeyPreview: "XXXX...XXXX",
  productName: "ZenTweaks Lifetime License",
  priceId: "price_XXXXX",
  status: "completed" | "email_failed" | "no_keys_available",
  createdAt: ISODate
}
```

## Seeding License Keys

Before testing, you need license keys in the database:

```bash
# Set your MongoDB URI
export MONGODB_URI="your-mongodb-uri"

# Run the seeder (generates 10 keys)
npx ts-node --skip-project lib/seed-license-keys.ts
```

Or manually insert via MongoDB shell:
```javascript
db.license_keys.insertMany([
  { key: "XXXXX-XXXXX-XXXXX-XXXXX", status: "unused", createdAt: new Date() },
  { key: "YYYYY-YYYYY-YYYYY-YYYYY", status: "unused", createdAt: new Date() },
])
```

## Local Development Testing

### 1. Install Stripe CLI

Download from: https://stripe.com/docs/stripe-cli

Or via package managers:
```bash
# Windows (scoop)
scoop install stripe

# macOS
brew install stripe/stripe-cli/stripe

# Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

### 2. Login to Stripe CLI

```bash
stripe login
```

### 3. Start your Next.js dev server

```bash
npm run dev
```

### 4. Forward webhooks to localhost

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will output a webhook signing secret like:
```
> Ready! Your webhook signing secret is whsec_XXXXX (^C to quit)
```

**Use this `whsec_XXXXX` as your `STRIPE_WEBHOOK_SECRET` in `.env.local` for local testing.**

### 5. Trigger a test event

In a new terminal:

```bash
# Trigger a checkout.session.completed event
stripe trigger checkout.session.completed
```

Or make a real test purchase using Stripe test mode.

### 6. Watch the logs

Your terminal running `npm run dev` will show detailed logs like:

```
[2024-01-15T10:30:00.000Z] [STRIPE_WEBHOOK] [INFO] [abc123] === WEBHOOK REQUEST RECEIVED ===
[2024-01-15T10:30:00.001Z] [STRIPE_WEBHOOK] [INFO] [abc123] ✓ Signature verification SUCCESSFUL
[2024-01-15T10:30:00.002Z] [STRIPE_WEBHOOK] [INFO] [abc123] === EVENT DETAILS ===
...
[2024-01-15T10:30:00.500Z] [STRIPE_WEBHOOK] [INFO] [abc123] === FULFILLMENT COMPLETE ===
```

## Production Setup

### 1. Create Webhook Endpoint in Stripe Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your production URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen to: `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`)
7. Add it to your production environment as `STRIPE_WEBHOOK_SECRET`

### 2. Configure Price ID Mapping (Optional)

If you have multiple products, update the `PRICE_ID_TO_PRODUCT` map in `app/api/stripe/webhook/route.ts`:

```typescript
const PRICE_ID_TO_PRODUCT: Record<string, string> = {
  "price_1XXXXXXXXXXXXXX": "ZenTweaks Lifetime License",
  "price_2XXXXXXXXXXXXXX": "ZenTweaks Pro License",
  default: "ZenTweaks License",
};
```

## Troubleshooting

### "Invalid signature" error
- Make sure you're using the correct `STRIPE_WEBHOOK_SECRET`
- For local testing, use the secret from `stripe listen` output
- For production, use the secret from the Stripe Dashboard webhook endpoint

### "No license keys available" 
- Seed more license keys into the database
- Check that keys have `status: "unused"`

### Email not sending
- Verify `RESEND_API_KEY` is correct
- Check that `EMAIL_FROM` domain is verified in Resend
- Check Resend dashboard for delivery logs

### Webhook not receiving events
- Verify the endpoint URL is correct
- Check that `checkout.session.completed` event is selected
- For local testing, ensure `stripe listen` is running

## Response Codes

The webhook returns different status codes:

| Code | Meaning |
|------|---------|
| 200 | Success, or handled/ignored event |
| 400 | Invalid signature or missing data |
| 500 | Internal error (Stripe will retry) |

Stripe will retry failed webhooks (5xx responses) with exponential backoff for up to 3 days.
