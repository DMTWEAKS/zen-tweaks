/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/motion";

const FORTNITE_LOGO = "/assets/figma/images/logo-fortnite.png";
const VALORANT_LOGO = "/assets/figma/images/logo-valorant.png";
const WARZONE_LOGO = "/assets/figma/images/logo-warzone.png";
const DBD_LOGO = "/assets/figma/images/logo-dbd.png";

export default function GameLogosRow() {
  return (
    <Reveal yPx={0} threshold={0.5}>
      <section
        className="w-full border-y px-4 sm:px-8 lg:px-[96px]"
        style={{ borderColor: 'rgba(63, 219, 255, 0.05)' }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between sm:gap-0 sm:py-0">
          <div className="hidden items-center justify-center sm:flex sm:pl-[16px]">
            <p
              className="w-[189px] font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px]"
              style={{ color: '#808183' }}
            >
              Improve performance in your favourite games.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:flex sm:h-[130px] sm:items-center sm:gap-0 sm:overflow-hidden">
            <div
              className="flex h-[80px] w-full items-center justify-center overflow-hidden rounded-lg sm:h-[127px] sm:w-[200px] sm:rounded-none sm:border-x"
              style={{ borderColor: 'rgba(63, 219, 255, 0.05)', background: 'rgba(63, 219, 255, 0.02)' }}
            >
              <img
                src={FORTNITE_LOGO}
                alt="Fortnite"
                className="h-[18px] w-[75px] object-contain sm:h-[23px] sm:w-[94px]"
              />
            </div>

            <div
              className="flex h-[80px] w-full items-center justify-center overflow-hidden rounded-lg sm:h-[127px] sm:w-[200px] sm:rounded-none sm:border-r"
              style={{ borderColor: 'rgba(63, 219, 255, 0.05)', background: 'rgba(63, 219, 255, 0.02)' }}
            >
              <img
                src={VALORANT_LOGO}
                alt="Valorant"
                className="h-[40px] w-[72px] object-contain sm:h-[50px] sm:w-[89px]"
              />
            </div>

            <div
              className="flex h-[80px] w-full items-center justify-center overflow-hidden rounded-lg sm:h-[127px] sm:w-[200px] sm:rounded-none sm:border-r"
              style={{ borderColor: 'rgba(63, 219, 255, 0.05)', background: 'rgba(63, 219, 255, 0.02)' }}
            >
              <img
                src={WARZONE_LOGO}
                alt="Call of Duty Warzone"
                className="h-[29px] w-[90px] object-contain sm:h-[36px] sm:w-[112px]"
              />
            </div>

            <div
              className="flex h-[80px] w-full items-center justify-center overflow-hidden rounded-lg sm:h-[127px] sm:w-[200px] sm:rounded-none sm:border-r"
              style={{ borderColor: 'rgba(63, 219, 255, 0.05)', background: 'rgba(63, 219, 255, 0.02)' }}
            >
              <img
                src={DBD_LOGO}
                alt="Dead by Daylight"
                className="h-[47px] w-[59px] object-contain sm:h-[59px] sm:w-[74px]"
              />
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
