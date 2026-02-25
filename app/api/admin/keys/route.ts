import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    return !!token && token.length === 64;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const collection = db.collection("license_keys");

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (status && (status === "unused" || status === "sold")) {
      filter.status = status;
    }

    // Default sort: newest first. For sold keys, prefer most recently sold.
    const sort: Record<string, 1 | -1> =
      filter.status === "sold"
        ? { soldAt: -1, createdAt: -1 }
        : { createdAt: -1 };

    const [keys, total] = await Promise.all([
      collection
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(filter),
    ]);

    const [unusedCount, soldCount] = await Promise.all([
      collection.countDocuments({ status: "unused" }),
      collection.countDocuments({ status: "sold" }),
    ]);

    return NextResponse.json({
      keys: keys.map((k) => ({
        id: k._id.toString(),
        key: k.key,
        status: k.status,
        soldToEmail: k.soldToEmail || null,
        soldAt: k.soldAt || null,
        stripeSessionId: k.stripeSessionId || null,
        createdAt: k.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      counts: {
        unused: unusedCount,
        sold: soldCount,
        total: unusedCount + soldCount,
      },
    });
  } catch (error) {
    console.error("[ADMIN_KEYS] List error:", error);
    return NextResponse.json({ error: "Failed to fetch keys" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { keys } = body;

    if (!keys) {
      return NextResponse.json({ error: "Keys required" }, { status: 400 });
    }

    const keyArray = Array.isArray(keys) ? keys : [keys];
    
    if (keyArray.length === 0) {
      return NextResponse.json({ error: "At least one key required" }, { status: 400 });
    }

    const validKeys = keyArray.filter((k) => typeof k === "string" && k.trim().length > 0);
    
    if (validKeys.length === 0) {
      return NextResponse.json({ error: "No valid keys provided" }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection("license_keys");

    const existingKeys = await collection
      .find({ key: { $in: validKeys } })
      .toArray();
    
    const existingKeySet = new Set(existingKeys.map((k) => k.key));
    const newKeys = validKeys.filter((k) => !existingKeySet.has(k));

    if (newKeys.length === 0) {
      return NextResponse.json({ 
        error: "All keys already exist",
        duplicates: validKeys.length,
      }, { status: 400 });
    }

    const documents = newKeys.map((key) => ({
      key: key.trim(),
      status: "unused",
      createdAt: new Date(),
    }));

    const result = await collection.insertMany(documents);

    console.log(`[ADMIN_KEYS] Added ${result.insertedCount} new keys`);

    return NextResponse.json({
      success: true,
      inserted: result.insertedCount,
      duplicatesSkipped: validKeys.length - newKeys.length,
    });
  } catch (error) {
    console.error("[ADMIN_KEYS] Add error:", error);
    return NextResponse.json({ error: "Failed to add keys" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Key IDs required" }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection("license_keys");

    const objectIds = ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    if (objectIds.length === 0) {
      return NextResponse.json({ error: "No valid IDs provided" }, { status: 400 });
    }

    const result = await collection.deleteMany({
      _id: { $in: objectIds },
    });

    console.log(`[ADMIN_KEYS] Deleted ${result.deletedCount} keys`);

    return NextResponse.json({
      success: true,
      deleted: result.deletedCount,
    });
  } catch (error) {
    console.error("[ADMIN_KEYS] Delete error:", error);
    return NextResponse.json({ error: "Failed to delete keys" }, { status: 500 });
  }
}
