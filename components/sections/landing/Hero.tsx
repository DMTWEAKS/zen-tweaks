/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Reveal, Stagger } from "@/components/motion";

const HERO_BG_TEXTURE = "/assets/figma/backgrounds/hero-texture.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: '#020308' }} />
        
        <img
          src={HERO_BG_TEXTURE}
          alt=""
          className="absolute inset-0 h-[685px] w-full object-cover"
          style={{ opacity: 0.08 }}
        />
        
        <div
          className="absolute animate-glow-pulse"
          style={{
            left: '334px',
            top: '156px',
            width: '210px',
            height: '207px',
            background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute animate-glow-pulse"
          style={{
            left: '1120px',
            top: '156px',
            width: '193px',
            height: '207px',
            background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute"
          style={{
            left: '608px',
            top: '203px',
            width: '189px',
            height: '123px',
            background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: '903px',
            top: '140px',
            width: '151px',
            height: '122px',
            background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: '265px',
            top: '280px',
            width: '169px',
            height: '124px',
            background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: '1184px',
            top: '280px',
            width: '155px',
            height: '124px',
            background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[400px] w-full max-w-[1440px] items-center justify-center px-4 pt-[100px] pb-0 sm:min-h-[459px] sm:px-8 sm:pt-[138px] lg:px-[96px]">
        <Stagger
          className="flex w-full max-w-[783px] flex-col items-center gap-[18px] sm:gap-[22px]"
          staggerMs={150}
          baseDelayMs={100}
          yPx={20}
        >
          <h1
            className="text-center font-inter text-[32px] font-semibold leading-[1.1] tracking-[-0.64px] sm:text-[48px] sm:tracking-[-0.96px] lg:text-[60px] lg:leading-none lg:tracking-[-1.2px]"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Optimize Windows for
            <br />
            Maximum Performance
          </h1>

          <p
            className="max-w-[90%] text-center font-inter text-[15px] font-medium leading-[24px] tracking-[-0.3px] sm:max-w-none sm:text-[18px] sm:leading-[28px] sm:tracking-[-0.36px]"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Stop missing out on performance. Get the most out of your
            <br className="hidden sm:block" />
            system and start dominating in your favourite games.
          </p>

          <div className="relative inline-flex items-start">
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

            <div
              className="absolute flex items-center justify-center"
              style={{
                top: '-13px',
                left: '119.81px',
                width: '78.268px',
                height: '44.969px',
              }}
            >
              <div style={{ transform: 'rotate(15.624deg)' }}>
                <span
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-[29px] px-[9px] py-[5px] font-inter text-[13px] font-semibold tracking-[-0.26px] text-white"
                  style={{
                    background: 'linear-gradient(285deg, #f42e2e 8.23%, #c92b2b 91.77%)',
                    border: '0.75px solid white',
                    boxShadow: '-19px 17px 7px 0px rgba(0,0,0,0), -12px 11px 6px 0px rgba(0,0,0,0.02), -7px 6px 5px 0px rgba(0,0,0,0.08), -3px 3px 4px 0px rgba(0,0,0,0.13), -1px 1px 2px 0px rgba(0,0,0,0.15)',
                  }}
                >
                  40% OFF
                </span>
              </div>
            </div>
          </div>
        </Stagger>
      </div>
    </section>
  );
}
