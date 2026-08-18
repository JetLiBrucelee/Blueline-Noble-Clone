export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[hsl(210,20%,6%)] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Logo / wordmark */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex gap-1">
            <div className="w-2 h-8 bg-[hsl(199,89%,48%)] rounded-sm" />
            <div className="w-2 h-8 bg-[hsl(199,89%,48%)]/60 rounded-sm mt-1" />
            <div className="w-2 h-8 bg-[hsl(199,89%,48%)]/30 rounded-sm mt-2" />
          </div>
          <span className="font-display font-800 text-white text-2xl tracking-wide">
            BLUELINE <span className="text-[hsl(199,89%,48%)]">OFFSHORE</span>
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[hsl(210,15%,16%)]" />
          <div className="w-2 h-2 rounded-full bg-[hsl(199,89%,48%)]" />
          <div className="flex-1 h-px bg-[hsl(210,15%,16%)]" />
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[hsl(199,89%,48%)]/10 border border-[hsl(199,89%,48%)]/20 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-[hsl(199,89%,60%)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
            />
          </svg>
        </div>

        <h1 className="font-display font-800 text-white text-3xl md:text-4xl mb-4 leading-tight">
          Website Temporarily Unavailable
        </h1>

        <p className="text-[hsl(210,10%,60%)] text-base leading-relaxed mb-10">
          We are currently performing maintenance. We'll be back online shortly — thank you for your patience.
        </p>

        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-[hsl(199,89%,48%)]/40" />
          <span className="text-[hsl(210,10%,35%)] text-xs tracking-[0.15em] uppercase font-display">
            Service Interruption
          </span>
          <div className="h-px w-12 bg-[hsl(199,89%,48%)]/40" />
        </div>
      </div>
    </div>
  );
}
