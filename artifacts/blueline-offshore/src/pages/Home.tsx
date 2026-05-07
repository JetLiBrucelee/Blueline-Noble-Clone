import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Shield, Award, Clock, Globe2, Anchor, Waves, Cpu, Wrench, Users, BarChart3, Play, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const heroImages = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=85&auto=format&fit=crop",
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "35", label: "Vessels in Fleet" },
  { value: "50+", label: "Countries Served" },
];

const services = [
  {
    icon: Anchor,
    title: "Marine Construction",
    desc: "Comprehensive offshore marine construction services including platform installation, jacket fabrication, and complex subsea structures.",
    href: "/services#marine-construction",
  },
  {
    icon: Waves,
    title: "Diving Operations",
    desc: "World-class saturation and air diving services with IMCA-certified teams operating at depths up to 300 meters.",
    href: "/services#diving",
  },
  {
    icon: Cpu,
    title: "Subsea Engineering",
    desc: "Advanced subsea engineering solutions integrating cutting-edge technology for complex deepwater challenges.",
    href: "/services#subsea",
  },
  {
    icon: Wrench,
    title: "Pipeline Services",
    desc: "Full lifecycle pipeline inspection, installation, repair, and decommissioning across all water depths.",
    href: "/services#pipeline",
  },
  {
    icon: Globe2,
    title: "ROV Operations",
    desc: "State-of-the-art remotely operated vehicles providing visual inspection, survey, and intervention services.",
    href: "/services#rov",
  },
  {
    icon: BarChart3,
    title: "Project Management",
    desc: "Integrated EPCI project management with an unbroken record of on-time, on-budget delivery.",
    href: "/services#project-management",
  },
];

const certifications = [
  { label: "ISO 9001:2015", sub: "Quality Management" },
  { label: "ISO 14001", sub: "Environmental" },
  { label: "OHSAS 18001", sub: "Safety Management" },
  { label: "IMCA Member", sub: "Diving & ROV" },
  { label: "API Certified", sub: "Petroleum Standards" },
];

