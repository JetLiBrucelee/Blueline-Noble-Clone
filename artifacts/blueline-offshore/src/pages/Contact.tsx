import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const offices = [
  {
    city: "New York",
    country: "USA (HQ)",
    address: "42 Broadway",
    zip: "New York, NY 10004",
    phone: "(774) 564-8357",
    email: "support@bluelineoffshore.com",
    image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=600&q=80&auto=format&fit=crop",
  },
];

const services = [
  "Marine Construction",
  "Diving Operations",
  "Subsea Engineering",
  "ROV Operations",
  "Pipeline Services",
  "Project Management",
  "Fleet Charter",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useScrollReveal<HTMLDivElement>();
  const officesRef = useScrollReveal<HTMLDivElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Failed to send message. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
            <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">Get In Touch</span>
            <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="font-display font-900 text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Contact Us
          </h1>
          <p className="text-[hsl(210,10%,70%)] text-xl max-w-2xl mx-auto">
            Ready to discuss your next offshore project? Our expert team is here to help — 24 hours a day, 7 days a week.
          </p>
        </div>
      </section>

      {/* Quick contact bar */}
      <section className="py-10 bg-[hsl(199,89%,38%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Phone, label: "Call Us", value: "(774) 564-8357", href: "tel:+17745648357" },
            { icon: Mail, label: "Email Us", value: "support@bluelineoffshore.com", href: "mailto:support@bluelineoffshore.com" },
            { icon: Clock, label: "Emergency 24/7", value: "(774) 564-8357", href: "tel:+17745648357" },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              data-testid={`contact-bar-${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-4 text-white hover:text-white/90 transition-colors min-w-0"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-white/70 text-xs font-display font-600 tracking-wide">{label}</div>
                <div className="font-display font-700 text-base break-all">{value}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div ref={formRef} className="reveal-up">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
                <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                  Send a Message
                </span>
              </div>
              <h2 className="font-display font-800 text-white text-3xl md:text-4xl mb-8">
                Request a Quote
              </h2>

              {submitted ? (
                <div
                  data-testid="contact-success"
                  className="animated-border gradient-card rounded-2xl p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-700 text-white text-2xl mb-3">Message Sent!</h3>
                  <p className="text-[hsl(210,10%,60%)] leading-relaxed">
                    Thank you for reaching out. A member of our team will be in touch within 24 hours.
                    For urgent requirements, please call our 24/7 emergency line.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[hsl(210,10%,65%)] text-sm font-display font-600 mb-2">
                        First Name *
                      </label>
                      <input
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        data-testid="input-first-name"
                        className="w-full px-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,35%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-[hsl(210,10%,65%)] text-sm font-display font-600 mb-2">
                        Last Name *
                      </label>
                      <input
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        data-testid="input-last-name"
                        className="w-full px-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,35%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[hsl(210,10%,65%)] text-sm font-display font-600 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      data-testid="input-email"
                      className="w-full px-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,35%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                      placeholder="john.smith@company.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[hsl(210,10%,65%)] text-sm font-display font-600 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        data-testid="input-phone"
                        className="w-full px-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,35%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-[hsl(210,10%,65%)] text-sm font-display font-600 mb-2">
                        Company
                      </label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        data-testid="input-company"
                        className="w-full px-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,35%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[hsl(210,10%,65%)] text-sm font-display font-600 mb-2">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      data-testid="select-service"
                      className="w-full px-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[hsl(210,10%,65%)] text-sm font-display font-600 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      data-testid="textarea-message"
                      className="w-full px-4 py-3 bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,35%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors resize-none"
                      placeholder="Please describe your project scope, location, timeline, and any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="button-submit-contact"
                    className="w-full py-4 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-display font-700 text-sm tracking-wide rounded transition-all duration-300 glow-ocean flex items-center justify-center gap-3 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  {error && (
                    <div
                      data-testid="contact-error"
                      className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
                    >
                      {error}
                    </div>
                  )}

                  <p className="text-[hsl(210,10%,45%)] text-xs text-center">
                    By submitting, you agree to our Privacy Policy. We respond within 24 hours.
                  </p>
                </form>
              )}
            </div>

            {/* Map / Info */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-[hsl(199,89%,48%)]" />
                <span className="font-display text-xs font-600 tracking-[0.2em] text-[hsl(199,89%,60%)] uppercase">
                  Find Us
                </span>
              </div>
              <h2 className="font-display font-800 text-white text-3xl md:text-4xl mb-8">
                Our Office
              </h2>

              {/* Embedded Map */}
              <div className="rounded-xl overflow-hidden mb-8 border border-[hsl(210,15%,16%)]" style={{ height: "280px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8684019454826!2d-74.01392502346057!3d40.70674137139453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a16b6b60ff7%3A0x4bf44b2f0a3e2f6!2s42%20Broadway%2C%20New%20York%2C%20NY%2010004%2C%20USA!5e0!3m2!1sen!2sus!4v1716000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Blueline Offshore HQ Location"
                />
              </div>

              {/* HQ info card */}
              <div className="gradient-card border border-[hsl(210,15%,16%)] rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(199,89%,48%)]/15 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[hsl(199,89%,60%)]" />
                  </div>
                  <div>
                    <div className="font-display font-700 text-white text-lg">New York Headquarters</div>
                    <div className="text-[hsl(210,10%,55%)] text-sm mt-1">
                      42 Broadway<br />New York, NY 10004, USA
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-[hsl(210,15%,14%)] pt-4">
                  <div>
                    <div className="text-[hsl(210,10%,45%)] text-xs mb-1">Main Line</div>
                    <a href="tel:+17745648357" className="text-[hsl(199,89%,60%)] text-sm font-display font-600 hover:text-white transition-colors">
                      (774) 564-8357
                    </a>
                  </div>
                  <div>
                    <div className="text-[hsl(210,10%,45%)] text-xs mb-1">Email</div>
                    <a href="mailto:support@bluelineoffshore.com" className="text-[hsl(199,89%,60%)] text-sm font-display font-600 hover:text-white transition-colors">
                      support@bluelineoffshore.com
                    </a>
                  </div>
                  <div>
                    <div className="text-[hsl(210,10%,45%)] text-xs mb-1">Business Hours</div>
                    <div className="text-[hsl(210,10%,70%)] text-sm">Mon – Fri: 8am – 6pm CT</div>
                  </div>
                  <div>
                    <div className="text-[hsl(210,10%,45%)] text-xs mb-1">Emergency</div>
                    <a href="tel:+17745648357" className="text-[hsl(199,89%,60%)] text-sm font-display font-600 hover:text-white transition-colors">
                      (774) 564-8357
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global offices */}
      <section className="py-16 bg-[hsl(210,22%,7%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-white text-3xl">Our Office</h2>
          </div>
          <div ref={officesRef} className="reveal-up flex justify-center">
            {offices.map((office) => (
              <div
                key={office.city}
                data-testid={`card-office-${office.city.toLowerCase()}`}
                className="gradient-card border border-[hsl(210,15%,16%)] rounded-xl overflow-hidden hover:border-[hsl(199,89%,48%)]/30 transition-all w-full max-w-sm"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={office.image} alt={office.city} className="w-full h-full object-cover img-zoom" />
                </div>
                <div className="p-5">
                  <div className="font-display font-700 text-white text-lg">{office.city}</div>
                  <div className="text-[hsl(199,89%,60%)] text-xs font-display font-600 tracking-wide mb-3">{office.country}</div>
                  <div className="space-y-2 text-sm text-[hsl(210,10%,58%)]">
                    <p>{office.address}</p>
                    <p>{office.zip}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[hsl(210,15%,14%)] space-y-2">
                    {office.phone && (
                      <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-xs text-[hsl(210,10%,55%)] hover:text-[hsl(199,89%,60%)] transition-colors">
                        <Phone size={12} className="text-[hsl(199,89%,48%)]" />
                        {office.phone}
                      </a>
                    )}
                    <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-xs text-[hsl(210,10%,55%)] hover:text-[hsl(199,89%,60%)] transition-colors">
                      <Mail size={12} className="text-[hsl(199,89%,48%)]" />
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
