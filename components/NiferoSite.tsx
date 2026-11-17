"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import ConceptExplorer from "@/components/ConceptExplorer";
import { enquiryLimits, enquiryServices } from "@/lib/enquiry-fields";

const services = [
  {
    title: "Website design & development",
    body: "Give customers a clear, easy-to-use website where they can find your services and get in touch on any device.",
    note: "New websites & redesigns",
  },
  {
    title: "Website maintenance & support",
    body: "Keep your website running with planned updates, monitoring, backups and technical support.",
    note: "Monthly plans available",
  },
  {
    title: "Repairs, performance & optimisation",
    body: "Fix broken features, speed up slow pages and make your existing website easier to use on mobile.",
    note: "One-off projects",
  },
  {
    title: "Custom web applications",
    body: "Manage bookings, give customers a place to access information or bring business data together in a dashboard.",
    note: "Quoted to suit the project",
  },
];
const steps = [
  [
    "Discover",
    "We discuss your business, your customers and what the project needs to achieve.",
  ],
  [
    "Plan",
    "I send a written proposal covering the scope, price and delivery stages.",
  ],
  [
    "Build & test",
    "I design, build and test the site. You review the work at agreed stages.",
  ],
  [
    "Launch & support",
    "Once the site is live, you can arrange ongoing maintenance or request further updates.",
  ],
];
const faqs = [
  [
    "Can you improve an existing website?",
    "Yes. I review your site first, then recommend repairs or improvements based on what it needs.",
  ],
  [
    "Do you build WordPress websites?",
    "Yes. I build and maintain WordPress websites. I also use Next.js and React for projects that need custom functionality.",
  ],
  [
    "Can you take over maintenance of my website?",
    "In most cases, yes. I’ll review the hosting, backups, plugins and any known issues before agreeing what the maintenance plan covers.",
  ],
  [
    "How much does a website cost?",
    "The price depends on the scope of the work. After an initial discussion, I’ll send you a written quote.",
  ],
];

function Logo() {
  return (
    <a
      href="#home"
      aria-label="Nifero home"
      className="font-display text-[32px] font-extrabold tracking-[-.095em] text-ink"
    >
      Nifero<span className="text-celtic">.</span>
    </a>
  );
}
function Heading({
  heading,
  description,
}: {
  heading: string;
  description?: string;
}) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <h2 className="font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl">
        {heading}
      </h2>
      {description && (
        <p className="max-w-sm leading-7 text-muted">{description}</p>
      )}
    </div>
  );
}

