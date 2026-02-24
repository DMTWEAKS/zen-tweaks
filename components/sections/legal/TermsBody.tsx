const termsContent = [
  {
    number: "01",
    title: "LICENSE & USAGE",
    items: [
      "Zen Tweaks is licensed, not sold.",
      "Users are granted a non-transferable, non-exclusive license to use Zen Tweaks on their own system(s) according to the purchased plan.",
      "Redistribution, resale, reverse engineering, or modification of Zen Tweaks is prohibited.",
    ],
  },
  {
    number: "02",
    title: "SYSTEM ACCESS & PERMISSIONS",
    items: [
      "Zen Tweaks may require elevated system permissions to apply optimizations.",
      "Users explicitly consent to Zen Tweaks modifying system settings related to performance, networking, and power management.",
      "Zen Tweaks does not access personal files unless explicitly stated.",
    ],
  },
  {
    number: "03",
    title: "REFUND POLICY",
    items: [
      "Zen Tweaks offers a 30-day money-back guarantee from the date of purchase.",
      "Refund requests must be submitted within 30 days and before excessive or unsupported system modifications are made.",
      "Users who reset, reinstall, roll back, or modify their system outside of Zen Tweaks' provided instructions may be denied a refund.",
      "Refunds are issued at Zen Tweaks' discretion once eligibility is reviewed.",
    ],
  },
  {
    number: "04",
    title: "BENCHMARKING & RESULTS",
    items: [
      "Optimization results vary depending on hardware, software configuration, drivers, and usage patterns.",
      "While performance and stability improvements are common, specific FPS, latency, or benchmark results are not guaranteed.",
      "Any benchmarks shown are illustrative examples and may not reflect individual outcomes.",
    ],
  },
  {
    number: "05",
    title: "USER RESPONSIBILITIES",
    items: [
      "Users must follow all instructions provided within Zen Tweaks and its documentation.",
      "Users agree not to apply unsupported third-party tweaks, scripts, or system modifications alongside Zen Tweaks unless explicitly stated as compatible.",
      "Any issues should be reported to Zen Tweaks support before attempting system resets or manual fixes.",
    ],
  },
  {
    number: "06",
    title: "LIABILITY DISCLAIMER",
    items: [
      "Zen Tweaks is not responsible for system instability, data loss, or performance issues caused by hardware limitations, outdated drivers, third-party software, or unsupported changes.",
      "Zen Tweaks does not guarantee uninterrupted or error-free operation on all systems.",
      "By using Zen Tweaks, the user acknowledges that system-level optimizations inherently carry risk.",
      "Gap fixed: explicitly mentions data loss and system-level risk.",
    ],
  },
  {
    number: "07",
    title: "COMMUNICATION & SUPPORT",
    items: [
      "Zen Tweaks provides support through official channels only (e.g. website, email, or official Discord if applicable).",
      "Direct messages outside of official channels are not guaranteed to receive support.",
      "Zen Tweaks reserves the right to limit or refuse support in cases of abuse, misinformation, or violation of these terms.",
    ],
  },
  {
    number: "08",
    title: "UPDATES & CHANGES",
    items: [
      "Zen Tweaks may update, modify, or remove features at any time to improve stability, security, or compatibility.",
      "Continued use of Zen Tweaks after updates constitutes acceptance of those changes.",
    ],
  },
  {
    number: "09",
    title: "TERMINATION",
    items: [
      "Zen Tweaks reserves the right to suspend or terminate access if these terms are violated.",
      "Termination does not automatically entitle the user to a refund.",
    ],
  },
  {
    number: "10",
    title: "GOVERNING LAW",
    items: [
      "These terms are governed by the laws of the applicable jurisdiction in which Zen Tweaks operates.",
      "Any disputes will be handled under that jurisdiction.",
    ],
  },
];

export default function TermsBody() {
  return (
    <div className="flex w-full max-w-[628px] flex-col items-start gap-8 sm:gap-[42px]">
      {termsContent.map((section) => (
        <div key={section.number} className="flex w-full flex-col items-start gap-[12px]">
          <h2
            className="w-full font-ibm-plex-mono text-[14px] font-medium uppercase leading-none tracking-[-0.28px] sm:text-[16px] sm:tracking-[-0.32px]"
            style={{ color: '#808183' }}
          >
            {section.number} {section.title}
          </h2>
          
          <ul
            className="w-full list-disc pl-[20px] font-inter text-[14px] font-medium leading-[1.6] tracking-[-0.28px] text-white sm:pl-[24px] sm:text-[16px] sm:leading-[1.5] sm:tracking-[-0.32px]"
          >
            {section.items.map((item, index) => (
              <li key={index} className="mb-1 sm:mb-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

