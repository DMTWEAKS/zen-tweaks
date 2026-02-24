/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LOGIN_BG_TEXTURE = "/assets/figma/backgrounds/hero-texture.png";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4" style={{ background: "#020308" }}>
      <img
        src={LOGIN_BG_TEXTURE}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.06 }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute animate-glow-pulse"
          style={{
            left: "10%",
            top: "15%",
            width: "300px",
            height: "250px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute animate-glow-pulse"
          style={{
            right: "10%",
            top: "20%",
            width: "280px",
            height: "230px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "500px",
            height: "400px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "20%",
            bottom: "10%",
            width: "250px",
            height: "200px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "15%",
            bottom: "15%",
            width: "220px",
            height: "180px",
            background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative w-full max-w-[440px]">
        <div className="mb-10 text-center">
          <Link href="/" className="mb-2 inline-block">
            <span
              className="font-inter text-[28px] font-bold tracking-[-0.56px]"
              style={{ color: "#3fdbff" }}
            >
              Zen
            </span>
            <span
              className="font-inter text-[28px] font-bold tracking-[-0.56px]"
              style={{ color: "#ffffff" }}
            >
              Tweaks
            </span>
          </Link>

          <div className="mt-2 flex flex-col items-center gap-4">
            <div>
              <h1
                className="font-inter text-[32px] font-semibold leading-tight tracking-[-0.64px]"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Admin Access
              </h1>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[20px] p-8"
          style={{
            background: "linear-gradient(180deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)",
            border: "1px solid rgba(63, 219, 255, 0.1)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(63, 219, 255, 0.05)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2"
            style={{
              background: "radial-gradient(ellipse at center, rgba(63, 219, 255, 0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {error && (
            <div
              className="relative mb-6 rounded-[12px] px-4 py-3 font-inter text-[14px] font-medium"
              style={{
                background: "rgba(255, 68, 68, 0.1)",
                border: "1px solid rgba(255, 68, 68, 0.3)",
                color: "#ff6b6b",
              }}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 5.33333V8M8 10.6667H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#ff6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="relative mb-5">
            <label
              htmlFor="username"
              className="mb-2 block font-inter text-[13px] font-semibold uppercase tracking-[0.5px]"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-[12px] px-4 py-3.5 font-inter text-[15px] font-medium tracking-[-0.3px] text-white outline-none transition-all duration-300 focus:border-[#3fdbff]/50 focus:shadow-[0_0_20px_rgba(63,219,255,0.15)]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              placeholder="Enter your username"
            />
          </div>

          <div className="relative mb-8">
            <label
              htmlFor="password"
              className="mb-2 block font-inter text-[13px] font-semibold uppercase tracking-[0.5px]"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-[12px] px-4 py-3.5 font-inter text-[15px] font-medium tracking-[-0.3px] text-white outline-none transition-all duration-300 focus:border-[#3fdbff]/50 focus:shadow-[0_0_20px_rgba(63,219,255,0.15)]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[16px] py-4 font-inter text-[16px] font-semibold tracking-[-0.32px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(63,219,255,0.5)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: "#3fdbff",
              color: "#090909",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-[14px] font-medium tracking-[-0.28px] transition-all duration-300 hover:text-[#3fdbff]"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to ZenTweaks
          </Link>
        </div>
      </div>
    </div>
  );
}
