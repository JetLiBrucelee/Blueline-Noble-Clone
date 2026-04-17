import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Marine Construction", href: "/services#marine-construction" },
      { label: "Diving Operations", href: "/services#diving" },
      { label: "Subsea Engineering", href: "/services#subsea" },
      { label: "Project Management", href: "/services#project-management" },
      { label: "ROV Operations", href: "/services#rov" },
      { label: "Pipeline Services", href: "/services#pipeline" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/fleet", label: "Fleet" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:flex bg-[hsl(210,60%,10%)] text-[hsl(210,10%,70%)] text-xs py-2 px-8 justify-end gap-8 border-b border-[hsl(210,15%,16%)]">
        <a
          href="tel:+17745648357"
          className="flex items-center gap-2 hover:text-[hsl(199,89%,60%)] transition-colors"
          data-testid="link-topbar-phone"
        >
          <Phone size={12} />
          (774) 564-8357
        </a>
        <a
          href="mailto:support@bluelineoffshore.com"
          className="flex items-center gap-2 hover:text-[hsl(199,89%,60%)] transition-colors"
          data-testid="link-topbar-email"
        >
          <Mail size={12} />
          support@bluelineoffshore.com
        </a>
      </div>

      {/* Main nav */}
      <header
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[hsl(210,20%,6%)]/97 backdrop-blur-md shadow-2xl border-b border-[hsl(199,89%,48%)]/20"
            : "bg-transparent"
        }`}
        style={{ top: scrolled ? 0 : 28 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full bg-[hsl(199,89%,48%)] opacity-20 group-hover:opacity-30 transition-opacity" />
                  <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                    <circle cx="20" cy="20" r="18" stroke="hsl(199,89%,48%)" strokeWidth="2" />
                    <path d="M8 24 Q14 16 20 20 Q26 24 32 16" stroke="hsl(199,89%,60%)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M8 28 Q14 20 20 24 Q26 28 32 20" stroke="hsl(199,89%,48%)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                    <circle cx="20" cy="14" r="3" fill="hsl(45,90%,55%)" />
                    <line x1="20" y1="11" x2="20" y2="5" stroke="hsl(45,90%,55%)" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <div className="font-display font-800 text-white text-lg leading-none tracking-wider">
                    BLUELINE
                  </div>
                  <div className="font-display text-[hsl(199,89%,60%)] text-xs tracking-[0.25em] uppercase leading-none mt-0.5">
                    OFFSHORE
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-display font-600 tracking-wide nav-link-effect transition-colors ${
                        isActive(link.href)
                          ? "text-[hsl(199,89%,60%)] active"
                          : "text-[hsl(210,10%,80%)] hover:text-white"
                      }`}
                      data-testid={`nav-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 rounded-lg bg-[hsl(210,22%,9%)] border border-[hsl(210,15%,18%)] shadow-2xl overflow-hidden z-50">
                        {link.children.map((child) => (
                          <Link key={child.label} href={child.href}>
                            <span className="block px-4 py-3 text-sm text-[hsl(210,10%,75%)] hover:text-white hover:bg-[hsl(199,89%,48%)]/10 transition-colors border-b border-[hsl(210,15%,14%)] last:border-0 cursor-pointer">
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`px-4 py-2 text-sm font-display font-600 tracking-wide nav-link-effect transition-colors cursor-pointer ${
                        isActive(link.href)
                          ? "text-[hsl(199,89%,60%)] active"
                          : "text-[hsl(210,10%,80%)] hover:text-white"
                      }`}
                      data-testid={`nav-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              )}
              <Link href="/contact">
                <span
                  className="ml-4 px-5 py-2.5 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white text-sm font-display font-700 tracking-wide rounded transition-all duration-300 glow-ocean cursor-pointer"
                  data-testid="nav-cta"
                >
                  Get a Quote
                </span>
              </Link>
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[hsl(210,20%,6%)]/98 backdrop-blur-md border-t border-[hsl(210,15%,14%)] mobile-menu-enter">
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href || link.label} href={link.href || "/"}>
                  <span
                    className={`block px-3 py-3 text-sm font-display font-600 tracking-wide rounded-lg transition-colors cursor-pointer ${
                      isActive(link.href || "/")
                        ? "text-[hsl(199,89%,60%)] bg-[hsl(199,89%,48%)]/10"
                        : "text-[hsl(210,10%,80%)] hover:text-white hover:bg-[hsl(210,18%,14%)]"
                    }`}
                    data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <span className="block mt-4 px-5 py-3 bg-[hsl(199,89%,48%)] text-white text-sm font-display font-700 tracking-wide rounded text-center cursor-pointer">
                  Get a Quote
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
