import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Anchor, Gauge, Ruler, Users, ArrowRight, MapPin } from "lucide-react";
import { Link } from "wouter";

const vessels = [
  {
    id: 1,
    name: "Blueline Constructor",
    type: "Heavy Lift Crane Vessel",
    flag: "Norway",
    dp: "DP3",
    craneCapacity: "5,000T",
    decaArea: "3,200 m²",
    pob: 300,
    built: 2019,
    depth: "3,000m",
    status: "Active",
    desc: "Our flagship heavy lift vessel, purpose-built for the most demanding offshore installation campaigns. Features twin cranes and full saturation diving system.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Blueline Pioneer",
    type: "Diving Support Vessel",
    flag: "UK",
    dp: "DP2",
    craneCapacity: "250T",
    decaArea: "1,800 m²",
    pob: 220,
    built: 2016,
    depth: "300m Sat",
    status: "Active",
    desc: "Dedicated diving support vessel equipped with a 12-man saturation system, three work-class ROVs, and full survey suite.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Blueline Navigator",
    type: "Pipelay & Construction Vessel",
    flag: "Singapore",
    dp: "DP3",
    craneCapacity: "800T",
    decaArea: "2,400 m²",
    pob: 260,
    built: 2020,
    depth: "2,500m",
    status: "Active",
    desc: "Versatile pipelay and construction vessel capable of S-lay, J-lay, and reel-lay operations with 12-inch pipe capacity.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Blueline Surveyor",
    type: "Survey & ROV Vessel",
    flag: "Netherlands",
    dp: "DP2",
    craneCapacity: "100T",
    decaArea: "900 m²",
    pob: 120,
    built: 2018,
    depth: "3,000m ROV",
    status: "Active",
    desc: "Multi-purpose survey vessel carrying four ROV systems and full geophysical survey equipment for deepwater inspection campaigns.",
    image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Blueline Titan",
    type: "Semi-Submersible Crane Vessel",
    flag: "Liberia",
    dp: "DP3",
    craneCapacity: "12,000T",
    decaArea: "6,000 m²",
    pob: 400,
    built: 2021,
    depth: "3,000m",
    status: "Active",
    desc: "One of the world's largest semi-submersible crane vessels, designed for ultra-heavy lift operations and decommissioning projects.",
    image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Blueline Reliance",
    type: "Flexible Pipelay Vessel",
    flag: "Marshall Islands",
    dp: "DP2",
    craneCapacity: "400T",
    decaArea: "2,100 m²",
    pob: 200,
    built: 2017,
    depth: "2,000m",
    status: "Active",
    desc: "Flexible pipelay specialist carrying 5,000T carousel and capable of installing flowlines, umbilicals, and flexible risers.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80&auto=format&fit=crop",
  },
];

const stats = [
  { value: "35", label: "Vessels in Fleet" },
  { value: "6", label: "DP3 Vessels" },
  { value: "12,000T", label: "Max Lift Capacity" },
  { value: "3,000m", label: "Max Water Depth" },
];

export default function Fleet() {
  const gridRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(210,20%,6%)]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">Our Assets</span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="font-display font-900 text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Our Fleet
          </h1>
          <p className="text-[hsl(210,10%,70%)] text-xl max-w-2xl mx-auto">
            35 purpose-built vessels engineered for the most demanding offshore operations across the globe.
          </p>
        </div>
      </section>

      {/* Fleet stats */}
      <section className="py-12 bg-[hsl(199,89%,38%)]">
        <div ref={statsRef} className="reveal-up max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center ${i < stats.length - 1 ? "md:border-r border-white/20" : ""}`}>
                <div className="font-display font-900 text-4xl text-white">{s.value}</div>
                <div className="text-white/70 text-sm font-display tracking-wide mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vessel Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={gridRef} className="reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vessels.map((vessel) => (
              <div
                key={vessel.id}
                data-testid={`card-vessel-${vessel.id}`}
                className="group gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/30 rounded-xl overflow-hidden transition-all duration-400 card-3d"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={vessel.image}
                    alt={vessel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,20%,8%)]/80 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-display font-600 rounded-full">
                      {vessel.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-[hsl(199,89%,48%)]/90 text-white text-xs font-display font-700 rounded">
                      {vessel.dp}
                    </span>
                    <span className="px-2 py-1 bg-[hsl(210,18%,14%)]/90 text-[hsl(210,10%,75%)] text-xs font-display font-600 rounded">
                      {vessel.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-800 text-white text-xl">{vessel.name}</h3>
                    <div className="flex items-center gap-1 text-[hsl(210,10%,50%)] text-xs">
                      <MapPin size={11} />
                      {vessel.flag}
                    </div>
                  </div>
                  <p className="text-[hsl(210,10%,58%)] text-sm leading-relaxed mb-5">{vessel.desc}</p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: Anchor, label: "Crane", value: vessel.craneCapacity },
                      { icon: Ruler, label: "Deck", value: vessel.decaArea },
                      { icon: Gauge, label: "Max Depth", value: vessel.depth },
                      { icon: Users, label: "POB", value: vessel.pob },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="bg-[hsl(210,18%,8%)] rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon size={12} className="text-[hsl(199,89%,48%)]" />
                          <span className="text-[hsl(210,10%,45%)] text-xs">{label}</span>
                        </div>
                        <div className="font-display font-700 text-white text-sm">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-[hsl(210,15%,14%)] pt-4">
                    <span className="text-[hsl(210,10%,50%)] text-xs">Built {vessel.built}</span>
                    <Link href="/contact" className="flex items-center gap-1.5 text-[hsl(199,89%,60%)] text-sm font-600 hover:gap-3 transition-all">
                        Charter <ArrowRight size={13} />
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
          <h2 className="font-display font-800 text-white text-4xl mb-4">Charter a Vessel</h2>
          <p className="text-white/80 mb-8">
            Our fleet operations team can help you find the right vessel for your project requirements.
          </p>
          <Link href="/contact" data-testid="fleet-cta"
              className="px-8 py-4 bg-white text-[hsl(199,89%,38%)] font-display font-700 text-sm rounded hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Enquire About Charter <ArrowRight size={16} />
            </Link>
        </div>
      </section>
    </div>
  );
}
