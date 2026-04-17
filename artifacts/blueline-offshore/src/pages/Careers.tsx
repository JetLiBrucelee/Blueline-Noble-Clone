import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Briefcase, Clock, ArrowRight, Users, Award, Globe2, Heart, Search } from "lucide-react";
import { Link } from "wouter";

const openings = [
  {
    id: 1,
    title: "Offshore Installation Manager (OIM)",
    location: "North Sea / Rotational",
    type: "Permanent",
    department: "Operations",
    posted: "2 days ago",
    desc: "Leading offshore installation operations for major EPCI projects in the North Sea. Minimum 10 years relevant experience required.",
  },
  {
    id: 2,
    title: "Saturation Diving Supervisor",
    location: "Gulf of Mexico / Rotational",
    type: "Permanent",
    department: "Diving",
    posted: "1 week ago",
    desc: "Supervise saturation diving operations to 300m depth. IMCA certification and minimum 5 years sat diving experience required.",
  },
  {
    id: 3,
    title: "Senior Subsea Engineer",
    location: "Houston, TX (Hybrid)",
    type: "Permanent",
    department: "Engineering",
    posted: "3 days ago",
    desc: "Lead subsea engineering deliverables for deepwater development projects. PE license and 8+ years subsea experience preferred.",
  },
  {
    id: 4,
    title: "ROV Pilot Technician",
    location: "Worldwide / Rotational",
    type: "Permanent",
    department: "ROV",
    posted: "5 days ago",
    desc: "Operate and maintain work-class ROV systems aboard Blueline vessels. IMCA/ROVT certification required. Travel 50% offshore.",
  },
  {
    id: 5,
    title: "Marine Project Manager",
    location: "Aberdeen, UK",
    type: "Permanent",
    department: "Project Management",
    posted: "1 week ago",
    desc: "Manage full EPCI project delivery from contract award through to client handover. Proven track record in offshore project delivery.",
  },
  {
    id: 6,
    title: "HSEQ Coordinator",
    location: "Singapore",
    type: "Permanent",
    department: "HSE",
    posted: "2 weeks ago",
    desc: "Support HSEQ management across Southeast Asia operations. NEBOSH Certificate and 5 years offshore HSE experience required.",
  },
];

const benefits = [
  { icon: Award, title: "Competitive Compensation", desc: "Market-leading salaries, performance bonuses, and equity participation for senior roles." },
  { icon: Globe2, title: "Global Career", desc: "Work on world-class projects across 50+ countries with multinational teams." },
  { icon: Heart, title: "Health & Wellbeing", desc: "Comprehensive medical, dental, and vision insurance plus offshore medical coverage." },
  { icon: Users, title: "Training & Development", desc: "Annual learning budget, IMCA certifications, leadership programs, and mentorship." },
];

const departments = ["All Departments", "Operations", "Diving", "Engineering", "ROV", "Project Management", "HSE"];

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDept, setActiveDept] = useState("All Departments");
  const gridRef = useScrollReveal<HTMLDivElement>();

  const filtered = openings.filter((job) => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = activeDept === "All Departments" || job.department === activeDept;
    return matchSearch && matchDept;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(210,20%,6%)]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">Join Our Team</span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="font-display font-900 text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Build Your Career<br />Offshore
          </h1>
          <p className="text-[hsl(210,10%,70%)] text-xl max-w-2xl mx-auto">
            Join 2,000+ professionals driving the future of offshore energy worldwide. We invest in people because people deliver excellence.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[hsl(210,22%,7%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-white text-3xl md:text-4xl">Why Blueline?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                data-testid={`card-benefit-${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="gradient-card border border-[hsl(210,15%,16%)] rounded-xl p-7 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[hsl(199,89%,48%)]/10 flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-[hsl(199,89%,60%)]" />
                </div>
                <h3 className="font-display font-700 text-white text-base mb-3">{title}</h3>
                <p className="text-[hsl(210,10%,58%)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-display font-800 text-white text-3xl mb-8">Open Positions</h2>

            {/* Search & filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(210,10%,50%)]" />
                <input
                  type="search"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-job-search"
                  className="w-full pl-11 pr-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,40%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    data-testid={`dept-filter-${dept.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`px-4 py-2.5 rounded-lg text-sm font-display font-600 transition-all ${
                      activeDept === dept
                        ? "bg-[hsl(199,89%,48%)] text-white"
                        : "bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] text-[hsl(210,10%,60%)] hover:border-[hsl(199,89%,48%)]/50"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div ref={gridRef} className="reveal-up space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[hsl(210,10%,50%)]">
                No positions found matching your search.
              </div>
            ) : (
              filtered.map((job) => (
                <div
                  key={job.id}
                  data-testid={`card-job-${job.id}`}
                  className="gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/30 rounded-xl p-6 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2.5 py-1 bg-[hsl(199,89%,48%)]/15 text-[hsl(199,89%,60%)] text-xs font-display font-600 rounded">
                          {job.department}
                        </span>
                        <span className="px-2.5 py-1 bg-[hsl(210,18%,14%)] text-[hsl(210,10%,60%)] text-xs font-display font-600 rounded">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="font-display font-700 text-white text-xl mb-2 group-hover:text-[hsl(199,89%,60%)] transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-[hsl(210,10%,58%)] text-sm leading-relaxed mb-3">{job.desc}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-[hsl(210,10%,50%)]">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-[hsl(199,89%,48%)]" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={12} className="text-[hsl(199,89%,48%)]" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-[hsl(199,89%,48%)]" /> Posted {job.posted}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href="/contact" data-testid={`button-apply-${job.id}`}
                          className="px-6 py-3 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-display font-600 text-sm rounded transition-all flex items-center gap-2 whitespace-nowrap">
                          Apply Now <ArrowRight size={14} />
                        </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[hsl(210,10%,55%)] mb-4">Don't see the right role? Send us your CV anyway.</p>
            <a
              href="mailto:careers@bluelineoffshore.com"
              data-testid="link-speculative-cv"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[hsl(199,89%,48%)]/40 hover:border-[hsl(199,89%,48%)] text-[hsl(199,89%,60%)] font-display font-600 text-sm rounded transition-all"
            >
              Submit Speculative CV <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