const featuredProjects = [
  {
    title: "North Sea Platform Installation",
    location: "North Sea, UK Sector",
    year: "2023",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop",
    category: "Marine Construction",
  },
  {
    title: "Gulf Deepwater Pipeline",
    location: "Gulf of Mexico",
    year: "2023",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&auto=format&fit=crop",
    category: "Pipeline Services",
  },
  {
    title: "Subsea Riser Replacement",
    location: "Gulf of Mexico",
    year: "2022",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop",
    category: "Subsea Engineering",
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        const numericPart = parseInt(target.replace(/\D/g, ""), 10);
        const nonNumeric = target.replace(/\d/g, "");
        let start = 0;
        const duration = 2000;
        const step = 16;
        const increment = numericPart / (duration / step);

        const timer = setInterval(() => {
          start += increment;
          if (start >= numericPart) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start) + nonNumeric);
          }
        }, step);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const servicesRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();
  const projectsRef = useScrollReveal<HTMLDivElement>();
  const certsRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        {/* Background images with crossfade */}
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1500"
            style={{ opacity: i === heroIdx ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover scale-105 img-zoom"
              style={{ transform: i === heroIdx ? "scale(1.08)" : "scale(1)" }}
            />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 gradient-hero" />
        {/* Animated hex pattern */}
        <div className="absolute inset-0 hex-pattern opacity-30" />

        {/* Ocean wave bottom */}
        <div className="ocean-wave" />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 10}s`,
                width: Math.random() > 0.5 ? "3px" : "2px",
                height: Math.random() > 0.5 ? "3px" : "2px",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pt-28 pb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(199,89%,48%)]/40 bg-[hsl(199,89%,48%)]/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-[hsl(199,89%,60%)] animate-pulse" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,70%)] uppercase">
              World-Class Offshore Solutions
            </span>
          </div>

          <h1 className="font-display font-900 text-white leading-none mb-6">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
              PIONEERING THE
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight gradient-text glow-ocean-text mt-2">
              DEEP BLUE
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mt-2">
              FRONTIER
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[hsl(210,10%,75%)] text-lg md:text-xl leading-relaxed mb-10">
            Blueline Offshore delivers world-class marine construction, diving, and subsea engineering
            services across the globe, safely, efficiently, and with uncompromising quality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services" data-testid="button-hero-services"
                className="group px-8 py-4 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-display font-700 text-sm tracking-wide rounded transition-all duration-300 glow-ocean flex items-center gap-3">
                Explore Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            <button
              data-testid="button-hero-video"
              onClick={() => setVideoOpen(true)}
              className="group px-8 py-4 border border-white/30 hover:border-white/60 text-white font-display font-600 text-sm tracking-wide rounded backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors">
                <Play size={14} fill="white" />
              </div>
              Watch Our Story
            </button>
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-14">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === heroIdx ? "w-8 h-2 bg-[hsl(199,89%,60%)]" : "w-2 h-2 bg-white/30"
                }`}
                data-testid={`hero-dot-${i}`}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase font-display">Scroll</span>
            <ChevronDown size={20} className="text-white/40" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[hsl(199,89%,38%)] py-10" data-testid="section-stats">
        <div ref={statsRef} className="reveal-up max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  i < stats.length - 1 ? "md:border-r border-white/20" : ""
                }`}
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="font-display font-900 text-4xl md:text-5xl text-white">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="font-display text-white/70 text-sm tracking-[0.1em] uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-24 md:py-32" data-testid="section-about-intro">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
                <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="font-display font-800 text-white text-4xl md:text-5xl leading-tight mb-6">
                Trusted Partner in<br />
                <span className="gradient-text">Offshore Excellence</span>
              </h2>
              <p className="text-[hsl(210,10%,65%)] leading-relaxed mb-6">
                Founded in 1987, Blueline Offshore has grown from a regional diving contractor into a
                globally recognized offshore services company. We operate across six continents, delivering
                complex marine projects safely and efficiently.
              </p>
              <p className="text-[hsl(210,10%,65%)] leading-relaxed mb-8">
                Our multidisciplinary team of 2,000+ professionals brings together expertise in marine
                engineering, naval architecture, diving operations, and project management, all aligned
                by our unwavering commitment to safety and quality.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, label: "Zero Harm Philosophy" },
                  { icon: Award, label: "ISO 9001 Certified" },
                  { icon: Clock, label: "24/7 Global Support" },
                  { icon: Globe2, label: "50+ Countries" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[hsl(199,89%,48%)]/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[hsl(199,89%,60%)]" />
                    </div>
                    <span className="text-[hsl(210,10%,75%)] text-sm font-500">{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" data-testid="button-learn-more"
                  className="inline-flex items-center gap-2 text-[hsl(199,89%,60%)] font-display font-600 text-sm tracking-wide hover:gap-4 transition-all duration-300">
                  Learn More About Us <ArrowRight size={16} />
                </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
                <img
                  src="https://i.ytimg.com/vi/PCGeQdZpO6A/maxresdefault.jpg"
                  alt="Offshore operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,20%,8%)]/60 to-transparent" />
              </div>
              {/* Float card */}
              <div className="absolute -bottom-6 -left-6 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-xl p-5 shadow-2xl max-w-[200px]">
                <div className="font-display font-900 text-3xl text-[hsl(199,89%,60%)]">20+</div>
                <div className="text-[hsl(210,10%,60%)] text-xs mt-1 leading-snug">Years of offshore expertise</div>
              </div>
              {/* Accent lines */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-[hsl(199,89%,48%)]/30 rounded-tr-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-[hsl(199,89%,48%)]/30 rounded-bl-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="py-24 relative overflow-hidden" data-testid="section-video-banner">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80&auto=format&fit=crop"
            className="w-full h-full object-cover"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-diver-under-the-water-4116-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-drone-flying-past-a-cargo-ship-11937-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-sailing-in-the-sea-35347-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-[hsl(210,20%,8%)]/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
              See Us In Action
            </span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h2 className="font-display font-800 text-white text-4xl md:text-5xl leading-tight mb-4 max-w-2xl">
            World-Class Operations<br />at Every Depth
          </h2>
          <p className="text-[hsl(210,10%,70%)] max-w-xl mb-10">
            From shallow coastal waters to the deepest offshore frontiers, our teams execute with precision, safety, and speed.
          </p>
          <button
            onClick={() => setVideoOpen(true)}
            data-testid="button-video-play"
            className="group relative w-24 h-24 rounded-full bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] flex items-center justify-center transition-all duration-300 glow-ocean"
          >
            <div className="absolute inset-0 rounded-full bg-[hsl(199,89%,48%)] animate-ping opacity-30" />
            <Play size={32} fill="white" className="ml-1" />
          </button>
          <p className="mt-6 text-[hsl(210,10%,55%)] text-sm">Watch our corporate overview video</p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 md:py-32 bg-[hsl(210,22%,7%)] hex-pattern" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
              <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                What We Do
              </span>
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            </div>
            <h2 className="font-display font-800 text-white text-4xl md:text-5xl leading-tight">
              Our Core Services
            </h2>
            <p className="mt-4 text-[hsl(210,10%,60%)] max-w-xl mx-auto">
              Integrated offshore solutions designed to meet the most challenging requirements in the industry.
            </p>
          </div>

          <div ref={servicesRef} className="reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, href }) => (
              <Link key={title} href={href} data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/40 rounded-xl p-8 transition-all duration-500 card-3d cursor-pointer block">
                  <div className="w-14 h-14 rounded-xl bg-[hsl(199,89%,48%)]/10 border border-[hsl(199,89%,48%)]/20 flex items-center justify-center mb-6 group-hover:bg-[hsl(199,89%,48%)]/20 transition-colors">
                    <Icon size={26} className="text-[hsl(199,89%,60%)] service-icon-glow" />
                  </div>
                  <h3 className="font-display font-700 text-white text-xl mb-3">{title}</h3>
                  <p className="text-[hsl(210,10%,60%)] text-sm leading-relaxed mb-5">{desc}</p>
                  <div className="flex items-center gap-2 text-[hsl(199,89%,60%)] text-sm font-600 group-hover:gap-4 transition-all">
                    Learn More <ArrowRight size={14} />
                  </div>
                </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" data-testid="button-all-services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[hsl(199,89%,48%)]/40 hover:border-[hsl(199,89%,48%)] text-[hsl(199,89%,60%)] hover:text-white font-display font-600 text-sm tracking-wide rounded transition-all duration-300">
                View All Services <ArrowRight size={16} />
              </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-24 md:py-32" data-testid="section-projects">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
                <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                  Our Work
                </span>
              </div>
              <h2 className="font-display font-800 text-white text-4xl md:text-5xl leading-tight">
                Featured Projects
              </h2>
            </div>
            <Link href="/projects" data-testid="button-view-all-projects"
                className="inline-flex items-center gap-2 text-[hsl(199,89%,60%)] font-display font-600 text-sm hover:gap-4 transition-all">
                View All Projects <ArrowRight size={16} />
              </Link>
          </div>

          <div ref={projectsRef} className="reveal-up grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((proj) => (
              <Link key={proj.title} href="/projects" data-testid={`card-project-${proj.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group relative rounded-xl overflow-hidden cursor-pointer block"
                  style={{ aspectRatio: "3/4" }}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,20%,6%)]/95 via-[hsl(210,20%,6%)]/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[hsl(199,89%,48%)] text-white text-xs font-display font-600 tracking-wide rounded-full">
                      {proj.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[hsl(210,10%,55%)] text-xs font-display font-600 tracking-wide mb-2">
                      {proj.location} · {proj.year}
                    </div>
                    <h3 className="font-display font-700 text-white text-xl leading-snug mb-4">{proj.title}</h3>
                    <div className="flex items-center gap-2 text-[hsl(199,89%,60%)] text-sm font-600 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      View Project <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-[hsl(210,22%,7%)]" data-testid="section-why">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
              <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                Why Blueline
              </span>
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            </div>
            <h2 className="font-display font-800 text-white text-4xl md:text-5xl">
              The Blueline Advantage
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Safety First",
                desc: "Our Zero Harm philosophy drives every decision. Industry-leading TRIR with over 10 million man-hours LTI free.",
              },
              {
                icon: Award,
                title: "Proven Track Record",
                desc: "500+ successfully completed projects across 50+ countries, on time and within budget.",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "2,000+ highly skilled professionals including certified engineers, divers, ROV pilots, and project managers.",
              },
              {
                icon: Cpu,
                title: "Advanced Technology",
                desc: "Cutting-edge equipment including deep-water ROVs, saturation diving systems, and precision DP vessels.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                data-testid={`card-why-${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="animated-border gradient-card rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[hsl(199,89%,48%)]/10 flex items-center justify-center mx-auto mb-6">
                  <Icon size={28} className="text-[hsl(199,89%,60%)]" />
                </div>
                <h3 className="font-display font-700 text-white text-lg mb-3">{title}</h3>
                <p className="text-[hsl(210,10%,58%)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-16 border-y border-[hsl(210,15%,14%)]" data-testid="section-certifications">
        <div ref={certsRef} className="reveal-up max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(210,10%,50%)] uppercase">
              Certifications & Memberships
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {certifications.map((cert) => (
              <div key={cert.label} className="text-center group" data-testid={`cert-${cert.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="font-display font-800 text-xl text-white group-hover:text-[hsl(199,89%,60%)] transition-colors">
                  {cert.label}
                </div>
                <div className="text-[hsl(210,10%,50%)] text-xs mt-1">{cert.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
          data-testid="modal-video"
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              data-testid="button-close-video"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black transition-colors"
            >
              <X size={20} />
            </button>
            <div style={{ aspectRatio: "16/9" }} className="bg-black">
              <iframe
                data-testid="video-player"
                className="w-full h-full"
                src="https://www.youtube.com/embed/DmOZEt9DwRE?autoplay=1&rel=0&modestbranding=1"
                title="Blueline Offshore Corporate Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
