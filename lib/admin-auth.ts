import { cookies } from "next/headers";

const sessions = new Map<string, { username: string; expiresAt: number }>();

export { sessions };

export async function verifyAdminSession(): Promise<{ authenticated: boolean; username?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return { authenticated: false };
    }

    const session = sessions.get(token);

    if (!session || session.expiresAt < Date.now()) {
      if (session) {
        sessions.delete(token);
      }
      return { authenticated: false };
    }

    return { authenticated: true, username: session.username };
  } catch {
    return { authenticated: false };
  }
}
