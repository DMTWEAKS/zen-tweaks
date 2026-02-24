/* eslint-disable @next/next/no-img-element */
import { Reveal, Stagger } from "@/components/motion";

const EXPERIENCE_ICON = "/assets/figma/icons/experience.svg";
const CUSTOMERS_ICON = "/assets/figma/icons/customers.svg";
const SATISFACTION_ICON = "/assets/figma/icons/satisfaction.svg";

const BG_TEXTURE = "/assets/figma/backgrounds/hero-texture.png";

const stats = [
  { icon: EXPERIENCE_ICON, text: "5+ Years of experience" },
  { icon: CUSTOMERS_ICON, text: "1,000+ Happy customers" },
  { icon: SATISFACTION_ICON, text: "99% Satisfaction rate" },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: '#020308' }} />
        
        <img
          src={BG_TEXTURE}
          alt=""
          className="absolute inset-0 h-[532px] w-full object-cover"
          style={{ opacity: 0.08 }}
        />
        
        <div
          className="absolute animate-glow-pulse"
          style={{
            left: '334px',
            top: '129px',
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
            top: '129px',
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
            top: '168px',
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
            top: '115px',
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
            top: '224px',
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
            top: '224px',
            width: '155px',
            height: '124px',
            background: 'radial-gradient(ellipse at center, rgba(63, 219, 255, 0.04) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-0">
        <div className="flex flex-col items-center gap-8 pt-[100px] sm:gap-[48px] sm:pt-[138px]">
          <Stagger className="flex w-full max-w-[623px] flex-col items-center gap-[18px] text-center sm:gap-[22px]" staggerMs={150} baseDelayMs={100}>
            <h1
              className="w-full font-inter text-[32px] font-semibold leading-[1.1] tracking-[-0.64px] sm:text-[48px] sm:tracking-[-0.96px] lg:text-[60px] lg:leading-none lg:tracking-[-1.2px]"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              A little bit about us
            </h1>
            <p
              className="w-full font-inter text-[15px] font-medium leading-[24px] tracking-[-0.3px] sm:text-[18px] sm:leading-[28px] sm:tracking-[-0.36px]"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              We&apos;re a small team of Windows Tweakers, trying to make gaming just a little
              <br className="hidden sm:block" />
              more enjoyable, by eliminating frustrating stutters and lag spikes
            </p>
          </Stagger>

          <Reveal
            className="relative w-full py-4 sm:h-[48px] sm:py-0"
            delayMs={400}
            yPx={0}
          >
            <div
              className="absolute inset-0"
              style={{
                borderTop: '1px solid rgba(63, 219, 255, 0.05)',
                borderBottom: '1px solid rgba(63, 219, 255, 0.05)',
              }}
            />
            <Stagger className="flex flex-col items-center gap-4 sm:absolute sm:left-1/2 sm:top-1/2 sm:flex-row sm:-translate-x-1/2 sm:-translate-y-1/2 sm:gap-8 lg:gap-[72px]" staggerMs={100}>
              {stats.map((stat, index) => (
                <div key={index} className="flex shrink-0 items-center gap-[8px]">
                  <div className="relative h-[18px] w-[18px] shrink-0 overflow-hidden">
                    <img
                      src={stat.icon}
                      alt=""
                      className="block h-full w-full max-w-none"
                    />
                  </div>
                  <span
                    className="whitespace-nowrap font-inter text-[14px] font-medium leading-[1.5] tracking-[-0.28px] sm:text-[15px] sm:tracking-[-0.3px] lg:text-[17px] lg:tracking-[-0.34px]"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    {stat.text}
                  </span>
                </div>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
