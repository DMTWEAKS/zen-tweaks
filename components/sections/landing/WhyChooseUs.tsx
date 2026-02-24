/* eslint-disable @next/next/no-img-element */
import { Reveal, Stagger } from "@/components/motion";

const PERFORMANCE_ICON = "/assets/figma/icons/performance.svg";
const LATENCY_ICON = "/assets/figma/icons/latency.svg";
const EASY_ICON = "/assets/figma/icons/easy.svg";

const MOCKUP_BG = "/assets/figma/backgrounds/mockup-bg.png";

const GAME_IMAGE_LEFT = "/assets/figma/images/game-fortnite.png";
const GAME_IMAGE_CENTER = "/assets/figma/images/game-valorant.png";
const GAME_IMAGE_RIGHT = "/assets/figma/images/game-minecraft.png";

const ZEN_TWEAKS_LOGO_APP = "/assets/figma/images/zen-tweaks-logo-app.svg";

const ICON_GAME_BOOSTER_HEADER = "/assets/figma/icons/app-game-booster-header.svg";
const ICON_SEARCH = "/assets/figma/icons/app-search.svg";
const ICON_ADD_GAME = "/assets/figma/icons/app-add-game.svg";
const ICON_SAVE = "/assets/figma/icons/app-save.svg";
const ICON_RESTORE = "/assets/figma/icons/app-restore.svg";
const ICON_OPTIMIZE = "/assets/figma/icons/app-optimize.svg";

const ICON_DASHBOARD = "/assets/figma/icons/sidebar-dashboard.svg";
const ICON_TWEAKS = "/assets/figma/icons/sidebar-tweaks.svg";
const ICON_PERIPHERALS = "/assets/figma/icons/sidebar-peripherals.svg";
const ICON_DEBLOAT = "/assets/figma/icons/sidebar-debloat.svg";
const ICON_GRAPHIC_TWEAKS = "/assets/figma/icons/sidebar-graphic-tweaks.svg";
const ICON_BIOS_TWEAKS = "/assets/figma/icons/sidebar-bios-tweaks.svg";
const ICON_GAME_BOOSTER = "/assets/figma/icons/sidebar-game-booster.svg";
const ICON_ADVANCED = "/assets/figma/icons/sidebar-advanced.svg";

const sidebarItems = [
  { label: 'Dashboard', icon: ICON_DASHBOARD, active: false },
  { label: 'Tweaks', icon: ICON_TWEAKS, active: false },
  { label: 'Peripherals', icon: ICON_PERIPHERALS, active: false },
  { label: 'Debloat', icon: ICON_DEBLOAT, active: false },
  { label: 'Graphic Tweaks', icon: ICON_GRAPHIC_TWEAKS, active: false },
  { label: 'Bios Tweaks', icon: ICON_BIOS_TWEAKS, active: false },
  { label: 'Game Booster', icon: ICON_GAME_BOOSTER, active: true },
  { label: 'Advanced', icon: ICON_ADVANCED, active: false },
];

