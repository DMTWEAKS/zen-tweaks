import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");

const SESSION_DURATION_MS = 168 * 60 * 60 * 1000;

interface SessionData {
  username: string;
  createdAt: number;
  expiresAt: number;
}

const sessions = new Map<string, SessionData>();

function createSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function hashPassword(password: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(password).digest("hex");
}

// POST /api/admin/auth - Login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!ADMIN_PASSWORD) {
      console.error("[ADMIN_AUTH] ADMIN_PASSWORD not configured");
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.log(`[ADMIN_AUTH] Failed login attempt for username: ${username}`);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createSessionToken();
    const now = Date.now();
    const sessionData: SessionData = {
      username,
      createdAt: now,
      expiresAt: now + SESSION_DURATION_MS,
    };

    sessions.set(token, sessionData);

    console.log(`[ADMIN_AUTH] Successful login for: ${username}`);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION_MS / 1000,
      path: "/",
    });

    return NextResponse.json({ success: true, username });
  } catch (error) {
    console.error("[ADMIN_AUTH] Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = sessions.get(token);

    if (!session || session.expiresAt < Date.now()) {
      if (session) {
        sessions.delete(token);
      }
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ 
      authenticated: true, 
      username: session.username 
    });
  } catch (error) {
    console.error("[ADMIN_AUTH] Session check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (token) {
      sessions.delete(token);
    }

    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ADMIN_AUTH] Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
