import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Award, Users, Globe2, Target, Eye, Heart } from "lucide-react";
import { Link } from "wouter";

const leadership = [
  {
    name: "Jeffrey Anderson",
    title: "Founder / CEO",
    bio: "Founder and driving force behind Blueline Offshore. Over 35 years in the offshore energy industry, growing the company from a regional diving contractor into a globally recognized offshore services firm.",
    image: "/ceo-jeffrey-anderson.jpg",
  },
  {
    name: "James R. Whitfield",
    title: "Chief Operating Officer",
    bio: "30+ years in offshore operations management. Oversees all operational divisions and vessel deployments, ensuring every project is delivered on time and to the highest safety standards.",
    image: "/coo-james-whitfield.jpg",
  },
];

const milestones = [
  { year: "1987", event: "Founded in New York as a regional marine diving contractor" },
  { year: "2007", event: "Expanded into North Sea operations; first FPSO hook-up project" },
  { year: "2010", event: "Launched ROV division; acquired first DP2 construction vessel" },
  { year: "2013", event: "Expanded international operations; 1,000-employee milestone reached" },
  { year: "2016", event: "First deepwater project in the Gulf of Mexico exceeding 2,000m depth" },
  { year: "2019", event: "ISO 9001:2015 and 14001 dual-certification achieved globally" },
  { year: "2021", event: "Expanded fleet to 35 vessels; entered Southeast Asia market" },
  { year: "2024", event: "500th project milestone; 2,000+ global workforce" },
];

const values = [
  { icon: Shield, title: "Safety", desc: "Zero Harm is not a target, it is our culture, embedded in every task, every day." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in technical execution and client delivery." },
  { icon: Heart, title: "Integrity", desc: "Transparency, honesty, and ethical conduct define how we operate at every level." },
  { icon: Users, title: "People", desc: "Our greatest asset is our team. We invest in talent, wellbeing, and professional growth." },
  { icon: Globe2, title: "Sustainability", desc: "Responsible operations that protect our oceans and communities for generations to come." },
  { icon: Target, title: "Innovation", desc: "Continuously pushing the boundaries of technology to solve tomorrow's challenges today." },
];

export default function About() {
  const missionRef = useScrollReveal<HTMLDivElement>();
  const valuesRef = useScrollReveal<HTMLDivElement>();
  const timelineRef = useScrollReveal<HTMLDivElement>();
  const teamRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(210,20%,6%)]/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
              About Us
            </span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="font-display font-900 text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Our Story
          </h1>
          <p className="text-[hsl(210,10%,70%)] text-xl max-w-2xl mx-auto">
            Two decades of building trust, delivering excellence, and pushing the boundaries of offshore operations.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24" data-testid="section-mission">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={missionRef} className="reveal-up grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
                <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                  Our Purpose
                </span>
              </div>
              <h2 className="font-display font-800 text-white text-4xl md:text-5xl leading-tight mb-6">
                Driven by Mission,<br />
                <span className="gradient-text">Guided by Vision</span>
              </h2>

              <div className="space-y-6">
                <div className="border-l-2 border-[hsl(199,89%,48%)] pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={18} className="text-[hsl(199,89%,60%)]" />
                    <h3 className="font-display font-700 text-white text-lg">Our Mission</h3>
                  </div>
                  <p className="text-[hsl(210,10%,62%)] leading-relaxed">
                    To deliver world-class offshore services that enable our clients to safely and efficiently
                    develop the world's energy resources, creating lasting value for all stakeholders while
                    protecting people and the environment.
                  </p>
                </div>

                <div className="border-l-2 border-[hsl(45,90%,55%)] pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={18} className="text-[hsl(45,90%,65%)]" />
                    <h3 className="font-display font-700 text-white text-lg">Our Vision</h3>
                  </div>
                  <p className="text-[hsl(210,10%,62%)] leading-relaxed">
                    To be the most trusted and technically advanced offshore solutions provider in the world,
                    setting the global benchmark for safety, innovation, and sustainable operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format&fit=crop"
                  alt="Operations"
                  className="rounded-xl object-cover h-48 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=500&q=80&auto=format&fit=crop"
                  alt="Engineering"
                  className="rounded-xl object-cover h-48 w-full mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80&auto=format&fit=crop"
                  alt="Diving"
                  className="rounded-xl object-cover h-48 w-full -mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80&auto=format&fit=crop"
                  alt="Marine"
                  className="rounded-xl object-cover h-48 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[hsl(210,22%,7%)] hex-pattern" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
              <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                What We Stand For
              </span>
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            </div>
            <h2 className="font-display font-800 text-white text-4xl md:text-5xl">Our Core Values</h2>
          </div>
          <div ref={valuesRef} className="reveal-up grid grid-cols-2 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                data-testid={`card-value-${title.toLowerCase()}`}
                className="gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/30 rounded-xl p-8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[hsl(199,89%,48%)]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[hsl(199,89%,60%)]" />
                </div>
                <h3 className="font-display font-700 text-white text-lg mb-3">{title}</h3>
                <p className="text-[hsl(210,10%,58%)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" data-testid="section-timeline">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
              <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                Our Journey
              </span>
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            </div>
            <h2 className="font-display font-800 text-white text-4xl md:text-5xl">Company Milestones</h2>
          </div>
          <div ref={timelineRef} className="reveal-up relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line hidden md:block" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  data-testid={`milestone-${m.year}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="gradient-card border border-[hsl(210,15%,16%)] rounded-xl p-6 inline-block w-full md:w-auto md:max-w-sm">
                      <div className="font-display font-800 text-[hsl(199,89%,60%)] text-2xl mb-1">{m.year}</div>
                      <p className="text-[hsl(210,10%,70%)] text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-[hsl(199,89%,48%)] border-2 border-[hsl(210,20%,8%)] ring-2 ring-[hsl(199,89%,48%)]/30" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-[hsl(210,22%,7%)]" data-testid="section-leadership">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
              <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                Leadership
              </span>
              <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            </div>
            <h2 className="font-display font-800 text-white text-4xl md:text-5xl">Meet Our Leaders</h2>
          </div>
          <div ref={teamRef} className="reveal-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {leadership.map((person) => (
              <div
                key={person.name}
                data-testid={`card-leader-${person.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/30 rounded-xl overflow-hidden transition-all duration-300 card-3d"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-700 text-white text-base mb-1">{person.name}</h3>
                  <div className="text-[hsl(199,89%,60%)] text-xs font-display font-600 tracking-wide mb-3">{person.title}</div>
                  <p className="text-[hsl(210,10%,55%)] text-xs leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[hsl(199,89%,38%)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-white text-4xl mb-4">Ready to Work With Us?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Let's discuss how Blueline Offshore can deliver exceptional results for your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="about-cta-contact"
                className="px-8 py-4 bg-white text-[hsl(199,89%,38%)] font-display font-700 text-sm tracking-wide rounded hover:bg-gray-100 transition-colors">
                Contact Our Team
              </Link>
            <Link href="/services" className="px-8 py-4 border border-white/50 text-white font-display font-600 text-sm tracking-wide rounded hover:bg-white/10 transition-colors">
                View Services
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
