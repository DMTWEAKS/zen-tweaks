const EXTERNAL_LINK_ICON = "/assets/figma/icons/external-link.svg";

interface LegalFooterNoteProps {
  agreementText: string;
}

export default function LegalFooterNote({ agreementText }: LegalFooterNoteProps) {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-[96px]">
      <div
        className="flex min-h-[114px] w-full flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:pb-0 sm:pt-[48px]"
        style={{ borderTop: '1px solid rgba(63, 219, 255, 0.05)' }}
      >
        <div className="flex flex-col items-start">
          <p
            className="w-full max-w-[434px] font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px] sm:text-[16px] sm:tracking-[-0.32px]"
            style={{ color: '#808183' }}
          >
            {agreementText}
          </p>
        </div>

        <div className="flex flex-col items-start gap-[12px] sm:items-end">
          <p
            className="font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px]"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Contact us on Discord
          </p>
          
          <a
            href="https://discord.gg/zentweaks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[8px]"
          >
            <span
              className="font-inter text-[14px] font-medium leading-[1.35] tracking-[-0.28px] underline decoration-dotted"
              style={{
                color: '#3fdbff',
                textDecorationColor: 'rgba(63, 219, 255, 0.25)',
                textUnderlineOffset: '30%',
              }}
            >
              Join our Discord
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={EXTERNAL_LINK_ICON}
              alt=""
              className="h-[12px] w-[12px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

