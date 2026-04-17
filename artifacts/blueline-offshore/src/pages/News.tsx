import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, Tag, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const news = [
  {
    id: 1,
    title: "Blueline Offshore Awarded $180M North Sea EPCI Contract",
    category: "Contracts",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=800&q=80&auto=format&fit=crop",
    excerpt: "Blueline Offshore has been awarded an EPCI contract worth approximately $180 million for the installation of a new offshore platform in the UK North Sea, with operations commencing Q3 2025.",
    featured: true,
  },
  {
    id: 2,
    title: "Blueline Achieves 10 Million LTI-Free Man-Hours Milestone",
    category: "Safety",
    date: "March 28, 2025",
    image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80&auto=format&fit=crop",
    excerpt: "We are proud to announce that Blueline Offshore has surpassed 10 million consecutive man-hours without a Lost Time Incident — a testament to our Zero Harm culture and safety leadership.",
    featured: false,
  },
  {
    id: 3,
    title: "New DP3 Vessel 'Blueline Titan II' Joins Fleet",
    category: "Fleet",
    date: "March 15, 2025",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop",
    excerpt: "Blueline Offshore has taken delivery of its newest semi-submersible crane vessel, Blueline Titan II, expanding our heavy lift capability to meet growing demand across the North Sea and West Africa.",
    featured: false,
  },
  {
    id: 4,
    title: "Blueline Expands into Southeast Asia with Singapore Office",
    category: "Corporate",
    date: "February 22, 2025",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80&auto=format&fit=crop",
    excerpt: "We have officially opened our new regional headquarters in Singapore, strengthening our commitment to the Southeast Asian offshore market and positioning us to serve major operators in the region.",
    featured: false,
  },
  {
    id: 5,
    title: "Blueline and TechSea Partner on Next-Generation ROV Technology",
    category: "Technology",
    date: "February 8, 2025",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop",
    excerpt: "Blueline Offshore has announced a strategic partnership with TechSea to co-develop autonomous inspection ROV systems capable of operating at 4,000m water depth with zero human supervision.",
    featured: false,
  },
  {
    id: 6,
    title: "Q4 2024 Results: Record Revenue of $1.2 Billion",
    category: "Financial",
    date: "January 30, 2025",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop",
    excerpt: "Blueline Offshore reports record annual revenue of $1.2 billion for fiscal year 2024, driven by strong demand for marine construction and diving services across all operating regions.",
    featured: false,
  },
];

const categories = ["All", "Contracts", "Safety", "Fleet", "Corporate", "Technology", "Financial"];

const categoryColors: Record<string, string> = {
  Contracts: "bg-[hsl(199,89%,48%)] text-white",
  Safety: "bg-green-600 text-white",
  Fleet: "bg-[hsl(210,60%,50%)] text-white",
  Corporate: "bg-[hsl(45,90%,45%)] text-black",
  Technology: "bg-purple-600 text-white",
  Financial: "bg-[hsl(15,80%,45%)] text-white",
};

export default function News() {
  const gridRef = useScrollReveal<HTMLDivElement>();
  const featured = news.find((n) => n.featured);
  const rest = news.filter((n) => !n.featured);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(210,20%,6%)]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">Latest Updates</span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="font-display font-900 text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            News & Media
          </h1>
          <p className="text-[hsl(210,10%,70%)] text-xl max-w-2xl mx-auto">
            Stay updated with the latest news, project announcements, and industry insights from Blueline Offshore.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="py-8 border-b border-[hsl(210,15%,14%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              data-testid={`news-filter-${cat.toLowerCase()}`}
              className="px-4 py-2 rounded-full border border-[hsl(210,15%,20%)] text-[hsl(210,10%,60%)] hover:border-[hsl(199,89%,48%)]/50 hover:text-[hsl(199,89%,60%)] text-sm font-display font-600 transition-all"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Featured */}
          {featured && (
            <div className="mb-16" data-testid="featured-news">
              <div className="group gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/30 rounded-2xl overflow-hidden transition-all duration-300">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(210,18%,10%)]/50 hidden lg:block" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-display font-600 rounded-full ${categoryColors[featured.category] || "bg-gray-600 text-white"}`}>
                        {featured.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 lg:right-auto lg:left-4 mt-8">
                      <span className="px-3 py-1 bg-[hsl(199,89%,48%)] text-white text-xs font-display font-700 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-[hsl(210,10%,50%)] text-xs mb-4">
                      <Calendar size={13} className="text-[hsl(199,89%,48%)]" />
                      {featured.date}
                    </div>
                    <h2 className="font-display font-800 text-white text-2xl md:text-3xl leading-tight mb-4 group-hover:text-[hsl(199,89%,60%)] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-[hsl(210,10%,60%)] leading-relaxed mb-6">{featured.excerpt}</p>
                    <a
                      href="#"
                      data-testid="link-featured-news"
                      className="inline-flex items-center gap-2 text-[hsl(199,89%,60%)] font-display font-600 text-sm hover:gap-4 transition-all"
                    >
                      Read Full Story <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div ref={gridRef} className="reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item) => (
              <article
                key={item.id}
                data-testid={`card-news-${item.id}`}
                className="group gradient-card border border-[hsl(210,15%,16%)] hover:border-[hsl(199,89%,48%)]/30 rounded-xl overflow-hidden transition-all duration-300 card-3d"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-display font-600 rounded-full ${categoryColors[item.category] || "bg-gray-600 text-white"}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[hsl(210,10%,50%)] text-xs mb-3">
                    <Calendar size={12} className="text-[hsl(199,89%,48%)]" />
                    {item.date}
                  </div>
                  <h3 className="font-display font-700 text-white text-lg leading-snug mb-3 group-hover:text-[hsl(199,89%,60%)] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[hsl(210,10%,58%)] text-sm leading-relaxed mb-5 line-clamp-3">{item.excerpt}</p>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-[hsl(199,89%,60%)] text-sm font-600 hover:gap-3 transition-all"
                  >
                    Read More <ChevronRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
