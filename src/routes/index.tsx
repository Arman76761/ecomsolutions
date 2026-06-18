import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  ShoppingBag,
  Package,
  Tag,
  Facebook,
  Store,
  Truck,
  MessageCircle,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  HandCoins,
  Eye,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";
import { Reveal, Counter, Parallax } from "@/components/motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { ApplyForm } from "@/components/apply-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ecom Solutions — Full-Service Amazon & E-commerce Store Management" },
      {
        name: "description",
        content:
          "We build, operate, and scale your Amazon, Walmart, eBay & Facebook stores — hands-free passive income for investors.",
      },
      { property: "og:title", content: "Ecom Solutions — Hands-Free E-commerce Store Management" },
      {
        property: "og:description",
        content:
          "Full-service Amazon, Walmart, eBay & Facebook store automation. We do the heavy lifting so you can do the easy living.",
      },
    ],
  }),
  component: Index,
});

const services = [
  { icon: ShoppingBag, title: "Amazon Dropshipping Automation", desc: "Over 50% of Amazon sales come from 3rd-party sellers. We tap that channel for you, end to end." },
  { icon: Package, title: "Amazon FBA Automation", desc: "Leverage Amazon's fulfillment centers to scale a truly passive, prime-eligible store." },
  { icon: Tag, title: "eBay Automation", desc: "Reach 187M+ active eBay buyers with a fully managed listing, sourcing and support engine." },
  { icon: Facebook, title: "Facebook Shops Automation", desc: "Target 240M US consumers inside the world's largest social commerce surface." },
  { icon: Store, title: "Walmart Dropshipping Automation", desc: "100M unique monthly visitors. We build your Walmart catalog and run it daily." },
  { icon: Truck, title: "Walmart WFS Automation", desc: "Streamlined Walmart application, approval and Walmart Fulfillment Services setup." },
];

const handled = [
  "Managing supplier relationships",
  "Optimal pricing & repricing strategies",
  "Facilitating returns & customer service",
  "Account health & risk mitigation",
  "Real-time reporting & analytics",
  "Daily 8-hour active store monitoring",
];

const pillars = [
  { icon: MessageCircle, title: "Communication", desc: "Transparent updates, direct channels, no account managers in the dark." },
  { icon: ShieldCheck, title: "Accountability", desc: "Monthly reports, live analytics dashboards, KPIs you can actually verify." },
  { icon: HeartHandshake, title: "Integrity", desc: "Honesty and collaboration — internal teams only, never outsourced." },
];

const benefits = [
  { icon: Sparkles, title: "Stress-Free Onboarding", desc: "Guided consultation and application setup — we handle the paperwork." },
  { icon: HandCoins, title: "Hands-Free Passive Income", desc: "100% managed by our agency once your store is running." },
  { icon: Eye, title: "Full Transparency", desc: "Ethical operation, in-house teams, no offshore outsourcing." },
];

const steps = [
  { n: "01", title: "Acquire & Build Your Business Structure", desc: "Groundwork, legal entity, staffing and a dedicated account manager assigned to your store." },
  { n: "02", title: "Managing Your Account", desc: "Daily 8-hour monitoring, sourcing, listing, customer service and a clear monthly progression report." },
  { n: "03", title: "Scaling Your Account", desc: "Building customer loyalty and increasing long-term ROI through aggressive, data-led growth." },
];

