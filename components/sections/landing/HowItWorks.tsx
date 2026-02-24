/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Reveal, Stagger } from "@/components/motion";

const PURCHASE_IMG = "/assets/figma/images/purchase.png";
const OPTIMIZE_IMG = "/assets/figma/images/optimize.png";
const LOGO_BG = "/assets/figma/images/logo-bg.png";

export default function HowItWorks() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-4 pt-16 sm:gap-[42px] sm:px-8 sm:pt-[96px] lg:px-[96px]">
        <Reveal className="flex flex-col items-center gap-[18px]">
          <div className="flex items-center gap-[8px]">
            <div
              className="h-[14px] w-[4px] rounded-[6px]"
              style={{ background: '#3fdbff' }}
            />
            <span
              className="font-ibm-plex-mono text-[12px] font-semibold leading-[1.5]"
              style={{ color: '#808183' }}
            >
              HOW IT WORKS
            </span>
      </div>

          <h2
            className="text-center font-inter text-[28px] font-semibold leading-[1.2] tracking-[-0.56px] sm:text-[36px] sm:tracking-[-0.72px] lg:text-[40px] lg:tracking-[-0.8px]"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 109.9%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Get started in seconds,
            <br />
            optimize in minutes
          </h2>
        </Reveal>

        <Stagger className="grid w-full grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-[24px]" staggerMs={150} yPx={24}>
          <div
            className="hover-lift relative h-[320px] overflow-hidden rounded-[16px] sm:h-[380px] lg:h-[430px]"
            style={{
              background: '#03060a',
              border: '1px solid rgba(255, 255, 255, 0.03)',
            }}
          >
            <div className="absolute left-4 top-2 h-[180px] w-full max-w-[400px] sm:left-[30px] sm:top-[10px] sm:h-[220px] lg:h-[281px] lg:w-[531px] lg:max-w-none">
              <img
                src={PURCHASE_IMG}
                alt=""
                className="h-full w-full object-cover object-left"
              />
      </div>

            <div
              className="absolute bottom-4 left-4 right-4 font-inter text-[15px] font-medium leading-[1.5] tracking-[-0.3px] sm:bottom-[50px] sm:left-[29px] sm:right-auto sm:w-[300px] sm:text-[16px] lg:bottom-[71.5px] lg:w-[338px] lg:translate-y-[50%] lg:text-[18px] lg:tracking-[-0.36px]"
            >
              <span className="text-white">Purchase Zen Tweaks. </span>
              <span style={{ color: '#808183' }}>
                Complete the checkout and get instant access to your personal license.
              </span>
      </div>
    </div>

          <div
            className="hover-lift relative h-[320px] overflow-hidden rounded-[16px] sm:h-[380px] lg:h-[430px]"
            style={{
              background: '#03060a',
              border: '1px solid rgba(255, 255, 255, 0.03)',
            }}
          >
            <svg className="absolute left-[38.61px] top-px h-[255.3px] w-[320.96px]" viewBox="0 0 321 256" fill="none">
              <path d="M0 128 Q80 0 160 128 T320 128" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              <path d="M0 160 Q80 32 160 160 T320 160" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              <path d="M0 192 Q80 64 160 192 T320 192" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      </svg>

            <div
              className="absolute left-[253px] top-[41px] flex h-[36px] w-[36px] items-center justify-center rounded-full p-[14px]"
              style={{
                background: 'linear-gradient(253deg, rgba(20, 20, 20, 1) 10.95%, rgba(14, 14, 14, 1) 86.35%)',
                border: '1px solid rgba(255, 255, 255, 0.01)',
              }}
            >
      </div>

            <div className="absolute left-[280px] top-[69px] h-[12px] w-[12px]" />

            <div
              className="absolute left-1/2 top-[111px] w-[301px] -translate-x-1/2 overflow-hidden rounded-[11px] px-[14px] pb-[20px] pt-[10px]"
              style={{
                background: 'linear-gradient(232deg, rgba(20, 20, 20, 1) 10.95%, rgba(14, 14, 14, 1) 86.35%)',
                border: '1px solid rgba(255, 255, 255, 0.02)',
              }}
            >
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center justify-between">
                  <span
                    className="font-inter text-[12px] font-medium leading-[1.5] tracking-[-0.24px]"
                    style={{ color: '#808183' }}
                  >
        Your download is ready!
                  </span>
                  <div className="h-[12px] w-[12px]" />
                </div>
                <div className="h-px w-full" style={{ background: 'rgba(255, 255, 255, 0.02)' }} />
      </div>

              <div className="mt-[16px] flex items-center gap-[12px]">
                <div className="h-[48px] w-[48px] overflow-hidden rounded-[54px]">
                  <img src={LOGO_BG} alt="" className="h-full w-full object-cover" />
          </div>
                <div className="flex w-[139px] flex-col gap-[4px]">
                  <span className="font-inter text-[18px] font-semibold leading-[1.5] tracking-[-0.36px] text-white">
              Zen Tweaks
                  </span>
                  <span
                    className="font-inter text-[12px] font-medium leading-[1.5] tracking-[-0.24px]"
                    style={{ color: '#808183' }}
                  >
                    127 MB • 15 seconds ago
                  </span>
            </div>
          </div>
        </div>

            <div
              className="absolute bottom-4 left-4 right-4 font-inter text-[15px] font-medium leading-[1.5] tracking-[-0.3px] sm:bottom-[50px] sm:left-[29px] sm:right-auto sm:w-[300px] sm:text-[16px] lg:bottom-[71.5px] lg:w-[338px] lg:translate-y-[50%] lg:text-[18px] lg:tracking-[-0.36px]"
            >
              <span className="text-white">Download and install. </span>
              <span style={{ color: '#808183' }}>
                Install Zen Tweaks with a quick, guided setup, which will get you ready in no time.
              </span>
      </div>
    </div>

      <div
            className="hover-lift relative h-[320px] overflow-hidden rounded-[16px] sm:h-[380px] lg:h-[430px]"
        style={{
              background: '#03060a',
              border: '1px solid rgba(255, 255, 255, 0.03)',
        }}
          >
            <div className="absolute left-0 top-[3px] h-[180px] w-full max-w-[350px] sm:left-[-12px] sm:h-[220px] lg:h-[294px] lg:w-[425px] lg:max-w-none">
              <img
                src={OPTIMIZE_IMG}
                alt=""
                className="h-full w-full object-cover object-left"
              />
    </div>

            <div
              className="absolute bottom-4 left-4 right-4 font-inter text-[15px] font-medium leading-[1.5] tracking-[-0.3px] sm:bottom-[50px] sm:left-[29px] sm:right-auto sm:w-[300px] sm:text-[16px] lg:bottom-[71.5px] lg:w-[338px] lg:translate-y-[50%] lg:text-[18px] lg:tracking-[-0.36px]"
            >
              <span className="text-white">Optimize your system. </span>
              <span style={{ color: '#808183' }}>
                Apply tested optimizations and immediately see results after restarting your system.
            </span>
          </div>
        </div>
        </Stagger>

        <Reveal delayMs={400}>
          <Link
            href="/product"
            className="inline-flex items-center justify-center rounded-[20px] px-[48px] py-[14px] font-inter text-[17px] font-medium tracking-[-0.34px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(63,219,255,0.4)] active:scale-[0.98]"
            style={{
              background: '#3fdbff',
              color: '#090909',
              backdropFilter: 'blur(4px)',
            }}
          >
            Buy now
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
