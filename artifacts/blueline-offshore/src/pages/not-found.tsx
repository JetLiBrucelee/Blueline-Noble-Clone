import { Link } from "wouter";
import { ArrowRight, Anchor } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-background">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-2xl bg-[hsl(199,89%,48%)]/10 border border-[hsl(199,89%,48%)]/20 flex items-center justify-center mx-auto mb-8">
          <Anchor size={36} className="text-[hsl(199,89%,60%)]" />
        </div>
        <div className="font-display font-900 text-[hsl(199,89%,48%)] text-8xl mb-4">404</div>
        <h1 className="font-display font-800 text-white text-3xl mb-4">Page Not Found</h1>
        <p className="text-[hsl(210,10%,58%)] leading-relaxed mb-8">
          The page you're looking for has drifted off course. Let us help you navigate back to safe waters.
        </p>
        <Link href="/" data-testid="link-go-home"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-display font-700 text-sm tracking-wide rounded transition-all glow-ocean">
            Return to Homepage <ArrowRight size={16} />
          </Link>
      </div>
    </div>
  );
}