const faqs = [
  { q: "What is dropshipping?", a: "Dropshipping is a retail model where you sell products without holding inventory. We source from vetted suppliers and they ship directly to your customer under your store brand." },
  { q: "What does FBA stand for?", a: "FBA is Fulfilled by Amazon. You send (or we source) inventory to Amazon's warehouses and they handle storage, packing, shipping and customer service for you." },
  { q: "How much profit can I expect?", a: "Returns depend on store type, capital and ramp time. Most managed stores hit consistent monthly profit after 60–120 days. We share realistic projections during your consultation." },
  { q: "How will I get paid?", a: "All revenue flows into your store payout account directly from the marketplace. We invoice our management fee monthly — you never wire us your sales." },
  { q: "What will be my level of involvement?", a: "After the initial setup and verification calls, your involvement drops to effectively zero. We run operations end-to-end and report to you monthly." },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Services", href: "#services" },
    { label: "How it Works", href: "#process" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* GLOBAL AMBIENT MESH */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70 dark:opacity-50 mesh-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_6%,transparent)_1px,transparent_1px)] [background-size:28px_28px] opacity-30 dark:opacity-20" />

      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-strong border-b border-border/50 shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ApplyForm
              trigger={
                <Button className="hidden rounded-full bg-[image:var(--gradient-brand)] px-6 font-semibold text-brand-foreground shadow-glow transition hover:-translate-y-0.5 lg:inline-flex">
                  Apply for a Store
                </Button>
              }
            />
            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-foreground"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden glass-strong border-t border-border/50">
            <div className="flex flex-col gap-1 px-6 py-4">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <ApplyForm
                trigger={
                  <Button className="mt-2 w-full rounded-full bg-[image:var(--gradient-brand)] font-semibold text-brand-foreground">
                    Apply for a Store
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
        <Parallax speed={0.15} className="pointer-events-none absolute -top-32 -right-32 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl animate-float-slow"
          >
          <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--brand), transparent 65%)" }} />
        </Parallax>
        <Parallax speed={0.2} className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl animate-float-slower">
          <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--brand-2), transparent 65%)" }} />
        </Parallax>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Full-Service E-commerce Agency
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              We do the{" "}
              <span className="relative inline-block">
                <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent animate-gradient">heavy lifting</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5 T 200 5" stroke="url(#u)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <defs><linearGradient id="u" x1="0" x2="1"><stop offset="0" stopColor="oklch(0.62 0.22 265)"/><stop offset="1" stopColor="oklch(0.7 0.2 295)"/></linearGradient></defs>
                </svg>
              </span>{" "}
              so you can do the easy living.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We are a full-service Amazon seller store management agency. We build, operate, and scale your store from the ground up — producing passive income with aggressive tactics at Ecom Solutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ApplyForm
                trigger={
                  <Button size="lg" className="rounded-full bg-[image:var(--gradient-brand)] px-8 py-6 text-base font-semibold text-brand-foreground shadow-glow transition-transform hover:-translate-y-1">
                    Apply for a Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
              <a href="#services" className="text-sm font-semibold text-foreground underline-offset-4 hover:underline">
                Explore our services →
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              {["No outsourcing", "Monthly reporting", "100% managed"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand" /> {t}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <Parallax speed={-0.08}>
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-[image:var(--gradient-brand)] opacity-30 blur-3xl animate-gradient" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border/60 shadow-float glass-strong">
                  <img
                    src={heroTeam}
                    alt="The Ecom Solutions agency team"
                    width={1920}
                    height={1080}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl glass-strong p-4 shadow-float sm:block">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-brand-foreground shadow-glow">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Trusted by</div>
                      <div className="font-display text-lg font-bold text-foreground">400+ Investors</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-5 -right-5 hidden rounded-2xl glass-strong p-3 shadow-float md:block">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand" />
                    <span className="text-xs font-semibold text-foreground">100% In-House Team</span>
                  </div>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Our Popular Services
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                Every channel that matters.{" "}
                <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">Fully managed.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Six battle-tested service lines across the world's largest marketplaces — all run by our in-house operations team.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-float">
                  <div className="absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--brand) 25%, transparent), transparent 60%)" }} />
                  <div className="relative">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-brand-foreground shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section className="relative py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                What we handle
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                We put your money to work, so you can put your mind at ease.
              </h2>
              <p className="mt-5 text-muted-foreground">
                From the first supplier handshake to the last shipped order, our internal team owns every step — so you don't have to think about it.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {handled.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-2xl glass px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span className="text-sm font-medium text-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-5">
              {pillars.map((p) => (
                <div key={p.title} className="group flex items-start gap-5 rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand transition-all group-hover:bg-[image:var(--gradient-brand)] group-hover:text-brand-foreground group-hover:shadow-glow">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-foreground">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Why investors choose us
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                Built for{" "}
                <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">hands-free</span>{" "}
                passive income.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="group h-full rounded-3xl glass p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-float">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-brand-foreground shadow-glow transition-transform duration-500 group-hover:scale-110">
                    <b.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-foreground">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                How it works
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                Three steps from signup to scale.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="relative h-full overflow-hidden rounded-3xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-float">
                  <div className="font-display text-7xl font-black leading-none bg-[image:var(--gradient-brand)] bg-clip-text text-transparent opacity-30">{s.n}</div>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[image:var(--gradient-navy)] p-12 text-navy-foreground shadow-float">
            <Parallax speed={0.1} className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-40 blur-3xl">
              <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--brand), transparent 65%)" }} />
            </Parallax>
            <Parallax speed={-0.1} className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full opacity-40 blur-3xl">
              <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--brand-2), transparent 65%)" }} />
            </Parallax>
            <div className="relative grid gap-10 text-center md:grid-cols-3">
              {[
                { n: 400, label: "Happy Clients" },
                { n: 300, label: "Team Members" },
                { n: 700, label: "Completed Projects" },
              ].map((s) => (
                <Reveal key={s.label}>
                  <div>
                    <div className="font-display text-5xl font-black sm:text-6xl">
                      <Counter end={s.n} />
                    </div>
                    <div className="mt-2 text-sm uppercase tracking-[0.18em] opacity-80">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-28">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">FAQ</div>
              <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                Frequently asked questions.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="mt-12 space-y-4">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl glass px-6 transition-shadow data-[state=open]:shadow-soft"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-foreground hover:no-underline sm:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="relative py-28">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] glass-strong p-12 text-center shadow-float">
              <Parallax speed={0.1} className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-40 blur-3xl">
                <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--brand), transparent 65%)" }} />
              </Parallax>
              <div className="relative">
                <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                  Ready to own a{" "}
                  <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">passive</span>{" "}
                  e-commerce store?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  Book a no-pressure consultation. We'll walk you through capital requirements, expected timelines and the marketplaces best suited to you.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <ApplyForm
                    trigger={
                      <Button size="lg" className="rounded-full bg-[image:var(--gradient-brand)] px-8 py-6 text-base font-semibold text-brand-foreground shadow-glow transition hover:-translate-y-1">
                        Apply for a Store
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    }
                  />
                  <a href="#contact" className="text-sm font-semibold text-foreground underline-offset-4 hover:underline">
                    Or contact us →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="relative bg-[image:var(--gradient-navy)] text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-brand)] shadow-glow">
                  <span className="font-display text-xl font-black text-brand-foreground">E</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display text-lg font-black tracking-tight">Ecom.</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] opacity-70">Solutions</span>
                </div>
              </div>
              <p className="mt-4 max-w-md text-sm opacity-80">
                Full-service e-commerce store management for investors who want results without the operational headache.
              </p>
              <div className="mt-6 space-y-3 text-sm opacity-90">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>H-68/1, Omor Ali Lane, West Rampura, Dhaka-1219, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  <a href="tel:+880" className="hover:underline">+880 1XXX-XXXXXX</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-brand" />
                  <a href="mailto:info@ecomsolutionsbd.com" className="hover:underline">info@ecomsolutionsbd.com</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm opacity-85">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-brand">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider">Newsletter</h4>
              <p className="mt-4 text-sm opacity-80">Insights on e-commerce automation, monthly.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.currentTarget as HTMLFormElement;
                  f.reset();
                }}
                className="mt-4 flex gap-2"
              >
                <Input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="border-white/20 bg-white/10 text-navy-foreground placeholder:text-white/50"
                />
                <Button type="submit" className="bg-[image:var(--gradient-brand)] text-brand-foreground hover:opacity-90">
                  Join
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-70 sm:flex-row">
            <div>© {new Date().getFullYear()} Ecom Solutions. All rights reserved.</div>
            <div>Built for investors who value their time.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
