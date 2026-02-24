"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            background: '#020308',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '400px',
              background: 'radial-gradient(ellipse at center, rgba(230, 42, 66, 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(230, 42, 66, 0.1)',
              border: '1px solid rgba(230, 42, 66, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
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
            style={{
              fontSize: '36px',
              fontWeight: 600,
              letterSpacing: '-0.72px',
              marginBottom: '16px',
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Critical Error
          </h1>

          <p
            style={{
              fontSize: '17px',
              fontWeight: 500,
              letterSpacing: '-0.34px',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '450px',
              lineHeight: 1.6,
              marginBottom: '8px',
            }}
          >
            A critical error occurred while loading the application.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: '12px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'rgba(255, 255, 255, 0.3)',
                marginBottom: '32px',
              }}
            >
              Error ID: {error.digest}
            </p>
          )}

          {!error.digest && <div style={{ marginBottom: '32px' }} />}

          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 48px',
                background: '#3fdbff',
                color: '#090909',
                fontSize: '17px',
                fontWeight: 500,
                letterSpacing: '-0.34px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(63, 219, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Try again
            </button>

            <button
              onClick={() => window.location.href = '/'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 48px',
                background: 'transparent',
                color: '#3fdbff',
                fontSize: '17px',
                fontWeight: 500,
                letterSpacing: '-0.34px',
                borderRadius: '20px',
                border: '1px solid rgba(63, 219, 255, 0.2)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(63, 219, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Go home
            </button>
          </div>

          <a
            href="https://discord.gg/zentweaks"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
            }}
          >
            <span>Need help?</span>
            <span
              style={{
                color: '#3fdbff',
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                textUnderlineOffset: '3px',
              }}
            >
              Join our Discord
            </span>
          </a>
        </main>
      </body>
    </html>
  );
}

