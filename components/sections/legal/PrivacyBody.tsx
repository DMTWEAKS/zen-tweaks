import React from "react";

interface PrivacySection {
  number: string;
  title: string;
  content: React.ReactNode;
}

const privacyContent: PrivacySection[] = [
  {
    number: "01",
    title: "OVERVIEW",
    content: (
      <>
        <p className="mb-0">
          Zen Tweaks respects your privacy and is designed to collect as little personal data as possible.
          <br />
          We do not engage in invasive tracking, profiling, or data resale.
        </p>
        <p className="mb-0">&nbsp;</p>
        <p>This policy explains what data is collected, why it is collected, and how it is handled.</p>
      </>
    ),
  },
  {
    number: "02",
    title: "COOKIES & TRACKING",
    content: (
      <>
        <p className="mb-0">We prioritize your privacy and avoid unnecessary tracking.</p>
        <ul className="list-disc pl-[24px]">
          <li className="mb-0">
            No third-party tracking:
            <br />
            Zen Tweaks does not use third-party analytics services (e.g. Google Analytics) or advertising pixels.
          </li>
          <li className="mb-0">
            Functional cookies only:
            <br />
            Cookies are used strictly for authentication, session management, and essential site functionality.
          </li>
          <li>
            Affiliate cookies:
            <br />
            If you visit via an affiliate link, a cookie may be stored to attribute referrals.
            <br />
            This is used solely for reward attribution and contains no personal profiling.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "PAYMENT INFORMATION",
    content: (
      <>
        <p className="mb-0">Zen Tweaks does not store your credit card or banking information.</p>
        <ul className="list-disc pl-[24px]">
          <li className="mb-0">All payments are processed securely through third-party payment providers (e.g. Stripe).</li>
          <li className="mb-0">Zen Tweaks only receives confirmation of payment status, plan details, and applied discounts.</li>
          <li>If cryptocurrency payments are supported, they are processed via blockchain transactions; Zen Tweaks does not have access to private keys or wallets.</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "DATA WE COLLECT",
    content: (
      <>
        <p className="mb-0">Depending on usage, Zen Tweaks may collect limited data such as:</p>
        <ul className="mb-0 list-disc pl-[24px]">
          <li className="mb-0">Account identifiers (e.g. email address or linked account ID, if applicable)</li>
          <li className="mb-0">License or subscription status</li>
          <li className="mb-0">Basic technical information required for functionality (e.g. app version, OS version)</li>
          <li>Support messages you voluntarily send to us</li>
        </ul>
        <p>We do not collect personal files, browsing history, or unrelated system data.</p>
      </>
    ),
  },
  {
    number: "05",
    title: "DATA SHARING",
    content: (
      <>
        <p className="mb-0">Zen Tweaks does not sell, trade, or rent personal data.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Service providers:</p>
        <p className="mb-0">We may share only necessary data with trusted third parties to operate the service, such as:</p>
        <ul className="mb-0 list-disc pl-[24px]">
          <li className="mb-0">Payment processors (for billing)</li>
          <li>Authentication or communication services (if used)</li>
        </ul>
        <p>All service providers are contractually required to protect your data and use it only for the specific service they provide.</p>
      </>
    ),
  },
  {
    number: "06",
    title: "DATA RETENTION",
    content: (
      <ul className="list-disc pl-[24px]">
        <li className="mb-0">Personal data is retained only as long as necessary to operate the service or comply with legal obligations.</li>
        <li>You may request deletion of your personal data unless retention is legally required (e.g. billing records).</li>
      </ul>
    ),
  },
  {
    number: "07",
    title: "YOUR RIGHTS",
    content: (
      <>
        <p className="mb-0">Depending on your jurisdiction, you have the right to:</p>
        <ul className="mb-0 list-disc pl-[24px]">
          <li className="mb-0">Request access to the personal data we hold about you</li>
          <li className="mb-0">Request correction or deletion of your data</li>
          <li className="mb-0">Withdraw consent where applicable</li>
          <li>Contact us regarding privacy-related concerns</li>
        </ul>
        <p>Requests can be made through Zen Tweaks&apos; official support channels.</p>
      </>
    ),
  },
  {
    number: "08",
    title: "DATA SECURITY",
    content: (
      <ul className="list-disc pl-[24px]">
        <li className="mb-0">Zen Tweaks uses reasonable technical and organizational measures to protect personal data.</li>
        <li>However, no system can be guaranteed to be 100% secure, and users acknowledge this risk.</li>
      </ul>
    ),
  },
  {
    number: "09",
    title: "CHILDREN'S PRIVACY",
    content: (
      <p>
        Zen Tweaks is not intended for use by individuals under the age of 13 (or the applicable minimum age in your jurisdiction).
        <br />
        We do not knowingly collect data from children.
      </p>
    ),
  },
  {
    number: "10",
    title: "CHANGES TO THIS POLICY",
    content: (
      <ul className="list-disc pl-[24px]">
        <li className="mb-0">Zen Tweaks may update this Privacy Policy to reflect changes in the service or legal requirements.</li>
        <li>Continued use of Zen Tweaks after updates constitutes acceptance of the revised policy.</li>
      </ul>
    ),
  },
];

export default function PrivacyBody() {
  return (
    <div className="flex w-full max-w-[628px] flex-col items-start gap-8 sm:gap-[42px]">
      {privacyContent.map((section) => (
        <div key={section.number} className="flex w-full flex-col items-start gap-[12px]">
          <h2
            className="w-full font-ibm-plex-mono text-[14px] font-medium uppercase leading-none tracking-[-0.28px] sm:text-[16px] sm:tracking-[-0.32px]"
            style={{ color: '#808183' }}
          >
            {section.number} {section.title}
          </h2>
          
          <div
            className="w-full font-inter text-[14px] font-medium leading-[1.6] tracking-[-0.28px] text-white sm:text-[16px] sm:leading-[1.5] sm:tracking-[-0.32px] [&_ul]:pl-[20px] sm:[&_ul]:pl-[24px] [&_li]:mb-1 sm:[&_li]:mb-0"
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}

