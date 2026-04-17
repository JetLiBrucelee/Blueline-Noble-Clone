import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Anchor, Waves, Cpu, Wrench, Globe2, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    id: "marine-construction",
    icon: Anchor,
    title: "Marine Construction",
    tagline: "Building the Infrastructure of Tomorrow",
    desc: "Blueline Offshore is a leading provider of marine construction services, offering turnkey solutions from concept through to commissioning. Our highly experienced teams deploy advanced vessels and equipment to deliver the most complex offshore structural projects safely and efficiently.",
    capabilities: [
      "Platform and jacket installation",
      "Topside lifts and mating operations",
      "Subsea structure installation",
      "Pipelaying and trenching",
      "Mooring and anchor installation",
      "Marine spread management",
    ],
    image: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "diving",
    icon: Waves,
    title: "Diving Operations",
    tagline: "Certified Excellence from Surface to Seabed",
    desc: "Our IMCA-certified diving teams operate worldwide, providing both air and saturation diving services. With a relentless focus on diver safety and operational efficiency, Blueline's diving division has accumulated over 10 million incident-free man-hours.",
    capabilities: [
      "Saturation diving to 300m",
      "Air diving operations",
      "Underwater welding & cutting",
      "Structural inspection & repair",
      "Pipeline tie-in and intervention",
      "Diver-operated tooling",
    ],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "subsea",
    icon: Cpu,
    title: "Subsea Engineering",
    tagline: "Precision Solutions for the Deep Ocean",
    desc: "Our subsea engineering group combines world-class expertise in structural, mechanical, and flow assurance engineering to deliver technically complex solutions for the most challenging deepwater environments.",
    capabilities: [
      "Deepwater FEED and detailed design",
      "Flowline and riser engineering",
      "Manifold and PLEM design",
      "Structural analysis & integrity",
      "Subsea controls & electrical",
      "Decommissioning engineering",
    ],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "rov",
    icon: Globe2,
    title: "ROV Operations",
    tagline: "Remote Precision at Any Depth",
    desc: "Blueline operates an advanced fleet of observation and work-class ROVs, providing visual inspection, survey, and complex intervention services in water depths exceeding 3,000 meters.",
    capabilities: [
      "Work-class ROV operations",
      "Observation & inspection ROVs",
      "ROV-based tooling operations",
      "Subsea survey services",
      "Trenching and burial ROVs",
      "3,000m+ depth capability",
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "pipeline",
    icon: Wrench,
    title: "Pipeline Services",
    tagline: "Full Lifecycle Pipeline Excellence",
    desc: "From new build installation to life extension and decommissioning, our pipeline services cover the complete asset lifecycle. We deploy specialized vessels and equipment suited to every pipeline challenge.",
    capabilities: [
      "S-lay and J-lay installation",
      "Pipeline inspection (ILI & ROV)",
      "Hot tap and stopple operations",
      "Riser and spool fabrication",
      "Pipeline repair and rehabilitation",
      "Decommissioning and removal",
    ],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "project-management",
    icon: BarChart3,
    title: "Project Management",
    tagline: "Integrated EPCI Delivery",
    desc: "Our project management capabilities span the full EPCI value chain. We integrate engineering, procurement, construction, and installation with a proven project delivery framework that ensures schedule, cost, and quality are never compromised.",
    capabilities: [
      "Full EPCI management",
      "Schedule & cost control",
      "Risk management",
      "Supply chain management",
      "HSE & quality assurance",
      "Stakeholder reporting",
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  },
];

export default function Services() {
  const heroRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(210,20%,6%)]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">Services</span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="font-display font-900 text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Our Services
          </h1>
          <p className="text-[hsl(210,10%,70%)] text-xl max-w-2xl mx-auto">
            Comprehensive offshore solutions delivered with technical excellence, safety leadership, and unparalleled expertise.
          </p>
        </div>
      </section>

      {/* Nav pills */}
      <div className="sticky top-20 z-40 bg-[hsl(210,20%,7%)]/95 backdrop-blur-sm border-b border-[hsl(210,15%,14%)] py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-testid={`pill-${s.id}`}
                className="flex-shrink-0 px-4 py-2 rounded-full border border-[hsl(210,15%,18%)] hover:border-[hsl(199,89%,48%)]/50 text-[hsl(210,10%,65%)] hover:text-[hsl(199,89%,60%)] text-sm font-display font-600 transition-all whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isEven = i % 2 === 0;
          return (
            <section
              key={service.id}
              id={service.id}
              className="py-24 border-b border-[hsl(210,15%,12%)] last:border-0"
              data-testid={`section-${service.id}`}
            >
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? "" : "lg:grid-flow-col-dense"}`}>
                <div className={isEven ? "" : "lg:col-start-2"}>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(199,89%,48%)]/15 flex items-center justify-center">
                      <Icon size={20} className="text-[hsl(199,89%,60%)]" />
                    </div>
                    <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                      {service.title}
                    </span>
                  </div>
                  <h2 className="font-display font-800 text-white text-3xl md:text-4xl leading-tight mb-3">
                    {service.tagline}
                  </h2>
                  <p className="text-[hsl(210,10%,62%)] leading-relaxed mb-8">{service.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[hsl(199,89%,60%)] mt-0.5 flex-shrink-0" />
                        <span className="text-[hsl(210,10%,70%)] text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" data-testid={`button-${service.id}-contact`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-display font-600 text-sm tracking-wide rounded transition-all glow-ocean">
                      Enquire About This Service <ArrowRight size={16} />
                    </Link>
                </div>
                <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover img-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,20%,6%)]/40 to-transparent" />
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="py-20 bg-[hsl(199,89%,38%)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-white text-4xl mb-4">Need a Custom Solution?</h2>
          <p className="text-white/80 mb-8">
            Our team of experts can design a bespoke offshore service package to meet your specific requirements.
          </p>
          <Link href="/contact" data-testid="services-cta-contact"
              className="px-8 py-4 bg-white text-[hsl(199,89%,38%)] font-display font-700 text-sm tracking-wide rounded hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Get in Touch <ArrowRight size={16} />
            </Link>
        </div>
      </section>
    </div>
  );
}
