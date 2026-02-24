"use client";

import { useEffect } from "react";
import Link from "next/link";
import BackgroundFX from "@/components/layout/BackgroundFX";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundFX />

      <Navbar />

      <main className="relative z-10 flex-1 pt-[var(--nav-height)]">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: '#020308' }} />
            
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '200px',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '300px',
                background: 'radial-gradient(ellipse at center, rgba(230, 42, 66, 0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute animate-glow-pulse"
              style={{
                left: '30%',
                top: '300px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.05) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
            <div
              className="absolute animate-glow-pulse"
              style={{
                left: '70%',
                top: '300px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.05) 0%, transparent 70%)',
                filter: 'blur(50px)',
                animationDelay: '2s',
              }}
            />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height)-200px)] w-full max-w-[1440px] flex-col items-center justify-center px-4 py-16 sm:px-8 lg:px-[96px]">
            <div
              className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full sm:h-[100px] sm:w-[100px]"
              style={{
                background: 'rgba(230, 42, 66, 0.1)',
                border: '1px solid rgba(230, 42, 66, 0.2)',
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="sm:h-[50px] sm:w-[50px]"
              >
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#e62a42"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1
              className="mb-4 text-center font-inter text-[28px] font-semibold leading-[1.2] tracking-[-0.56px] sm:text-[36px] sm:tracking-[-0.72px] lg:text-[48px] lg:tracking-[-0.96px]"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Something went wrong
            </h1>

            <p
              className="mb-2 max-w-[450px] text-center font-inter text-[15px] font-medium leading-[1.6] tracking-[-0.3px] sm:text-[17px] sm:tracking-[-0.34px]"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              An unexpected error occurred. Don&apos;t worry, our team has been notified.
            </p>

            {error.digest && (
              <p
                className="mb-8 font-ibm-plex-mono text-[12px] tracking-[-0.24px]"
                style={{ color: 'rgba(255, 255, 255, 0.3)' }}
              >
                Error ID: {error.digest}
              </p>
            )}

            {!error.digest && <div className="mb-8" />}

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center rounded-[20px] px-8 py-3 font-inter text-[15px] font-medium tracking-[-0.3px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(63,219,255,0.4)] active:scale-[0.98] sm:px-[48px] sm:py-[14px] sm:text-[17px] sm:tracking-[-0.34px]"
                style={{
                  background: '#3fdbff',
                  color: '#090909',
                  backdropFilter: 'blur(4px)',
                }}
              >
                Try again
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-[20px] px-8 py-3 font-inter text-[15px] font-medium tracking-[-0.3px] transition-all duration-300 hover:bg-[rgba(63,219,255,0.1)] sm:px-[48px] sm:py-[14px] sm:text-[17px] sm:tracking-[-0.34px]"
                style={{
                  background: 'transparent',
                  color: '#3fdbff',
                  border: '1px solid rgba(63, 219, 255, 0.2)',
                }}
              >
                Go home
              </Link>
            </div>

            <div className="mt-8">
              <a
                href="https://discord.gg/zentweaks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-inter text-[14px] font-medium tracking-[-0.28px] transition-opacity duration-200 hover:opacity-80"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                <span>Need help?</span>
                <span
                  className="underline decoration-dotted"
                  style={{
                    color: '#3fdbff',
                    textDecorationColor: 'rgba(63, 219, 255, 0.3)',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Join our Discord
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5"
                    stroke="#3fdbff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M7.5 1.5H10.5V4.5" stroke="#3fdbff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 7L10.5 1.5" stroke="#3fdbff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

