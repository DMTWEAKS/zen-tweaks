"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/product", label: "Product", icon: "product" },
  { href: "/about", label: "About", icon: "about" },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M1.5 4.5L6 1L10.5 4.5V10.5C10.5 10.7652 10.3946 11.0196 10.2071 11.2071C10.0196 11.3946 9.76522 11.5 9.5 11.5H2.5C2.23478 11.5 1.98043 11.3946 1.79289 11.2071C1.60536 11.0196 1.5 10.7652 1.5 10.5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 11.5V6.5H7.5V11.5"
      stroke="currentColor"
        strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <rect
        x="1"
        y="1.5"
        width="10"
        height="7"
        rx="1"
      stroke="currentColor"
        strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      />
      <line
        x1="4"
        y1="10.5"
        x2="8"
        y2="10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="6"
        y1="8.5"
        x2="6"
        y2="10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AboutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <circle
        cx="6"
        cy="6"
        r="5"
      stroke="currentColor"
        strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      />
      <line
        x1="6"
        y1="8"
        x2="6"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="6" cy="4" r="0.5" fill="currentColor" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M16.9308 3.64166C15.6561 3.05166 14.2892 2.61833 12.8599 2.36833C12.8339 2.36333 12.8079 2.37499 12.7945 2.39833C12.6187 2.71499 12.4239 3.12499 12.2878 3.45166C10.7522 3.21833 9.22445 3.21833 7.72111 3.45166C7.58501 3.11833 7.38334 2.71499 7.20667 2.39833C7.19334 2.37583 7.16734 2.36416 7.14134 2.36833C5.71278 2.61749 4.34589 3.05083 3.07034 3.64166C3.05867 3.64666 3.04867 3.65499 3.04201 3.66583C0.444007 7.53916 -0.265493 11.3175 0.0826743 15.0475C0.0843409 15.0667 0.0951743 15.085 0.110007 15.0967C1.81667 16.3442 3.46834 17.1017 5.09001 17.6067C5.11601 17.615 5.14367 17.6058 5.16001 17.5842C5.55001 17.0517 5.89667 16.4892 6.19334 15.8983C6.21084 15.8633 6.19417 15.8217 6.15834 15.8083C5.60584 15.6 5.07834 15.3475 4.57001 15.0617C4.53001 15.0383 4.52667 14.9817 4.56334 14.9542C4.67001 14.8742 4.77667 14.7908 4.87834 14.7067C4.89667 14.6917 4.92167 14.6883 4.94334 14.6983C8.24001 16.2008 11.7967 16.2008 15.0558 14.6983C15.0775 14.6875 15.1025 14.6908 15.1217 14.7058C15.2242 14.79 15.33 14.8742 15.4375 14.9542C15.4742 14.9817 15.4717 15.0383 15.4325 15.0617C14.9242 15.3533 14.3967 15.6 13.8433 15.8075C13.8075 15.8208 13.7917 15.8633 13.8092 15.8983C14.1125 16.4883 14.4592 17.0508 14.8417 17.5833C14.8575 17.6058 14.8858 17.615 14.9117 17.6067C16.5408 17.1017 18.1925 16.3442 19.8992 15.0967C19.9148 15.085 19.925 15.0675 19.9267 15.0483C20.3433 10.7483 19.2183 6.99999 16.9575 3.66666C16.9517 3.65499 16.9417 3.64666 16.9308 3.64166ZM6.68334 12.7775C5.69667 12.7775 4.88334 11.8708 4.88334 10.7558C4.88334 9.64083 5.68001 8.73416 6.68334 8.73416C7.69417 8.73416 8.50001 9.64916 8.48334 10.7558C8.48334 11.8708 7.68667 12.7775 6.68334 12.7775ZM13.3292 12.7775C12.3425 12.7775 11.5292 11.8708 11.5292 10.7558C11.5292 9.64083 12.3258 8.73416 13.3292 8.73416C14.34 8.73416 15.1458 9.64916 15.1292 10.7558C15.1292 11.8708 14.34 12.7775 13.3292 12.7775Z" />
    </svg>
  );
}

