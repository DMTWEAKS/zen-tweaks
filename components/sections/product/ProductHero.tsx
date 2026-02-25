/* eslint-disable @next/next/no-img-element */
import { Reveal, Stagger } from "@/components/motion";
import { PayNowCheckoutButton } from "@/components/integrations/PayNowCheckoutButton";

const ELLIPSE_BG = "/assets/figma/backgrounds/ellipse-bg.png";

const GAME_IMAGE_LEFT = "/assets/figma/images/game-fortnite-product.png";
const GAME_IMAGE_CENTER = "/assets/figma/images/game-valorant-product.png";
const GAME_IMAGE_RIGHT = "/assets/figma/images/game-minecraft-product.png";

const ZEN_TWEAKS_LOGO_APP = "/assets/figma/images/zen-tweaks-logo-app-product.svg";

const ICON_GAME_BOOSTER_HEADER = "/assets/figma/icons/app-game-booster-header-product.svg";
const ICON_SEARCH = "/assets/figma/icons/app-search-product.svg";
const ICON_ADD_GAME = "/assets/figma/icons/app-add-game-product.svg";
const ICON_SAVE = "/assets/figma/icons/app-save-product.svg";
const ICON_RESTORE = "/assets/figma/icons/app-restore-product.svg";
const ICON_OPTIMIZE = "/assets/figma/icons/app-optimize-product.svg";

const ICON_DASHBOARD = "/assets/figma/icons/sidebar-dashboard-product.svg";
const ICON_TWEAKS = "/assets/figma/icons/sidebar-tweaks-product.svg";
const ICON_PERIPHERALS = "/assets/figma/icons/sidebar-peripherals-product.svg";
const ICON_DEBLOAT = "/assets/figma/icons/sidebar-debloat-product.svg";
const ICON_GRAPHIC_TWEAKS = "/assets/figma/icons/sidebar-graphic-tweaks-product.svg";
const ICON_BIOS_TWEAKS = "/assets/figma/icons/sidebar-bios-tweaks-product.svg";
const ICON_GAME_BOOSTER = "/assets/figma/icons/sidebar-game-booster-product.svg";
const ICON_ADVANCED = "/assets/figma/icons/sidebar-advanced-product.svg";

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

const GPU_ICON = "/assets/figma/icons/gpu.svg";
const NETWORK_ICON = "/assets/figma/icons/network.svg";
const WINDOWS_ICON = "/assets/figma/icons/windows.svg";
const CPU_ICON = "/assets/figma/icons/cpu.svg";
const ADVANCED_ICON = "/assets/figma/icons/advanced.svg";
const CLEANUP_ICON = "/assets/figma/icons/cleanup.svg";
const POWER_ICON = "/assets/figma/icons/power.svg";
const CHECK_ICON = "/assets/figma/icons/check.svg";

const features = [
  { icon: GPU_ICON, label: "NVIDIA / AMD GPU Tweaks" },
  { icon: NETWORK_ICON, label: "Network Tweaks" },
  { icon: WINDOWS_ICON, label: "Windows Tweaks" },
  { icon: CPU_ICON, label: "NVIDIA / AMD CPU Tweaks" },
  { icon: ADVANCED_ICON, label: "Advanced Tweaks" },
  { icon: CLEANUP_ICON, label: "Windows Clean-up" },
  { icon: POWER_ICON, label: "Power Tweaks" },
];

function CheckmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
        stroke="#3fff8f"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-[120px]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: '#020308' }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[96px]">
        <div className="relative pt-[100px] sm:pt-[138px]">
          <Stagger
            className="mx-auto flex w-full max-w-[783px] flex-col items-center gap-[18px] text-center sm:gap-[22px]"
            staggerMs={150}
            baseDelayMs={100}
          >
            <h1
              className="font-inter text-[32px] font-semibold leading-[1.1] tracking-[-0.64px] sm:text-[48px] sm:tracking-[-0.96px] lg:text-[60px] lg:leading-none lg:tracking-[-1.2px]"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Unlock your true potential
            </h1>

            <p
              className="font-inter text-[15px] font-medium leading-[24px] tracking-[-0.3px] sm:text-[18px] sm:leading-[28px] sm:tracking-[-0.36px]"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Safe, proven Windows optimizations. One clear price.
            </p>
          </Stagger>

          <div className="mt-8 flex flex-col items-center gap-12 sm:mt-[60px] lg:flex-row lg:items-center lg:gap-[130px]">
            <Reveal className="flex shrink-0 flex-col gap-[24px]" delayMs={200}>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[9px]">
                  <div className="flex items-center gap-[50px]">
                    <span
                      className="font-inter text-[17px] font-medium leading-normal tracking-[-0.34px] line-through"
                      style={{ color: 'rgba(63, 219, 255, 0.5)' }}
                    >
                      $49.99
                    </span>

                    <div
                      className="flex items-center gap-[6px] rounded-[10px] px-[10px] py-[6px]"
                      style={{
                        background: 'rgba(63, 255, 143, 0.05)',
                        border: '0.5px solid rgba(63, 219, 255, 0.1)',
                        backdropFilter: 'blur(2px)',
                      }}
                    >
                      <CheckmarkIcon />
                      <span
                        className="font-inter text-[14px] font-medium leading-normal tracking-[-0.28px]"
                        style={{ color: '#3fff8f' }}
                      >
                        30d money back guarantee
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end gap-[12px]">
                    <span
                      className="font-inter text-[42px] font-semibold leading-normal tracking-[-0.84px]"
                      style={{
                        background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      $29.99
                    </span>
                    <span
                      className="font-inter text-[17px] font-medium leading-[1.8] tracking-[-0.34px]"
                      style={{ color: '#808183' }}
                    >
                      Lifetime
                    </span>
                  </div>
                </div>

                <p
                  className="font-inter text-[15px] font-medium leading-normal tracking-[-0.3px]"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Unlock your systems true potential
                  <br />
                  and never look back.
                </p>
              </div>

              <div className="h-px w-full" style={{ background: 'rgba(63, 219, 255, 0.05)' }} />

              <Stagger className="flex w-[240px] flex-col gap-[28px]" staggerMs={60} yPx={10}>
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-[10px]"
                  >
                    <div className="relative h-[18px] w-[18px] shrink-0 overflow-hidden">
                      <img
                        src={feature.icon}
                        alt=""
                        className="absolute inset-[10%] h-[80%] w-[80%] object-contain"
                      />
                    </div>
                    <span
                      className="font-inter text-[15px] font-medium leading-normal tracking-[-0.3px]"
                      style={{ color: '#808183' }}
                    >
                      {feature.label}
                    </span>
                  </div>
                ))}
              </Stagger>

              <div className="h-px w-full" style={{ background: 'rgba(63, 219, 255, 0.05)' }} />

              <PayNowCheckoutButton token="" />
            </Reveal>

            <Reveal
              className="relative hidden shrink-0 overflow-hidden lg:block"
              delayMs={300}
              yPx={40}
            >
              <div
                className="animate-float mockup-hover overflow-hidden"
                style={{
                  width: '858.5px',
                  height: '595px',
                  background: 'linear-gradient(231deg, rgba(16, 16, 16, 1) 2.07%, rgba(11, 11, 11, 1) 101.2%)',
                  borderRadius: '18.7px',
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

                <div
                  className="absolute"
                  style={{
                    left: '631px',
                    top: '0',
                    width: '558px',
                    height: '614px',
                    background: 'linear-gradient(to left, #030409 32.258%, rgba(3, 4, 9, 0) 100%)',
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
