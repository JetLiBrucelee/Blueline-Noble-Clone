import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsl(210,25%,5%)] border-t border-[hsl(210,15%,12%)]">
      {/* CTA Band */}
      <div className="bg-[hsl(199,89%,38%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-800 text-white text-2xl">Ready to Start Your Project?</h3>
            <p className="text-white/80 text-sm mt-1">
              Our experts are standing by to discuss your offshore requirements.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/contact" data-testid="footer-cta-quote"
                className="px-6 py-3 bg-white text-[hsl(199,89%,38%)] font-display font-700 text-sm tracking-wide rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
                Request a Quote <ArrowRight size={16} />
              </Link>
            <a
              href="tel:+17745648357"
              className="px-6 py-3 border border-white/50 text-white font-display font-600 text-sm tracking-wide rounded hover:bg-white/10 transition-colors"
              data-testid="footer-cta-call"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 flex-shrink-0">
                <circle cx="20" cy="20" r="18" stroke="hsl(199,89%,48%)" strokeWidth="2" />
                <path d="M8 24 Q14 16 20 20 Q26 24 32 16" stroke="hsl(199,89%,60%)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M8 28 Q14 20 20 24 Q26 28 32 20" stroke="hsl(199,89%,48%)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                <circle cx="20" cy="14" r="3" fill="hsl(45,90%,55%)" />
                <line x1="20" y1="11" x2="20" y2="5" stroke="hsl(45,90%,55%)" strokeWidth="1.5" />
              </svg>
              <div>
                <div className="font-display font-800 text-white text-lg leading-none tracking-wider">BLUELINE</div>
                <div className="font-display text-[hsl(199,89%,60%)] text-xs tracking-[0.25em] uppercase mt-0.5">OFFSHORE</div>
              </div>
            </div>
            <p className="text-[hsl(210,10%,55%)] text-sm leading-relaxed mb-6">
              A world-class offshore services company delivering excellence in marine construction, diving operations, and subsea engineering since 1987.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-testid={`social-${label.toLowerCase()}`}
                  className="w-9 h-9 rounded-full border border-[hsl(210,15%,20%)] flex items-center justify-center text-[hsl(210,10%,55%)] hover:text-[hsl(199,89%,60%)] hover:border-[hsl(199,89%,48%)] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-700 text-white text-sm tracking-[0.15em] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Fleet", href: "/fleet" },
                { label: "Careers", href: "/careers" },
                { label: "News & Media", href: "/news" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[hsl(210,10%,55%)] text-sm hover:text-[hsl(199,89%,60%)] transition-colors flex items-center gap-2 group"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-700 text-white text-sm tracking-[0.15em] uppercase mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Marine Construction", href: "/services#marine-construction" },
                { label: "Diving Operations", href: "/services#diving" },
                { label: "Subsea Engineering", href: "/services#subsea" },
                { label: "ROV Operations", href: "/services#rov" },
                { label: "Pipeline Services", href: "/services#pipeline" },
                { label: "Project Management", href: "/services#project-management" },
              ].map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className="text-[hsl(210,10%,55%)] text-sm hover:text-[hsl(199,89%,60%)] transition-colors flex items-center gap-2 group"
                      data-testid={`footer-service-${service.label.toLowerCase().replace(/\s+/g, "-")}`}>
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {service.label}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-700 text-white text-sm tracking-[0.15em] uppercase mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {[
                { line1: "42 Broadway", line2: "New York, NY 10004, USA" },
                { line1: "4209 N Kings Hwy", line2: "Myrtle Beach, SC 29577, USA" },
                { line1: "621 W 6th Ave", line2: "Anchorage, AK 99501, USA" },
              ].map((addr) => (
                <li key={addr.line2} className="flex items-start gap-3">
                  <MapPin size={16} className="text-[hsl(199,89%,48%)] mt-0.5 flex-shrink-0" />
                  <span className="text-[hsl(210,10%,55%)] text-sm leading-relaxed">
                    {addr.line1}<br />
                    {addr.line2}
                  </span>
                </li>
              ))}
              <li>
                <a
                  href="tel:+17745648357"
                  className="flex items-center gap-3 text-[hsl(210,10%,55%)] text-sm hover:text-[hsl(199,89%,60%)] transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone size={16} className="text-[hsl(199,89%,48%)] flex-shrink-0" />
                  (774) 564-8357
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@bluelineoffshore.com"
                  className="flex items-center gap-3 text-[hsl(210,10%,55%)] text-sm hover:text-[hsl(199,89%,60%)] transition-colors"
                  data-testid="footer-email"
                >
                  <Mail size={16} className="text-[hsl(199,89%,48%)] flex-shrink-0" />
                  support@bluelineoffshore.com
                </a>
              </li>
            </ul>

            <div className="mt-8 p-4 rounded-lg border border-[hsl(210,15%,16%)] bg-[hsl(210,18%,8%)]">
              <p className="text-xs text-[hsl(210,10%,50%)] uppercase tracking-wider font-display font-600 mb-1">
                Emergency 24/7
              </p>
              <a href="tel:+17745648357" className="text-[hsl(199,89%,60%)] font-display font-700 text-lg hover:text-white transition-colors">
                (774) 564-8357
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[hsl(210,15%,10%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[hsl(210,10%,40%)] text-xs">
            © {new Date().getFullYear()} Blueline Offshore. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[hsl(210,10%,40%)] text-xs hover:text-[hsl(199,89%,60%)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[hsl(210,10%,40%)] text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