function getIcon(icon: string) {
  const className = "w-3 h-3 shrink-0";
  switch (icon) {
    case "home":
      return <HomeIcon className={className} />;
    case "product":
      return <ProductIcon className={className} />;
    case "about":
      return <AboutIcon className={className} />;
    default:
      return null;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-400"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
        transition: prefersReducedMotion ? 'none' : 'opacity 400ms ease, transform 400ms ease',
        background: 'linear-gradient(to bottom, rgba(2, 3, 8, 0.95) 0%, rgba(2, 3, 8, 0.8) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <nav className="mx-auto flex h-[88px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-[72px]">
        <Link
          href="/"
          className="flex h-[22px] w-[130px] items-center transition-opacity duration-200 hover:opacity-80 sm:w-[163px]"
        >
          <Image
            src="/assets/zen-tweaks-logo.svg"
            alt="Zen Tweaks"
            width={163}
            height={22}
            priority
          />
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 active:scale-95 lg:hidden"
          style={{ background: 'rgba(10, 37, 40, 0.15)' }}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <div 
            className="nav-pill relative flex items-start gap-6 overflow-hidden rounded-full px-[25px] py-[11px]"
            style={{
              background: 'rgba(10, 37, 40, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-item relative flex items-center gap-1.5"
                >
                  <span 
                    className="flex items-center justify-center transition-colors duration-200"
                    style={{ 
                      color: isActive ? '#3fdbff' : '#808183',
                    }}
                  >
                    {getIcon(link.icon)}
                  </span>
                  <span
                    className="font-inter text-[14px] font-medium leading-none transition-colors duration-200"
                    style={{
                      letterSpacing: '-0.28px',
                      ...(isActive
                        ? {
                            background: 'linear-gradient(181.68deg, rgba(255, 255, 255, 0.9) 16.937%, rgba(63, 219, 255, 0.63) 110.7%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : {
                            color: '#808183',
                          }),
                    }}
                  >
                  {link.label}
                  </span>
                  {isActive && (
                    <div className="nav-active-indicator absolute -bottom-[11px] left-0 right-0">
                      <div 
                        className="absolute left-1/2 h-[1px] -translate-x-1/2"
                        style={{
                          width: '74px',
                          background: '#3fdbff',
                          filter: 'blur(2.25px)',
                        }}
                      />
                      <div 
                        className="absolute left-1/2 h-[1px] -translate-x-1/2"
                        style={{
                          width: '65.294px',
                          background: '#3fdbff',
                          filter: 'blur(2px)',
                        }}
                      />
                      <div 
                        className="absolute left-1/2 h-[1px] -translate-x-1/2"
                        style={{
                          width: '56.588px',
                          background: '#3fdbff',
                          filter: 'blur(2px)',
                        }}
                      />
                      <div 
                        className="absolute left-1/2 h-[1px] -translate-x-1/2"
                        style={{
                          width: '21.765px',
                          background: '#3fdbff',
                          filter: 'blur(6.05px)',
                        }}
                      />
                      <div 
                        className="absolute left-1/2 h-[1px] -translate-x-1/2"
                        style={{
                          width: '50.784px',
                          background: '#3fdbff',
                          filter: 'blur(1.05px)',
                        }}
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden items-center gap-[14px] lg:flex">
          <a
            href="https://discord.gg/zentweaks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-[#808183] transition-all duration-200 hover:scale-105 hover:text-white active:scale-95"
            aria-label="Join Discord"
          >
            <DiscordIcon />
          </a>

          <Link
            href="/product"
            className="flex items-center rounded-[14px] px-4 py-2 font-inter text-[14px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(63,219,255,0.3)] active:scale-[0.98]"
            style={{
              background: '#3fdbff',
              color: '#090909',
              letterSpacing: '-0.28px',
              backdropFilter: 'blur(4px)',
            }}
          >
            Buy now
          </Link>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-[88px] z-40 border-t border-white/5 p-4 lg:hidden transition-all duration-200 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        style={{ 
          background: 'rgba(2, 3, 8, 0.98)', 
          backdropFilter: 'blur(20px)',
          transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease, transform 200ms ease',
        }}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <div
                key={link.href}
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                  transition: prefersReducedMotion ? 'none' : `opacity 200ms ease ${index * 50}ms, transform 200ms ease ${index * 50}ms`,
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200"
                  style={{
                    background: isActive ? 'rgba(63, 219, 255, 0.1)' : 'transparent',
                    color: isActive ? '#3fdbff' : '#808183',
                  }}
                >
                  <span className="flex items-center justify-center">
                    {getIcon(link.icon)}
                  </span>
                  <span className="font-inter text-[15px] font-medium">{link.label}</span>
                </Link>
              </div>
            );
          })}
          <div className="my-2 h-px bg-white/5" />
          <a
            href="https://discord.gg/zentweaks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#808183] transition-colors duration-200 hover:text-white"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
              transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease 150ms, transform 200ms ease 150ms',
            }}
          >
            <DiscordIcon className="h-5 w-5" />
            <span className="font-inter text-[15px] font-medium">Join Discord</span>
          </a>
          <div
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease 200ms, transform 200ms ease 200ms',
            }}
          >
            <Link
              href="/product"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center rounded-[14px] px-4 py-3 font-inter text-[15px] font-medium transition-opacity duration-200 hover:opacity-90"
              style={{ background: '#3fdbff', color: '#090909' }}
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
