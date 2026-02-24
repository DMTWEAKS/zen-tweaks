/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DASHBOARD_BG_TEXTURE = "/assets/figma/backgrounds/hero-texture.png";

function KeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 2L19 4M11.3891 11.6109C12.3844 12.6062 13 13.9812 13 15.5C13 18.5376 10.5376 21 7.5 21C4.46243 21 2 18.5376 2 15.5C2 12.4624 4.46243 10 7.5 10C9.01878 10 10.3938 10.6156 11.3891 11.6109ZM11.3891 11.6109L15.5 7.5M15.5 7.5L18.5 10.5L22 7L19 4M15.5 7.5L19 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface LicenseKey {
  id: string;
  key: string;
  status: "unused" | "sold";
  soldToEmail: string | null;
  soldAt: string | null;
  stripeSessionId: string | null;
  createdAt: string;
}

interface KeysResponse {
  keys: LicenseKey[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  counts: {
    unused: number;
    sold: number;
    total: number;
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [counts, setCounts] = useState({ unused: 0, sold: 0, total: 0 });
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 1 });
  const [filter, setFilter] = useState<"all" | "unused" | "sold">("all");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [newKeys, setNewKeys] = useState("");
  const [addingKeys, setAddingKeys] = useState(false);
  const [deletingKeys, setDeletingKeys] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchKeys = useCallback(async () => {
    try {
      const statusParam = filter === "all" ? "" : `&status=${filter}`;
      const res = await fetch(`/api/admin/keys?page=${pagination.page}&limit=${pagination.limit}${statusParam}`);
      
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch keys");
      }

      const data: KeysResponse = await res.json();
      setKeys(data.keys);
      setCounts(data.counts);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage({ type: "error", text: "Failed to load license keys" });
    } finally {
      setLoading(false);
    }
  }, [filter, pagination.page, pagination.limit, router]);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleAddKeys = async () => {
    if (!newKeys.trim()) return;

    setAddingKeys(true);
    setMessage(null);

    try {
      const keyList = newKeys
        .split(/[\n,]/)
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      const res = await fetch("/api/admin/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys: keyList }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Failed to add keys" });
      } else {
        setMessage({
          type: "success",
          text: `Added ${data.inserted} key(s)${data.duplicatesSkipped > 0 ? `, ${data.duplicatesSkipped} duplicate(s) skipped` : ""}`,
        });
        setNewKeys("");
        fetchKeys();
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setAddingKeys(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedKeys.size === 0) return;

    if (!confirm(`Are you sure you want to delete ${selectedKeys.size} key(s)?`)) {
      return;
    }

    setDeletingKeys(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/keys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedKeys) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Failed to delete keys" });
      } else {
        setMessage({ type: "success", text: `Deleted ${data.deleted} key(s)` });
        setSelectedKeys(new Set());
        fetchKeys();
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setDeletingKeys(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedKeys.size === keys.length) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(keys.map((k) => k.id)));
    }
  };

  const toggleSelectKey = (id: string) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedKeys(newSelected);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ background: "#020308" }}>
        <img
          src={DASHBOARD_BG_TEXTURE}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.04 }}
        />
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3fdbff] border-t-transparent" />
          <p className="font-inter text-[16px] font-medium" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#020308" }}>
      <img
        src={DASHBOARD_BG_TEXTURE}
        alt=""
        className="pointer-events-none fixed inset-0 h-full w-full object-cover"
        style={{ opacity: 0.04 }}
      />

      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div
          className="absolute animate-glow-pulse"
          style={{
            left: "5%",
            top: "10%",
            width: "400px",
            height: "300px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute animate-glow-pulse"
          style={{
            right: "10%",
            top: "30%",
            width: "350px",
            height: "280px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "30%",
            bottom: "10%",
            width: "500px",
            height: "300px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "20%",
            bottom: "20%",
            width: "300px",
            height: "250px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(2, 3, 8, 0.85)",
          borderColor: "rgba(63, 219, 255, 0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-1">
              <span className="font-inter text-[22px] font-bold tracking-[-0.44px]" style={{ color: "#3fdbff" }}>
                Zen
              </span>
              <span className="font-inter text-[22px] font-bold tracking-[-0.44px] text-white">
                Tweaks
              </span>
            </Link>

            <div className="h-6 w-px" style={{ background: "rgba(63, 219, 255, 0.15)" }} />

            <div className="flex items-center gap-3">
              <h1
                className="font-inter text-[18px] font-semibold tracking-[-0.36px]"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-[10px] px-4 py-2.5 font-inter text-[14px] font-medium tracking-[-0.28px] transition-all duration-300 hover:bg-white/5"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              <ExternalLinkIcon />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="group/logout flex items-center gap-2 rounded-[12px] px-4 py-2.5 font-inter text-[14px] font-medium tracking-[-0.28px] transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                e.currentTarget.style.color = "#f87171";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
              }}
            >
              <LogOutIcon />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1400px] px-6 py-8">
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            className="group relative overflow-hidden rounded-[20px] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(63,219,255,0.1)]"
            style={{
              background: "linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)",
              border: "1px solid rgba(63, 219, 255, 0.1)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.15) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.5px]" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                  Total Keys
                </p>
                <p
                  className="mt-2 font-inter text-[36px] font-bold tracking-[-0.72px]"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {counts.total}
                </p>
              </div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[14px]"
                style={{
                  background: "rgba(63, 219, 255, 0.1)",
                  border: "1px solid rgba(63, 219, 255, 0.15)",
                  color: "#3fdbff",
                }}
              >
                <KeyIcon />
              </div>
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-[20px] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
            style={{
              background: "linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)",
              border: "1px solid rgba(34, 197, 94, 0.15)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.5px]" style={{ color: "rgba(34, 197, 94, 0.7)" }}>
                  Available
                </p>
                <p className="mt-2 font-inter text-[36px] font-bold tracking-[-0.72px]" style={{ color: "#22c55e" }}>
                  {counts.unused}
                </p>
              </div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[14px]"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                  color: "#22c55e",
                }}
              >
                <CheckCircleIcon />
              </div>
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-[20px] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(63,219,255,0.15)]"
            style={{
              background: "linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)",
              border: "1px solid rgba(63, 219, 255, 0.15)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.2) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.5px]" style={{ color: "rgba(63, 219, 255, 0.7)" }}>
                  Sold
                </p>
                <p className="mt-2 font-inter text-[36px] font-bold tracking-[-0.72px]" style={{ color: "#3fdbff" }}>
                  {counts.sold}
                </p>
              </div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[14px]"
                style={{
                  background: "rgba(63, 219, 255, 0.1)",
                  border: "1px solid rgba(63, 219, 255, 0.2)",
                  color: "#3fdbff",
                }}
              >
                <ShoppingBagIcon />
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div
            className="mb-6 flex items-center gap-3 rounded-[14px] px-5 py-4 font-inter text-[14px] font-medium"
            style={{
              background: message.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(255, 68, 68, 0.1)",
              border: `1px solid ${message.type === "success" ? "rgba(34, 197, 94, 0.25)" : "rgba(255, 68, 68, 0.25)"}`,
              color: message.type === "success" ? "#22c55e" : "#ff6b6b",
            }}
          >
            {message.type === "success" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            {message.text}
          </div>
        )}

        <div
          className="relative mb-8 overflow-hidden rounded-[20px] p-6"
          style={{
            background: "linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)",
            border: "1px solid rgba(63, 219, 255, 0.1)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-40 w-40"
            style={{
              background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[12px]"
                style={{
                  background: "rgba(63, 219, 255, 0.1)",
                  border: "1px solid rgba(63, 219, 255, 0.15)",
                  color: "#3fdbff",
                }}
              >
                <PlusIcon />
              </div>
              <div>
                <h2
                  className="font-inter text-[18px] font-semibold tracking-[-0.36px]"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Add License Keys
                </h2>
                <p className="font-inter text-[13px] font-medium" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                  Paste keys below, one per line or comma-separated
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <textarea
                value={newKeys}
                onChange={(e) => setNewKeys(e.target.value)}
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX&#10;YYYYY-YYYYY-YYYYY-YYYYY"
                rows={4}
                className="flex-1 resize-none rounded-[14px] px-5 py-4 font-ibm-plex-mono text-[14px] font-medium text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#3fdbff]/40 focus:shadow-[0_0_30px_rgba(63,219,255,0.1)]"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              />
              <button
                onClick={handleAddKeys}
                disabled={addingKeys || !newKeys.trim()}
                className="flex h-fit shrink-0 items-center justify-center gap-2 rounded-[14px] px-8 py-4 font-inter text-[15px] font-semibold tracking-[-0.3px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(63,219,255,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 lg:self-end"
                style={{
                  background: "#3fdbff",
                  color: "#090909",
                }}
              >
                {addingKeys ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <PlusIcon />
                    Add Keys
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[20px]"
          style={{
            background: "linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)",
            border: "1px solid rgba(63, 219, 255, 0.1)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-40 w-40"
            style={{
              background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5" style={{ borderColor: "rgba(63, 219, 255, 0.08)" }}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[12px]"
                  style={{
                    background: "rgba(63, 219, 255, 0.1)",
                    border: "1px solid rgba(63, 219, 255, 0.15)",
                    color: "#3fdbff",
                  }}
                >
                  <KeyIcon />
                </div>
                <h2
                  className="font-inter text-[18px] font-semibold tracking-[-0.36px]"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  License Keys
                </h2>
              </div>
              
              <div
                className="flex gap-1 rounded-[12px] p-1"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                {(["all", "unused", "sold"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setPagination((p) => ({ ...p, page: 1 }));
                    }}
                    className="rounded-[10px] px-4 py-2 font-inter text-[13px] font-semibold capitalize transition-all duration-300"
                    style={{
                      background: filter === f ? "rgba(63, 219, 255, 0.15)" : "transparent",
                      color: filter === f ? "#3fdbff" : "rgba(255, 255, 255, 0.4)",
                      boxShadow: filter === f ? "0 0 20px rgba(63, 219, 255, 0.1)" : "none",
                    }}
                  >
                    {f === "all" ? "All" : f === "unused" ? "Available" : "Sold"}
                  </button>
                ))}
              </div>
            </div>

            {selectedKeys.size > 0 && (
              <button
                onClick={handleDeleteSelected}
                disabled={deletingKeys}
                className="flex items-center gap-2 rounded-[12px] px-4 py-2.5 font-inter text-[13px] font-semibold transition-all duration-300 hover:bg-red-500/20 disabled:opacity-50"
                style={{
                  background: "rgba(255, 68, 68, 0.1)",
                  border: "1px solid rgba(255, 68, 68, 0.25)",
                  color: "#ff6b6b",
                }}
              >
                <TrashIcon />
                {deletingKeys ? "Deleting..." : `Delete ${selectedKeys.size} selected`}
              </button>
            )}
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={keys.length > 0 && selectedKeys.size === keys.length}
                      onChange={toggleSelectAll}
                      className="admin-checkbox"
                    />
                  </th>
                  <th className="px-6 py-4 text-left font-inter text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "rgba(255, 255, 255, 0.35)" }}>
                    License Key
                  </th>
                  <th className="px-6 py-4 text-left font-inter text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "rgba(255, 255, 255, 0.35)" }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-inter text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "rgba(255, 255, 255, 0.35)" }}>
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left font-inter text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "rgba(255, 255, 255, 0.35)" }}>
                    Sold Date
                  </th>
                  <th className="px-6 py-4 text-left font-inter text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "rgba(255, 255, 255, 0.35)" }}>
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {keys.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-[16px]"
                          style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            color: "rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <KeyIcon />
                        </div>
                        <p className="font-inter text-[15px] font-medium" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          No license keys found
                        </p>
                        <p className="font-inter text-[13px]" style={{ color: "rgba(255, 255, 255, 0.25)" }}>
                          Add some keys above to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  keys.map((key) => (
                    <tr
                      key={key.id}
                      className="group border-t transition-all duration-200 hover:bg-[#3fdbff]/[0.02]"
                      style={{ borderColor: "rgba(255, 255, 255, 0.04)" }}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedKeys.has(key.id)}
                          onChange={() => toggleSelectKey(key.id)}
                          className="admin-checkbox"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <code
                          className="rounded-[8px] px-3 py-1.5 font-ibm-plex-mono text-[13px] font-medium transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(63,219,255,0.1)]"
                          style={{
                            background: "rgba(63, 219, 255, 0.08)",
                            border: "1px solid rgba(63, 219, 255, 0.12)",
                            color: "#3fdbff",
                          }}
                        >
                          {key.key}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter text-[12px] font-semibold"
                          style={{
                            background: key.status === "unused" ? "rgba(34, 197, 94, 0.1)" : "rgba(63, 219, 255, 0.1)",
                            border: `1px solid ${key.status === "unused" ? "rgba(34, 197, 94, 0.2)" : "rgba(63, 219, 255, 0.2)"}`,
                            color: key.status === "unused" ? "#22c55e" : "#3fdbff",
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: key.status === "unused" ? "#22c55e" : "#3fdbff" }}
                          />
                          {key.status === "unused" ? "Available" : "Sold"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-inter text-[13px] font-medium" style={{ color: key.soldToEmail ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.25)" }}>
                        {key.soldToEmail || "—"}
                      </td>
                      <td className="px-6 py-4 font-inter text-[13px]" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                        {formatDate(key.soldAt)}
                      </td>
                      <td className="px-6 py-4 font-inter text-[13px]" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                        {formatDate(key.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden">
            {keys.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-[16px]"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      color: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <KeyIcon />
                  </div>
                  <p className="font-inter text-[15px] font-medium" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                    No license keys found
                  </p>
                  <p className="font-inter text-[13px]" style={{ color: "rgba(255, 255, 255, 0.25)" }}>
                    Add some keys above to get started
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "rgba(255, 255, 255, 0.04)" }}>
                <div className="flex items-center gap-3 px-4 py-3" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                  <input
                    type="checkbox"
                    checked={keys.length > 0 && selectedKeys.size === keys.length}
                    onChange={toggleSelectAll}
                    className="admin-checkbox"
                  />
                  <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.5px]" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                    Select All
                  </span>
                </div>

                {keys.map((key) => (
                  <div
                    key={key.id}
                    className="p-4 transition-all duration-200"
                    style={{ borderColor: "rgba(255, 255, 255, 0.04)" }}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedKeys.has(key.id)}
                        onChange={() => toggleSelectKey(key.id)}
                        className="admin-checkbox mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <code
                            className="rounded-[8px] px-3 py-1.5 font-ibm-plex-mono text-[12px] font-medium break-all"
                            style={{
                              background: "rgba(63, 219, 255, 0.08)",
                              border: "1px solid rgba(63, 219, 255, 0.12)",
                              color: "#3fdbff",
                            }}
                          >
                            {key.key}
                          </code>
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter text-[11px] font-semibold"
                            style={{
                              background: key.status === "unused" ? "rgba(34, 197, 94, 0.1)" : "rgba(63, 219, 255, 0.1)",
                              border: `1px solid ${key.status === "unused" ? "rgba(34, 197, 94, 0.2)" : "rgba(63, 219, 255, 0.2)"}`,
                              color: key.status === "unused" ? "#22c55e" : "#3fdbff",
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: key.status === "unused" ? "#22c55e" : "#3fdbff" }}
                            />
                            {key.status === "unused" ? "Available" : "Sold"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {key.soldToEmail && (
                            <div className="col-span-2">
                              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] mb-0.5" style={{ color: "rgba(255, 255, 255, 0.3)" }}>
                                Customer
                              </p>
                              <p className="font-inter text-[13px] font-medium truncate" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                {key.soldToEmail}
                              </p>
                            </div>
                          )}
                          {key.soldAt && (
                            <div>
                              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] mb-0.5" style={{ color: "rgba(255, 255, 255, 0.3)" }}>
                                Sold
                              </p>
                              <p className="font-inter text-[12px]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                {formatDate(key.soldAt)}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] mb-0.5" style={{ color: "rgba(255, 255, 255, 0.3)" }}>
                              Created
                            </p>
                            <p className="font-inter text-[12px]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                              {formatDate(key.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-6 py-5" style={{ borderColor: "rgba(63, 219, 255, 0.08)" }}>
              <p className="font-inter text-[13px] font-medium" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                Showing <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{" "}
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{pagination.total}</span> keys
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="flex items-center gap-1.5 rounded-[10px] px-4 py-2 font-inter text-[13px] font-semibold transition-all duration-300 hover:bg-white/5 disabled:opacity-30"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </button>
                <button
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="flex items-center gap-1.5 rounded-[10px] px-4 py-2 font-inter text-[13px] font-semibold transition-all duration-300 hover:bg-white/5 disabled:opacity-30"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
