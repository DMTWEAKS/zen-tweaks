import Link from "next/link";
import BackgroundFX from "@/components/layout/BackgroundFX";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundFX />

      <Navbar />

      <main className="relative z-10 flex-1 pt-[var(--nav-height)]">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: '#020308' }} />
            
            <div
              className="absolute animate-glow-pulse"
              style={{
                left: '50%',
                top: '200px',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '300px',
                background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.08) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height)-200px)] w-full max-w-[1440px] flex-col items-center justify-center px-4 py-16 sm:px-8 lg:px-[96px]">
            <div className="relative mb-6">
              <span
                className="font-inter text-[120px] font-bold leading-none tracking-[-4px] sm:text-[180px] lg:text-[220px]"
                style={{
                  background: 'linear-gradient(180deg, rgba(63, 219, 255, 0.15) 0%, rgba(63, 219, 255, 0.02) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                404
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center font-inter text-[120px] font-bold leading-none tracking-[-4px] sm:text-[180px] lg:text-[220px]"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: 0.1,
                }}
              >
                404
              </span>
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
              Page not found
            </h1>

            <p
              className="mb-8 max-w-[400px] text-center font-inter text-[15px] font-medium leading-[1.6] tracking-[-0.3px] sm:text-[17px] sm:tracking-[-0.34px]"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-[20px] px-8 py-3 font-inter text-[15px] font-medium tracking-[-0.3px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(63,219,255,0.4)] active:scale-[0.98] sm:px-[48px] sm:py-[14px] sm:text-[17px] sm:tracking-[-0.34px]"
                style={{
                  background: '#3fdbff',
                  color: '#090909',
                  backdropFilter: 'blur(4px)',
                }}
              >
                Go home
              </Link>
              
              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-[20px] px-8 py-3 font-inter text-[15px] font-medium tracking-[-0.3px] transition-all duration-300 hover:bg-[rgba(63,219,255,0.1)] sm:px-[48px] sm:py-[14px] sm:text-[17px] sm:tracking-[-0.34px]"
                style={{
                  background: 'transparent',
                  color: '#3fdbff',
                  border: '1px solid rgba(63, 219, 255, 0.2)',
                }}
              >
                View product
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

