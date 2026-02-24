import Link from "next/link";
import Image from "next/image";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
];

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const socialLinks = [
  {
    href: "https://discord.gg/zentweaks",
    label: "Discord",
  },
  {
    href: "https://youtube.com/@zentweaks",
    label: "Youtube",
  },
  {
    href: "https://twitter.com/zentweaks",
    label: "X (Twitter)",
  },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 w-full"
      style={{ borderTop: '1px solid rgba(63, 219, 255, 0.05)' }}
    >
      <div className="mx-auto max-w-[1440px] px-4 pb-[18px] pt-[48px] sm:px-8 lg:px-[96px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div className="flex w-full flex-col gap-[16px] lg:w-[163px]">
            <Link href="/" className="h-[22px] w-[163px] transition-opacity hover:opacity-80">
              <Image
                src="/assets/zen-tweaks-logo.svg"
                alt="Zen Tweaks"
                width={163}
                height={22}
              />
            </Link>
            <p
              className="font-inter text-[14px] font-medium leading-[1.5] tracking-[-0.28px]"
              style={{ color: '#808183' }}
            >
              Optimize Windows for
              <br />
              maximum performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:gap-[80px]">
            <div className="flex flex-col gap-[14px]">
              <h4
                className="font-ibm-plex-mono text-[12px] font-semibold leading-[1.5]"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                NAVIGATION
              </h4>
              <ul className="flex flex-col gap-[12px]">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-[14px] font-medium tracking-[-0.28px] transition-colors hover:text-white"
                      style={{ color: '#808183' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-[14px]">
              <h4
                className="font-ibm-plex-mono text-[12px] font-semibold leading-[1.5]"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                LEGAL
              </h4>
              <ul className="flex flex-col gap-[12px]">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-[14px] font-medium tracking-[-0.28px] transition-colors hover:text-white"
                      style={{ color: '#808183' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-[14px]">
              <h4
                className="font-ibm-plex-mono text-[12px] font-semibold leading-[1.5]"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                SOCIALS
              </h4>
              <ul className="flex flex-col gap-[12px]">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-[14px] font-medium tracking-[-0.28px] transition-colors hover:text-white"
                      style={{ color: '#808183' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-[206px]">
          <p
            className="text-center font-inter text-[14px] font-medium tracking-[-0.28px]"
            style={{ color: 'rgba(255, 255, 255, 0.3)' }}
          >
            © 2026 Zen Tweaks
          </p>
        </div>
      </div>
    </footer>
  );
}