const features = [
  {
    icon: PERFORMANCE_ICON,
    title: "Better performance",
    line1: "Maximize FPS, minimize",
    line2: "unwanted Stutters",
  },
  {
    icon: LATENCY_ICON,
    title: "Lower latency",
    line1: "Smoother input and",
    line2: "network response",
  },
  {
    icon: EASY_ICON,
    title: "Easy to use",
    line1: "Optimize Windows in",
    line2: "minutes, not hours",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pt-12 sm:gap-[42px] sm:px-8 sm:pt-[72px] lg:px-[96px]">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <div className="flex flex-col gap-[18px] lg:pl-[16px]">
            <div className="flex items-center gap-[8px]">
              <div
                className="h-[14px] w-[4px] rounded-[6px]"
                style={{ background: '#3fdbff' }}
              />
              <span
                className="font-ibm-plex-mono text-[12px] font-semibold leading-[1.5]"
                style={{ color: '#808183' }}
              >
                WHY CHOOSE US
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
              Optimization that
              <br />
              actually works
            </h2>
          </div>

          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:flex lg:items-end lg:gap-[32px]" staggerMs={100}>
            {features.map((feature, index) => (
              <div key={feature.title} className="flex items-end gap-[32px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="h-[18px] w-[18px] overflow-hidden">
                    <img
                      src={feature.icon}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <span
                      className="font-inter text-[15px] font-medium leading-[1.35] tracking-[-0.3px] text-white"
                    >
                  {feature.title}
                    </span>
                    <span
                      className="font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px]"
                      style={{ color: '#808183' }}
                    >
                      {feature.line1}
                      <br />
                      {feature.line2}
                    </span>
                  </div>
                </div>

                {index < features.length - 1 && (
                  <div
                    className="hidden h-full w-px self-stretch lg:block"
                    style={{ background: 'rgba(63, 219, 255, 0.05)' }}
                  />
                )}
              </div>
            ))}
          </Stagger>
        </Reveal>

        <Reveal delayMs={200} yPx={24}>
          <div
            className="mockup-hover relative h-[400px] w-full overflow-hidden rounded-[16px] sm:h-[600px] lg:h-[780px]"
            style={{ background: 'rgba(255, 255, 255, 0.04)' }}
          >
            <img
              src={MOCKUP_BG}
              alt=""
              className="pointer-events-none absolute top-0 h-full w-auto min-w-full object-cover sm:h-[779px] sm:w-[1386px]"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            <div
              className="animate-float absolute left-1/2 top-1/2 h-[300px] w-[90%] max-w-[858.5px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px] sm:h-[450px] sm:rounded-[16px] lg:h-[595px] lg:rounded-[18.7px]"
              style={{
                background: 'linear-gradient(231deg, rgba(16, 16, 16, 1) 2.07%, rgba(11, 11, 11, 1) 101.2%)',
                border: '0.85px solid rgba(255, 255, 255, 0.02)',
                boxShadow: '0px 309px 86px 0px rgba(0,0,0,0), 0px 197px 79px 0px rgba(0,0,0,0.01), 0px 111px 67px 0px rgba(0,0,0,0.05), 0px 49px 49px 0px rgba(0,0,0,0.09), 0px 12px 27px 0px rgba(0,0,0,0.1)',
              }}
            >
              <div className="absolute left-[11.05px] top-[11.05px] flex items-center gap-[5.95px]">
                <div className="h-[10.2px] w-[10.2px] rounded-full" style={{ background: '#3fdbff' }} />
                <div className="h-[10.2px] w-[10.2px] rounded-full" style={{ background: '#3c3c3c' }} />
                <div className="h-[10.2px] w-[10.2px] rounded-full" style={{ background: '#3c3c3c' }} />
              </div>

              <div className="absolute left-[27.15px] top-[51.7px] h-[22px] w-[164px]">
                <img
                  src={ZEN_TWEAKS_LOGO_APP}
                  alt="Zen Tweaks"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="absolute left-[27.2px] top-[104.55px] flex flex-col gap-[23.8px]">
                {sidebarItems.map((item) => (
                  <div key={item.label} className="relative flex items-center gap-[6.8px]">
                    {item.active && (
                      <div
                        className="absolute left-[-25.5px] h-[17.85px] w-[2.125px] rounded-[4.25px]"
                        style={{ background: '#3fdbff' }}
                      />
                    )}
                    <div className="h-[14.45px] w-[14.45px] overflow-hidden">
                      <img src={item.icon} alt="" className="h-full w-full object-contain" />
                    </div>
                    <span
                      className="font-inter text-[11.9px] font-medium tracking-[-0.238px]"
                      style={{ color: item.active ? '#3fdbff' : '#6d6d6d' }}
                    >
                      {item.label}
                    </span>
              </div>
            ))}
          </div>

              <div
                className="absolute left-[242.15px] top-[19.55px] h-[554.2px] w-[595px] overflow-hidden rounded-[17px]"
                style={{
                  background: '#141414',
                  border: '0.85px solid rgba(255, 255, 255, 0.01)',
                }}
              >
                <div className="absolute left-[21.25px] top-[17.85px] flex w-[550.8px] flex-col gap-[30.6px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[6.8px]">
                      <div className="h-[20.4px] w-[20.4px] overflow-hidden">
                        <img src={ICON_GAME_BOOSTER_HEADER} alt="" className="h-full w-full object-contain" />
                      </div>
                      <span className="font-inter text-[17px] font-medium tracking-[-0.34px] text-white">
                        Game Booster
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-[6.8px] overflow-hidden rounded-[10.2px] py-[6.8px] pl-[11.9px] pr-[99.45px]"
                      style={{
                        background: '#1b1b1b',
                        border: '0.85px solid rgba(255, 255, 255, 0.01)',
                      }}
                    >
                      <div className="h-[10.2px] w-[10.2px] overflow-hidden">
                        <img src={ICON_SEARCH} alt="" className="h-full w-full object-contain" />
                      </div>
                      <span
                        className="font-inter text-[11.05px] font-medium tracking-[-0.221px]"
                        style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                      >
                        Search for game...
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-[6.8px] overflow-hidden rounded-[10.2px] py-[6.8px] pl-[11.9px] pr-[99.45px]"
                      style={{
                        background: '#1b1b1b',
                        border: '0.85px solid rgba(255, 255, 255, 0.01)',
                      }}
                    >
                      <div className="h-[13.6px] w-[13.6px] overflow-hidden">
                        <img src={ICON_ADD_GAME} alt="" className="h-full w-full object-contain" />
                      </div>
                      <span
                        className="font-inter text-[11.9px] font-medium tracking-[-0.238px]"
                        style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                      >
                        Add game to be optimized...
                      </span>
                    </div>

                    <div className="flex items-center gap-[5.1px]">
                      <button
                        className="flex items-center gap-[5.1px] overflow-hidden rounded-[10.2px] px-[37.4px] py-[6.8px]"
                        style={{ background: '#3fdbff' }}
                      >
                        <div className="h-[11.9px] w-[11.9px] overflow-hidden">
                          <img src={ICON_SAVE} alt="" className="h-full w-full object-contain" />
                        </div>
                        <span className="font-inter text-[11.9px] font-medium tracking-[-0.238px] text-[#0d0d0d]">
                          Save
                        </span>
                      </button>
                      <button
                        className="flex items-center gap-[5.1px] overflow-hidden rounded-[10.2px] px-[37.4px] py-[6.8px]"
                        style={{ background: '#3fdbff' }}
                      >
                        <div className="h-[11.9px] w-[11.9px] overflow-hidden">
                          <img src={ICON_RESTORE} alt="" className="h-full w-full object-contain" />
                        </div>
                        <span className="font-inter text-[11.9px] font-medium tracking-[-0.238px] text-[#0d0d0d]">
                          Save
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[-73.95px] top-[133.45px] flex w-[734.4px] flex-col items-center gap-[20.4px]">
                  <div className="flex w-full items-end gap-[15.3px]">
                    <div
                      className="relative h-[312.8px] w-[234.6px] overflow-hidden rounded-[11.9px]"
                      style={{ border: '0.85px solid rgba(255, 255, 255, 0.35)' }}
                    >
                      <img
                        src={GAME_IMAGE_LEFT}
                        alt=""
                        className="absolute right-[-0.85px] top-[-0.85px] h-[330.65px] w-[587.822px] object-cover"
                      />
                      <div className="absolute inset-0 bg-[rgba(0,0,0,0.74)]" />
                    </div>

                    <div className="flex flex-col items-center gap-[14.45px] w-[234.6px]">
                      <span className="font-inter text-[16.15px] font-semibold tracking-[-0.323px] text-white text-center">
                        Valorant
                      </span>
                      <div
                        className="relative h-[312.8px] w-full overflow-hidden rounded-[11.9px]"
                        style={{ border: '0.85px solid rgba(255, 255, 255, 0.35)' }}
                      >
                        <img
                          src={GAME_IMAGE_CENTER}
                          alt="Valorant"
                          className="absolute left-[-0.85px] top-[-17.85px] h-[346.8px] w-[235.45px] object-cover"
                        />
                      </div>
                    </div>

                    <div
                      className="relative h-[312.8px] w-[234.6px] overflow-hidden rounded-[11.9px]"
                      style={{ border: '0.85px solid rgba(255, 255, 255, 0.35)' }}
                    >
                      <img
                        src={GAME_IMAGE_RIGHT}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[rgba(0,0,0,0.74)]" />
                    </div>
                  </div>

                  <button
                    className="flex w-[234.6px] items-center justify-center gap-[5.1px] overflow-hidden rounded-[10.2px] px-[66.3px] py-[8.5px]"
                    style={{ background: '#e62a42' }}
                  >
                    <div className="h-[11.9px] w-[11.9px] overflow-hidden">
                      <img src={ICON_OPTIMIZE} alt="" className="h-full w-full object-contain" />
                    </div>
                    <span className="font-inter text-[11.9px] font-medium tracking-[-0.238px] text-white">
                      Optimize Valorant
                    </span>
                  </button>
                </div>
              </div>
        </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
