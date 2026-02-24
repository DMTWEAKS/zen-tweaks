/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Reveal } from "@/components/motion";

const CTA_BG_TEXTURE = "/assets/figma/backgrounds/cta-texture.png";

export default function BottomCTA() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col px-4 pb-16 pt-16 sm:px-8 sm:pb-[120px] sm:pt-[96px] lg:px-[96px]">
        <Reveal yPx={24}>
          <div
            className="relative h-[280px] w-full overflow-hidden rounded-[15px] sm:h-[320px] lg:h-[360px]"
            style={{ border: '1px solid rgba(63, 219, 255, 0.05)' }}
          >
            <img
              src={CTA_BG_TEXTURE}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0.5 }}
            />

            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute h-[136.59px] w-[181.87px] animate-glow-pulse"
                style={{
                  left: '108.26px',
                  top: '85.25px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.06) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  transform: 'rotate(180deg) scaleY(-1)',
                }}
              />
              <div
                className="absolute h-[136.43px] w-[166.79px] animate-glow-pulse"
                style={{
                  left: '971.22px',
                  top: '85.28px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.06) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  animationDelay: '2s',
                }}
              />
              <div
                className="absolute h-[81.14px] w-[163.36px]"
                style={{
                  left: '364.37px',
                  top: '57.4px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
                  filter: 'blur(35px)',
                }}
              />
              <div
                className="absolute h-[117.35px] w-[209.05px]"
                style={{
                  left: '153.83px',
                  top: '199.62px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.05) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  transform: 'rotate(144.78deg) scaleY(-1)',
                }}
              />
              <div
                className="absolute h-[117.35px] w-[191.27px]"
                style={{
                  left: '905.04px',
                  top: '199.59px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.05) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  transform: 'rotate(37.65deg)',
                }}
              />
              <div
                className="absolute h-[143.04px] w-[272.02px]"
                style={{
                  left: '273.66px',
                  top: '232.61px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.03) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <div
                className="absolute h-[81.92px] w-[134.24px]"
                style={{
                  left: '939.51px',
                  top: '147.24px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
                  filter: 'blur(35px)',
                }}
              />
              <div
                className="absolute h-[80.12px] w-[130.79px]"
                style={{
                  left: '782.92px',
                  top: '50.82px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
                  filter: 'blur(35px)',
                }}
              />
              <div
                className="absolute h-[81.92px] w-[146.72px]"
                style={{
                  left: '178.49px',
                  top: '147.28px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
                  filter: 'blur(35px)',
                }}
              />
              <div
                className="absolute h-[117.35px] w-[191.27px]"
          style={{
                  left: '768.2px',
                  top: '234.53px',
                  background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.03) 0%, transparent 70%)',
                  filter: 'blur(50px)',
          }}
        />
      </div>
            <div className="absolute left-1/2 top-1/2 flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 sm:w-auto sm:gap-[32px]">
              <h2 className="text-center font-inter text-[24px] font-medium leading-[1.2] tracking-[-0.48px] text-white sm:text-[36px] sm:tracking-[-0.72px] lg:text-[48px] lg:leading-none lg:tracking-[-0.96px]">
                Optimize Windows for
          <br />
                maximum performance
        </h2>

        <Link
          href="/product"
                className="inline-flex items-center justify-center rounded-[20px] px-8 py-3 font-inter text-[15px] font-medium tracking-[-0.3px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(63,219,255,0.4)] active:scale-[0.98] sm:px-[48px] sm:py-[14px] sm:text-[17px] sm:tracking-[-0.34px]"
                style={{
                  background: '#3fdbff',
                  color: '#090909',
                  backdropFilter: 'blur(4px)',
                }}
        >
          Buy now
        </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
