import Link from "next/link";

export default function SuccessHero() {
  return (
    <section className="relative min-h-screen text-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-400 relative"
                aria-hidden="true"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Purchase Complete!</h1>
          <p className="text-lg text-slate-300">
            Thank you for choosing Zen Tweaks. We&apos;re ready to optimize your system!
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {/* Step 1 */}
          <a
            href="https://gmail.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors block"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-black text-xs font-bold rounded-full">
                1
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-cyan-400"
                aria-hidden="true"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <h3 className="text-lg font-semibold">License Key</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your license key has been sent to your email. If you can&apos;t find it, check your spam folder or email promotions.
            </p>
            <span className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
              Open Gmail →
            </span>
          </a>

          {/* Step 2 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-black text-xs font-bold rounded-full">
                2
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-cyan-400"
                aria-hidden="true"
              >
                <path d="M12 7v14" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
              </svg>
              <h3 className="text-lg font-semibold">Setup Guide</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Follow our detailed setup guide to get Zen Tweaks installed and configured properly.
            </p>
            <a
              href="https://zen-tweaks.gitbook.io/zen-tweaks-setup-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              View Setup Guide →
            </a>
          </div>

          {/* Step 3 */}
          <a
            href="https://discord.gg/zentweaks"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors block"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-black text-xs font-bold rounded-full">
                3
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-cyan-400"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <h3 className="text-lg font-semibold">Need Help?</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Having trouble? Our support team is here to help. Reach out via a Discord support ticket.
            </p>
            <span className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
              Join Our Discord! →
            </span>
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://zen-tweaks.gitbook.io/zen-tweaks-setup-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-2 text-sm transition-colors"
          >
            Get Started with Setup
          </a>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-2 text-sm transition-colors"
          >
            Back to Website
          </Link>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-12 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Questions? Join our Discord community for support.
          </p>
          <a
            href="https://discord.gg/zentweaks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors mb-4"
          >
            discord.gg/zentweaks
          </a>
          <p className="text-slate-500 text-xs">© 2026 Zen Tweaks. All rights reserved.</p>
        </div>

      </div>
    </section>
  );
}
