import { useState, useEffect, useRef } from "react";
import {
  Phone,
  MapPin,
  ArrowRight,
  Activity,
  Shield,
  TrendingUp,
  Dumbbell,
  HeartPulse,
  Move,
  ChevronDown,
  Menu,
  X,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

/* ─── Colors ─── */
const C = {
  forest: "#2D5A3D",
  sage: "#6B8F71",
  mint: "#A8D5BA",
  cream: "#F7F5F0",
  sand: "#E8E4DC",
  dark: "#1A2E23",
  text: "#2C3E35",
  textLight: "#5A6E62",
  white: "#FFFFFF",
  accent: "#3D7A52",
  lightGreen: "#E8F5EC",
};

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.sand}` : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex h-18 md:h-20 items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div
              className="size-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ backgroundColor: C.forest }}
            >
              <HeartPulse className="size-5" style={{ color: C.white }} />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="font-semibold text-sm tracking-wide"
                style={{ color: C.forest }}
              >
                JESSICA KELTNER
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: C.sage }}
              >
                PT
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: C.text }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:4175973716"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: C.forest,
                color: C.white,
              }}
            >
              <Phone className="size-3.5" />
              Call or Text
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: C.forest }}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden pb-6 animate-in fade-in slide-in-from-top-2 duration-300"
            style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-base font-medium"
                style={{ color: C.text }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:4175973716"
              className="inline-flex items-center gap-2 px-5 py-2.5 mt-3 rounded-full text-sm font-semibold"
              style={{ backgroundColor: C.forest, color: C.white }}
            >
              <Phone className="size-3.5" />
              417-597-3716
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: C.dark }}
    >
      {/* Background photo */}
      <img
        src="/hero-bg.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Light overlay for text readability — fresh and inviting */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${C.white}e8 0%, ${C.white}cc 50%, ${C.cream}e8 100%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center">
        <FadeIn>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-8"
            style={{
              border: `1px solid ${C.forest}33`,
              color: C.forest,
              backgroundColor: `${C.white}aa`,
            }}
          >
            <Activity className="size-3" />
            Licensed Physical Therapist &mdash; Springfield, MO
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6"
            style={{ fontFamily: "'DM Serif Display', serif", color: C.dark }}
          >
            Move Better.
            <br />
            <span style={{ color: C.forest }}>Feel Stronger.</span>
            <br />
            <span
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: C.dark }}
            >
              Thrive.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: C.text }}
          >
            Personalized physical therapy and functional wellness programs
            designed to help you prevent injury, build resilience, and
            get back to doing what you love.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:4175973716"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{ backgroundColor: C.forest, color: C.white }}
            >
              <Phone className="size-4" />
              Call or Text: 417-597-3716
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-black/5"
              style={{
                border: `1px solid ${C.forest}44`,
                color: C.forest,
              }}
            >
              Learn More
              <ChevronDown className="size-4" />
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Clean bottom edge — no gradient shadow */}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST BAR
   ═══════════════════════════════════════════════════════════ */
function TrustBar() {
  const items = [
    "Licensed Physical Therapist",
    "Functional Movement Expert",
    "Injury Prevention",
    "Performance Training",
  ];

  return (
    <div style={{ backgroundColor: C.cream }} className="py-6 border-b" >
      <div className="max-w-5xl mx-auto px-5 md:px-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
        {items.map((item, i) => (
          <span
            key={item}
            className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide uppercase"
            style={{ color: C.sage }}
          >
            {i > 0 && (
              <span className="hidden md:inline" style={{ color: C.sand }}>
                /
              </span>
            )}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════════════════════ */
function ServicesSection() {
  const services = [
    {
      icon: <HeartPulse className="size-6" />,
      title: "Physical Therapy",
      desc: "Evidence-based treatment to restore movement, reduce pain, and get you back to the activities you love.",
      color: C.forest,
    },
    {
      icon: <Move className="size-6" />,
      title: "Functional Movement",
      desc: "Comprehensive assessments to identify movement patterns that may be holding you back or putting you at risk.",
      color: C.accent,
    },
    {
      icon: <Dumbbell className="size-6" />,
      title: "Strength & Balance",
      desc: "Targeted mobility, strength, and balance programs to build a body that moves with confidence.",
      color: C.sage,
    },
    {
      icon: <Shield className="size-6" />,
      title: "Injury Prevention",
      desc: "Proactive strategies to keep you active and avoid setbacks before they happen.",
      color: C.forest,
    },
    {
      icon: <TrendingUp className="size-6" />,
      title: "Performance Training",
      desc: "Take your fitness to the next level with structured programs designed for your goals.",
      color: C.accent,
    },
    {
      icon: <Activity className="size-6" />,
      title: "Wellness Programs",
      desc: "Holistic approaches that combine movement, recovery, and lifestyle strategies for lasting results.",
      color: C.sage,
    },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-28"
      style={{ backgroundColor: C.cream }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
              style={{ color: C.sage }}
            >
              What I Offer
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: C.dark,
              }}
            >
              Services
            </h2>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: C.textLight }}
            >
              Whether you are recovering from an injury, looking to prevent one, or
              ready to take your performance to the next level &mdash; I am here to help.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 80}>
              <div
                className="group relative p-7 md:p-8 rounded-2xl transition-all duration-500 hover:shadow-lg hover:-translate-y-1 h-full"
                style={{
                  backgroundColor: C.white,
                  border: `1px solid ${C.sand}`,
                }}
              >
                <div
                  className="inline-flex size-12 items-center justify-center rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${service.color}12`,
                    color: service.color,
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: C.dark }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: C.textLight }}
                >
                  {service.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   INSIDE THE PRACTICE — REAL PHOTOS
   ═══════════════════════════════════════════════════════════ */
function CareSection() {
  const steps = [
    {
      title: "We start with how you move",
      desc: "A hands-on functional assessment to find the movement patterns behind your pain — not just the spot that hurts.",
    },
    {
      title: "One-on-one, every visit",
      desc: "You work directly with Jessica for the full session. No handing you off, no crowded gym floor.",
    },
    {
      title: "You leave with a plan",
      desc: "Targeted exercises and strategies you can actually keep doing between visits and long after you're discharged.",
    },
  ];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: C.white }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: tall coaching photo */}
          <FadeIn>
            <div
              className="overflow-hidden rounded-2xl"
              style={{ boxShadow: `0 24px 60px -20px ${C.dark}40` }}
            >
              <img
                src="/care-coaching.webp"
                alt="Jessica Keltner guiding a patient through resistance band and posture work in her Springfield clinic"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>

          {/* Right: copy + wide assessment photo */}
          <div>
            <FadeIn>
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
                style={{ color: C.sage }}
              >
                Inside The Practice
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: C.dark,
                }}
              >
                What A Visit
                <br />
                Looks Like
              </h2>

              <div className="space-y-6 mb-10">
                {steps.map((s, i) => (
                  <div key={s.title} className="flex gap-4">
                    <span
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: C.lightGreen,
                        color: C.forest,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3
                        className="text-base md:text-lg font-bold mb-1"
                        style={{ color: C.dark }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-sm md:text-base leading-relaxed"
                        style={{ color: C.text }}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div
                className="overflow-hidden rounded-2xl"
                style={{ boxShadow: `0 18px 44px -18px ${C.dark}33` }}
              >
                <img
                  src="/care-assessment.webp"
                  alt="Hands-on postural and spinal assessment during a physical therapy session"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT / PHILOSOPHY SECTION
   ═══════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: C.cream }}
    >
      {/* Decorative background */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${C.forest} 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Photo + Philosophy */}
          <FadeIn>
            <div>
              {/* Jessica's headshot */}
              <div className="mb-8 flex items-center gap-5">
                <img
                  src="/jessica-headshot.png"
                  alt="Jessica Keltner, PT"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shrink-0"
                  style={{ border: `4px solid ${C.mint}`, boxShadow: `0 0 0 2px ${C.forest}22` }}
                />
                <div>
                  <h3
                    className="text-lg md:text-xl font-bold"
                    style={{ fontFamily: "'DM Serif Display', serif", color: C.dark }}
                  >
                    Jessica Keltner
                  </h3>
                  <p
                    className="text-sm font-medium"
                    style={{ color: C.sage }}
                  >
                    Licensed Physical Therapist
                  </p>
                </div>
              </div>

              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
                style={{ color: C.sage }}
              >
                My Approach
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: C.dark,
                }}
              >
                More Than
                <br />
                Recovery
              </h2>
              <div className="space-y-4">
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: C.textLight }}
                >
                  I believe physical therapy is not just about fixing what is broken &mdash;
                  it is about building a foundation for a stronger, more resilient you.
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: C.textLight }}
                >
                  Every person moves differently. That is why I take a personalized,
                  whole-body approach. Whether you are an athlete pushing your limits
                  or someone who just wants to move through life without pain,
                  your program is built around you.
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: C.textLight }}
                >
                  My goal is simple: help you move with confidence, stay active,
                  and live your best life.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right: Stats / Highlights */}
          <FadeIn delay={150}>
            <div className="space-y-5">
              {[
                {
                  label: "Personalized Care",
                  detail:
                    "Every treatment plan is tailored to your unique body, goals, and lifestyle.",
                  icon: <HeartPulse className="size-5" />,
                },
                {
                  label: "Evidence-Based Methods",
                  detail:
                    "Combining the latest research with hands-on clinical experience for optimal results.",
                  icon: <Activity className="size-5" />,
                },
                {
                  label: "Prevention-First Mindset",
                  detail:
                    "Proactive strategies to keep you moving well and avoid future injuries.",
                  icon: <Shield className="size-5" />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-5 p-6 rounded-2xl transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: C.lightGreen,
                    border: `1px solid ${C.mint}66`,
                  }}
                >
                  <div
                    className="shrink-0 size-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: C.forest, color: C.white }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-base mb-1"
                      style={{ color: C.dark }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: C.textLight }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   QUOTE / BANNER SECTION
   ═══════════════════════════════════════════════════════════ */
function QuoteBanner() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${C.forest} 0%, ${C.dark} 100%)`,
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${C.white} 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative">
        <FadeIn>
          <blockquote
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-6"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: C.white,
            }}
          >
            "The body is designed to move. My job is to help you
            rediscover that."
          </blockquote>
          <p
            className="text-sm md:text-base font-medium tracking-wide"
            style={{ color: C.mint }}
          >
            &mdash; Jessica Keltner, PT
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT / CTA SECTION
   ═══════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ backgroundColor: C.cream }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
              style={{ color: C.sage }}
            >
              Get Started
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: C.dark,
              }}
            >
              Ready to Thrive?
            </h2>
            <p
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: C.textLight }}
            >
              Reach out today and take the first step toward moving better
              and feeling stronger.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {/* Phone */}
          <FadeIn delay={0}>
            <a
              href="tel:4175973716"
              className="group flex flex-col items-center p-8 rounded-2xl transition-all duration-500 hover:shadow-lg hover:-translate-y-1 text-center"
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.sand}`,
              }}
            >
              <div
                className="size-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: C.forest, color: C.white }}
              >
                <Phone className="size-6" />
              </div>
              <h3
                className="font-bold text-base mb-1"
                style={{ color: C.dark }}
              >
                Call or Text
              </h3>
              <p
                className="text-lg font-semibold"
                style={{ color: C.forest }}
              >
                417-597-3716
              </p>
            </a>
          </FadeIn>

          {/* Location */}
          <FadeIn delay={80}>
            <a
              href="https://maps.google.com/?q=1525+E+Republic+Rd+A130+Springfield+MO"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 rounded-2xl transition-all duration-500 hover:shadow-lg hover:-translate-y-1 text-center"
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.sand}`,
              }}
            >
              <div
                className="size-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: C.accent, color: C.white }}
              >
                <MapPin className="size-6" />
              </div>
              <h3
                className="font-bold text-base mb-1"
                style={{ color: C.dark }}
              >
                Visit
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: C.textLight }}
              >
                1525 E Republic Rd
                <br />
                Suite A130
                <br />
                Springfield, MO
              </p>
            </a>
          </FadeIn>

          {/* Social */}
          <FadeIn delay={160}>
            <div
              className="flex flex-col items-center p-8 rounded-2xl text-center"
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.sand}`,
              }}
            >
              <div
                className="size-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: C.sage, color: C.white }}
              >
                <MessageCircle className="size-6" />
              </div>
              <h3
                className="font-bold text-base mb-3"
                style={{ color: C.dark }}
              >
                Follow Along
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61577609756055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: C.lightGreen,
                    color: C.forest,
                  }}
                >
                  <Facebook className="size-5" />
                </a>
                <a
                  href="https://www.instagram.com/jessicakeltner_pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: C.lightGreen,
                    color: C.forest,
                  }}
                >
                  <Instagram className="size-5" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Big CTA */}
        <FadeIn delay={200}>
          <div className="mt-12 text-center">
            <a
              href="tel:4175973716"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              style={{ backgroundColor: C.forest, color: C.white }}
            >
              <Phone className="size-5" />
              Schedule Your Visit
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      className="py-10 border-t"
      style={{ backgroundColor: C.white, borderColor: C.sand }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="size-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: C.forest }}
            >
              <HeartPulse className="size-4" style={{ color: C.white }} />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: C.dark }}
            >
              Jessica Keltner PT
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:4175973716"
              className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
              style={{ color: C.textLight }}
            >
              <Phone className="size-3.5" />
              417-597-3716
            </a>
            <a
              href="https://maps.google.com/?q=1525+E+Republic+Rd+A130+Springfield+MO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
              style={{ color: C.textLight }}
            >
              <MapPin className="size-3.5" />
              Springfield, MO
            </a>
          </div>

          <p className="text-xs" style={{ color: C.sage }}>
            &copy; {new Date().getFullYear()} Jessica Keltner PT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export function PublicLandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <CareSection />
        <AboutSection />
        <QuoteBanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
