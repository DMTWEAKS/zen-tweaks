/* eslint-disable @next/next/no-img-element */
import { Reveal, Stagger } from "@/components/motion";

const RESULTS_ICON = "/assets/figma/icons/results.svg";
const OPTIMIZATION_ICON = "/assets/figma/icons/optimization.svg";
const PERFORMANCE_ICON = "/assets/figma/icons/about-performance.svg";

const values = [
  {
    icon: RESULTS_ICON,
    title: "Results over promises",
    description: "Every tweak is tested, intentional, and built to improve real-world performance.",
  },
  {
    icon: OPTIMIZATION_ICON,
    title: "Built on real optimization",
    description: "No placebo tweaks - only changes that make a measurable difference.",
  },
  {
    icon: PERFORMANCE_ICON,
    title: "Performance, backed by intent",
    description: "We prioritize stability, impact, and control over flashy claims.",
  },
];

export default function CoreValues() {
  return (
    <section
      className="relative min-h-[390px] w-full overflow-hidden py-12 sm:h-[390px] sm:py-0"
      style={{
        background: 'linear-gradient(180deg, #050f11 0%, #020308 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0px -285px 80px 0px rgba(0,0,0,0), 0px -182px 73px 0px rgba(0,0,0,0.02), 0px -103px 62px 0px rgba(0,0,0,0.08), 0px -46px 46px 0px rgba(0,0,0,0.13), 0px -11px 25px 0px rgba(0,0,0,0.15)',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:absolute sm:left-0 sm:top-[91px] sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:px-8 lg:px-[96px]">
        <Reveal className="flex w-full flex-col items-start gap-[18px] sm:w-[280px]">
          <div className="flex items-center gap-[8px]">
            <div
              className="h-[14px] w-[4px] shrink-0 rounded-[6px]"
              style={{ background: '#3fdbff' }}
            />
            <span
              className="font-ibm-plex-mono text-[12px] font-semibold uppercase leading-[1.5]"
              style={{ color: '#808183' }}
            >
              OUR CORE VALUES
            </span>
          </div>
          
          <h2
            className="font-inter text-[28px] font-semibold leading-[1.2] tracking-[-0.56px] sm:text-[36px] sm:tracking-[-0.72px] lg:text-[40px] lg:tracking-[-0.8px]"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 109.9%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Built on these
            <br />
            principles
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 sm:flex sm:h-[125px] sm:items-end sm:gap-[32px]" staggerMs={120} yPx={20}>
          {values.map((value, index) => (
            <div
              key={index}
              className="flex h-full items-end"
            >
              <div className="flex flex-col items-start gap-[20px]">
                <div className="relative h-[18px] w-[18px] shrink-0 overflow-hidden">
                  <img
                    src={value.icon}
                    alt=""
                    className="block h-full w-full max-w-none"
                  />
                </div>
                
                <div className="flex flex-col items-start gap-[10px]">
                  <span
                    className="whitespace-nowrap font-inter text-[15px] font-medium leading-[1.35] tracking-[-0.3px] text-white"
                  >
                    {value.title}
                  </span>
                  
                  <p
                    className="max-w-[213px] font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px]"
                    style={{ color: '#808183' }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>

              {index < values.length - 1 && (
                <div
                  className="ml-[32px] hidden h-[125px] w-px shrink-0 sm:block"
                  style={{ background: 'rgba(63, 219, 255, 0.05)' }}
                />
              )}
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
