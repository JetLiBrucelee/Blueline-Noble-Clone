import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const projects = [
  {
    id: 1,
    title: "Fortuna FPSO Hook-Up & Commissioning",
    location: "North Sea, UK",
    year: "2023",
    client: "Major IOC",
    category: "Marine Construction",
    status: "Completed",
    desc: "Full FPSO hook-up and commissioning scope including 12 risers, mooring system installation, and 180km of flexible flowlines.",
    image: "/images/project-1-fpso.jpg",
  },
  {
    id: 2,
    title: "Deepwater Pipeline Replacement — Block K",
    location: "Gulf of Mexico",
    year: "2023",
    client: "National Oil Company",
    category: "Pipeline Services",
    status: "Completed",
    desc: "Emergency replacement of 45km of high-pressure pipeline at 1,800m water depth using J-lay method and DP3 vessel.",
    image: "/images/project-2-pipeline.jpg",
  },
  {
    id: 3,
    title: "Subsea Compression System Installation",
    location: "Norwegian Continental Shelf",
    year: "2022",
    client: "Major NOC",
    category: "Subsea Engineering",
    status: "Completed",
    desc: "Design, fabrication, and installation of the world's first fully redundant subsea gas compression station at 300m depth.",
    image: "/images/project-3-compression.jpg",
  },
  {
    id: 4,
    title: "GOM Block 78 Manifold & Jumper Campaign",
    location: "Gulf of Mexico",
    year: "2022",
    client: "JV Partners",
    category: "ROV Operations",
    status: "Completed",
    desc: "ROV-based installation of 8 subsea manifolds and 24 flexible jumpers in a deepwater Gulf of Mexico block development.",
    image: "/images/project-4-manifold.jpg",
  },
  {
    id: 5,
    title: "Platform Life Extension — Alpha Complex",
    location: "Gulf of Suez, Egypt",
    year: "2024",
    client: "Regional NOC",
    category: "Marine Construction",
    status: "Ongoing",
    desc: "Structural assessment, repair, and life extension of three interconnected platforms to extend operational life by 15 years.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Saturation Diving Campaign — Helix Field",
    location: "South China Sea",
    year: "2024",
    client: "International Operator",
    category: "Diving Operations",
    status: "Ongoing",
    desc: "Six-month saturation diving campaign performing pipeline crossings, tie-ins, and structural inspection across the Helix development.",
    image: "/images/project-6-diving.jpg",
  },
];

const categories = ["All", "Marine Construction", "Pipeline Services", "Subsea Engineering", "ROV Operations", "Diving Operations"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useScrollReveal<HTMLDivElement>();

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(210,20%,6%)]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">Portfolio</span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="font-display font-900 text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Our Projects
          </h1>
          <p className="text-[hsl(210,10%,70%)] text-xl max-w-2xl mx-auto">
            A global track record of delivering complex offshore projects, on time, on budget, without compromise.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="py-10 border-b border-[hsl(210,15%,14%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-5 py-2.5 rounded-full text-sm font-display font-600 transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-[hsl(199,89%,48%)] text-white"
                    : "border border-[hsl(210,15%,20%)] text-[hsl(210,10%,60%)] hover:border-[hsl(199,89%,48%)]/50 hover:text-[hsl(199,89%,60%)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={gridRef} className="reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div
                key={project.id}
                data-testid={`card-project-${project.id}`}
                className="group gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/30 rounded-xl overflow-hidden transition-all duration-300 card-3d"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-[hsl(199,89%,48%)] text-white text-xs font-display font-600 rounded-full">
                      {project.category}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-display font-600 rounded-full ${
                        project.status === "Ongoing"
                          ? "bg-green-500/90 text-white"
                          : "bg-[hsl(210,18%,14%)]/90 text-[hsl(210,10%,70%)]"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-700 text-white text-lg leading-snug mb-3">{project.title}</h3>
                  <p className="text-[hsl(210,10%,58%)] text-sm leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[hsl(210,15%,14%)]">
                    <div>
                      <div className="text-[hsl(210,10%,45%)] text-xs mb-0.5">Contract Value</div>
                      <Link href="/contact" className="font-display font-600 text-[hsl(199,89%,60%)] text-sm hover:underline">
                        Contact for pricing
                      </Link>
                    </div>
                    <Link href="/contact" className="flex items-center gap-2 text-[hsl(199,89%,60%)] text-sm font-600 hover:gap-3 transition-all opacity-0 group-hover:opacity-100">
                        Learn More <ArrowRight size={14} />
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[hsl(199,89%,38%)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-white text-4xl mb-4">Start Your Project With Us</h2>
          <p className="text-white/80 mb-8">
            Join 500+ clients across 50 countries who trust Blueline Offshore to deliver.
          </p>
          <Link href="/contact" data-testid="projects-cta"
              className="px-8 py-4 bg-white text-[hsl(199,89%,38%)] font-display font-700 text-sm rounded hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Request a Project Quote <ArrowRight size={16} />
            </Link>
        </div>
      </section>
    </div>
  );
}