export default function NiferoSite() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const submission = useRef<{ id: string; payload: string } | null>(null);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const payload = JSON.stringify(fields);
    setSending(true);
    setFormError("");

    try {
      if (submission.current?.payload !== payload) {
        submission.current = { id: crypto.randomUUID(), payload };
      }
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, id: submission.current.id }),
      });
      if (!response.ok) {
        const result = await response.json();
        setFormError(result.message);
        return;
      }
      form.reset();
      submission.current = null;
      router.push("/thank-you");
    } catch {
      setFormError("Your enquiry could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="reference-header">
        <nav aria-label="Main navigation" className="reference-container reference-nav">
          <Logo />
          <div className="reference-desktop-links">
            <a href="#work">Design concepts</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
          </div>
          <a className="reference-button reference-header-cta" href="#contact">
            Get in touch <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="reference-menu"
            aria-expanded={menuOpen}
            aria-controls="reference-mobile-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </nav>
        <nav id="reference-mobile-nav" aria-label="Mobile navigation" className="reference-mobile-nav" hidden={!menuOpen}>
          {[
            ["Design concepts", "#work"],
            ["Services", "#services"],
            ["Process", "#process"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </header>

      <main id="home">
        <div className="reference-intro">
          <section className="reference-hero reference-container">
            <p className="reference-location"><span aria-hidden="true" /> Independent web developer · Suffolk, UK</p>
            <h1>Web design and <span>development</span></h1>
            <p className="reference-lede">
              I build and maintain websites, booking systems and custom web applications
              for businesses across the UK.
            </p>
            <a className="reference-button" href="#contact">
              Discuss your project <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </section>

          <section id="work" className="reference-container reference-showcase" aria-labelledby="reference-showcase-title">
            <h2 id="reference-showcase-title">See how it could work</h2>
            <p className="reference-section-lede">
              Explore a café website, an online booking flow and an enquiries dashboard.
            </p>
            <ConceptExplorer />
          </section>
        </div>
        <section
          id="services"
          className="mx-auto max-w-[1160px] px-5 py-16 sm:px-8 sm:py-24"
        >
          <Heading heading="Services" />
          <div className="grid gap-x-10 md:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className="flex flex-col border-t border-forest/20 py-6"
              >
                <h3 className="mb-2 max-w-sm font-display text-[26px] font-bold leading-tight">
                  {s.title}
                </h3>
                <p className="max-w-md text-[15px] leading-7 text-[#3e5144]">
                  {s.body}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <small className="text-xs font-bold text-[#00652d]">
                    {s.note}
                  </small>
                  <a
                    href="#contact"
                    aria-label={`Enquire about ${s.title}`}
                    className="inline-flex min-h-11 items-center gap-2 font-bold text-celtic hover:underline"
                  >
                    Enquire <ArrowUpRight aria-hidden="true" size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="process"
          className="mx-auto max-w-[1160px] px-5 py-16 sm:px-8 sm:py-24"
        >
          <Heading heading="How projects work" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, body]) => (
              <div key={title} className="border-t-2 border-[#9cbea5] pt-6">
                <h3 className="mb-3 font-display text-2xl font-bold">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-[900px] px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="mb-8 font-display text-4xl font-extrabold sm:text-5xl">
            Frequently asked questions
          </h2>
          {faqs.map(([q, a]) => (
            <details key={q} className="group border-b border-[#d7e3d9] py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-extrabold marker:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="text-xl text-[#007a33] group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-muted">{a}</p>
            </details>
          ))}
        </section>
        <section id="contact" className="border-t border-forest/15 bg-[#f0f1e8] py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-5xl font-extrabold leading-[1.1] sm:text-6xl">
                Discuss your project
              </h2>
              <p className="mt-7 max-w-md text-lg leading-8 text-[#3e4841]">
                Tell me what you need and what you’d like to achieve. If you
                have an existing site or a target launch date, include those
                details.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              method="post"
              action="/api/enquiries"
              className="min-w-0 rounded-2xl border border-forest/15 bg-white p-5 sm:p-8"
            >
              <fieldset className="grid gap-4" disabled={sending}>
                <label className="text-sm font-bold" htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  maxLength={enquiryLimits.name}
                  autoComplete="name"
                  className="min-w-0 rounded-lg border border-[#c4cdc1] px-4 py-3 focus:outline-[#007a33]"
                />
                <label className="text-sm font-bold" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={enquiryLimits.email}
                  autoComplete="email"
                  placeholder="you@business.co.uk"
                  className="min-w-0 rounded-lg border border-[#c4cdc1] px-4 py-3 focus:outline-[#007a33]"
                />
                <label className="text-sm font-bold" htmlFor="service">
                  What can I help with?
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className="min-w-0 rounded-lg border border-[#c4cdc1] bg-white px-4 py-3 focus:outline-[#007a33]"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {enquiryServices.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
                <label className="text-sm font-bold" htmlFor="message">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={enquiryLimits.message}
                  rows={4}
                  className="min-w-0 rounded-lg border border-[#c4cdc1] px-4 py-3 focus:outline-[#007a33]"
                />
                <div hidden>
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-bold text-white disabled:opacity-60"
                >
                  {sending ? "Sending enquiry…" : "Send enquiry"}{" "}
                  <ArrowRight size={16} />
                </button>
                <p className="text-sm text-muted">
                  I’ll use your details to respond to your enquiry. Read the{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-celtic underline underline-offset-4"
                  >
                    privacy notice
                  </Link>
                  .
                </p>
              </fieldset>
              <div role="status" aria-live="polite">
                {formError && (
                  <p className="mt-4 text-sm font-semibold text-red-800">
                    {formError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
