"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { enquiryLimits, enquiryServices } from "@/lib/enquiry-fields";

const services = [
  {
    title: "Website design & development",
    body: "Give customers a clear, easy-to-use website where they can find your services and get in touch on any device.",
    note: "New websites & redesigns",
    featured: true,
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
const concepts = [
  {
    id: "local",
    category: "website",
    name: "Local business website",
    body: "A service-led homepage with clear contact details and enquiry options for customers on mobile.",
    art: "the local.",
    style: "bg-[#d7e8c8]",
    inner: "bg-white text-[#233e26]",
  },
  {
    id: "booking",
    category: "app",
    name: "Online booking",
    body: "An appointment booking flow where customers can see available times and choose a slot.",
    art: "bookwise.",
    style: "bg-[#263c35]",
    inner: "bg-[#15221c] text-lime border border-[#4a6756]",
  },
  {
    id: "dashboard",
    category: "app",
    name: "Business dashboard",
    body: "A single view of key figures and activity to help a team keep track of its work.",
    art: "overview.",
    style: "bg-[#e8ddcf]",
    inner: "bg-[#f4eee4] text-[#41362d]",
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

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#home"
      aria-label="Nifero home"
      className={`font-display text-[32px] font-extrabold tracking-[-.095em] ${light ? "text-white" : "text-ink"}`}
    >
      Nifero<span className="text-[#83a93b]">.</span>
    </a>
  );
}
function PillLink({
  href,
  children,
  light = false,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  const styles = outline
    ? "border border-[#657669] text-white hover:bg-white/10"
    : light
      ? "bg-lime text-forest hover:bg-[#ddffa1]"
      : "bg-ink text-white hover:bg-[#304837]";
  return (
    <a
      className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5 ${styles}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={17} />
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
  const [filter, setFilter] = useState<"all" | "website" | "app">("all");
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const submission = useRef<{ id: string; payload: string } | null>(null);
  const shown = concepts.filter(
    (c) => filter === "all" || c.category === filter,
  );

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
      <div className="bg-forest text-[#d7e0d8]">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-2 px-5 py-2.5 text-xs sm:px-8">
          <span>
            <span className="mr-2 inline-block size-2 rounded-full bg-lime" />
            Independent web development studio
          </span>
          <span>Suffolk, UK</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[#dfe5dc] bg-mist/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-[1160px] items-center justify-between px-5 sm:px-8">
          <Logo />
          <div className="hidden items-center gap-5 text-sm font-bold md:flex lg:gap-8">
            <a href="#services" className="hover:text-[#668b2b]">
              Services
            </a>
            <a href="#work" className="hover:text-[#668b2b]">
              Design concepts
            </a>
            <a href="#process" className="hover:text-[#668b2b]">
              Process
            </a>
            <a href="#about" className="hover:text-[#668b2b]">
              About
            </a>
            <PillLink href="#contact">Get in touch</PillLink>
          </div>
          <button
            className="rounded-lg p-2 md:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {menuOpen && (
          <div className="flex flex-col gap-5 border-t border-[#dfe5dc] px-6 py-6 text-sm font-bold md:hidden">
            {[
              ["Services", "#services"],
              ["Design concepts", "#work"],
              ["Process", "#process"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([name, href]) => (
              <a key={href} onClick={() => setMenuOpen(false)} href={href}>
                {name}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="home">
        <section className="relative overflow-hidden bg-forest text-white">
          <div className="pointer-events-none absolute -right-64 -top-60 size-[690px] rounded-full border border-[#34453a]" />
          <div className="relative mx-auto grid max-w-[1160px] items-center gap-12 px-5 py-24 sm:px-8 lg:min-h-[620px] lg:grid-cols-[1.1fr_.9fr] lg:py-16">
            <div>
              <h1 className="font-display text-[clamp(2.65rem,6.4vw,5.8rem)] font-extrabold leading-[1.08] tracking-[-.075em]">
                Web design and
                <br />
                <span className="text-lime">development</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-[#b6c5ba]">
                I build and maintain websites for businesses across the UK. I also develop
                booking systems, dashboards and other custom web applications.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PillLink href="#contact" light>
                  Discuss your project
                </PillLink>
                <PillLink href="#services" outline>
                  View services
                </PillLink>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="relative mx-auto h-[350px] w-full max-w-[470px] sm:h-[440px]"
            >
              <div className="absolute right-1 top-8 w-[96%] rotate-3 overflow-hidden rounded-[18px] border border-[#9daaa0] bg-[#f6f8f3] text-ink shadow-[0_25px_85px_#0008]">
                <div className="flex gap-1.5 bg-[#e6eae2] p-4">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="size-2 rounded-full bg-[#adb8ad]"
                    />
                  ))}
                </div>
                <div className="p-7 sm:p-9">
                  <div className="h-6 w-24 rounded-full bg-[#dcf4af]" />
                  <div className="mt-6 h-5 w-4/5 rounded bg-[#183328]" />
                  <div className="mt-3 h-5 w-3/5 rounded bg-[#183328]" />
                  <div className="mt-5 h-2 w-full rounded bg-[#c4cdc5]" />
                  <div className="mt-2 h-2 w-2/3 rounded bg-[#c4cdc5]" />
                  <div className="mt-6 flex h-28 items-end justify-evenly rounded-xl bg-[#183328] px-4 pt-5">
                    {[45, 70, 55, 84, 66, 100].map((h, i) => (
                      <span
                        key={i}
                        className="w-[12%] rounded-t bg-lime"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="services"
          className="mx-auto max-w-[1160px] px-5 py-24 sm:px-8"
        >
          <Heading heading="Services" />
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className={`flex flex-col rounded-[23px] border border-[#dce2d8] p-8 transition-transform hover:-translate-y-1 ${s.featured ? "bg-[#d5ef9d]" : "bg-white"}`}
              >
                <h3 className="mb-4 max-w-sm font-display text-[29px] font-bold leading-tight">
                  {s.title}
                </h3>
                <p className="max-w-md text-[15px] leading-7 text-[#536359]">
                  {s.body}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <small className="text-xs font-bold text-[#527b26]">
                    {s.note}
                  </small>
                  <a
                    href="#contact"
                    aria-label={`Enquire about ${s.title}`}
                    className="grid size-11 place-items-center rounded-full bg-white/80 text-ink transition-transform hover:rotate-45"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="work" className="bg-[#e9ede5] py-24">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <Heading
              heading="Design concepts"
              description="Sample designs for a business website, a booking system and a dashboard."
            />
            <div
              className="mb-8 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter design concepts"
            >
              {(
                [
                  ["all", "All designs"],
                  ["website", "Websites"],
                  ["app", "Web applications"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  aria-pressed={filter === id}
                  className={`rounded-full border px-5 py-2.5 text-sm font-bold ${filter === id ? "border-ink bg-ink text-white" : "border-[#ced7ca] text-[#4a5a4c]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {shown.map((c) => (
                <article
                  key={c.id}
                  className="overflow-hidden rounded-[20px] border border-[#d8dfd5] bg-white"
                >
                  <div
                    aria-hidden="true"
                    className={`flex h-[220px] items-center justify-center p-6 ${c.style}`}
                  >
                    <div
                      className={`h-[155px] w-[88%] rounded-xl p-5 shadow-xl ${c.inner}`}
                    >
                      <p className="font-display text-2xl font-extrabold tracking-tight">
                        {c.art}
                      </p>
                      <div className="mt-4 h-2 rounded-full bg-current opacity-10" />
                      <div className="mt-2 h-2 w-1/2 rounded-full bg-current opacity-10" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-display text-xl font-extrabold">
                      {c.name}
                    </h3>
                    <p className="text-sm leading-6 text-muted">{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="process"
          className="mx-auto max-w-[1160px] px-5 py-24 sm:px-8"
        >
          <Heading heading="How projects work" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, body]) => (
              <div key={title} className="border-t-2 border-[#bac9b4] pt-6">
                <h3 className="mb-3 font-display text-2xl font-bold">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="about" className="bg-forest py-24 text-white">
          <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr]">
            <div className="rounded-[25px] bg-[#26372c] p-9">
              <strong className="font-display text-4xl font-extrabold leading-tight">
                Nicholas Fearon
              </strong>
              <p className="mt-3 text-[#cce8af]">Independent web developer</p>
            </div>
            <div>
              <h2 className="mb-7 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                About Nifero
              </h2>
              <p className="mb-4 text-[17px] leading-8 text-[#b4c2b6]">
                I run Nifero, an independent web development studio in Suffolk.
                You’ll work directly with me from the first conversation through launch.
              </p>
              <p className="text-[17px] leading-8 text-[#b4c2b6]">
                My experience running a business shapes how I approach each site.
                I start with what your customers need to find and what you need the site to do.
              </p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[900px] px-5 py-24 sm:px-8">
          <h2 className="mb-8 font-display text-4xl font-extrabold sm:text-5xl">
            Frequently asked questions
          </h2>
          {faqs.map(([q, a]) => (
            <details key={q} className="group border-b border-[#dce2d8] py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-extrabold marker:hidden">
                {q}
                <span aria-hidden="true" className="text-xl text-[#718b55] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-muted">{a}</p>
            </details>
          ))}
        </section>
        <section id="contact" className="bg-[#d5ee9d] py-24">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-5xl font-extrabold leading-[1.1] sm:text-6xl">
                Discuss your project
              </h2>
              <p className="mt-7 max-w-md text-lg leading-8 text-[#43543d]">
                Tell me what you need and what you’d like to achieve.
                If you have an existing site or a target launch date, include those details.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              method="post"
              action="/api/enquiries"
              className="rounded-[23px] bg-white p-6 shadow-sm sm:p-9"
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
                  className="rounded-xl border border-[#dce2d8] px-4 py-3 focus:outline-[#83a93b]"
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
                  className="rounded-xl border border-[#dce2d8] px-4 py-3 focus:outline-[#83a93b]"
                />
                <label className="text-sm font-bold" htmlFor="service">
                  What can I help with?
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className="rounded-xl border border-[#dce2d8] bg-white px-4 py-3 focus:outline-[#83a93b]"
                >
                  <option value="" disabled>Select a service</option>
                  {enquiryServices.map((service) => <option key={service}>{service}</option>)}
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
                  className="rounded-xl border border-[#dce2d8] px-4 py-3 focus:outline-[#83a93b]"
                />
                <div hidden>
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold text-white disabled:opacity-60"
                >
                  {sending ? "Sending enquiry…" : "Send enquiry"} <ArrowRight size={16} />
                </button>
                <p className="text-sm text-muted">
                  I’ll use your details to respond to your enquiry.
                </p>
              </fieldset>
              <div role="status" aria-live="polite">
                {formError && (
                  <p className="mt-4 text-sm font-semibold text-red-800">{formError}</p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-forest text-white">
        <div className="mx-auto max-w-[1160px] px-5 py-12 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Logo light />
            <div className="flex gap-5 text-sm">
              <a href="#services">Services</a>
              <a href="#work">Design concepts</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="mt-10 border-t border-[#34483b] pt-6 text-xs text-[#9cb09f]">
            © {new Date().getFullYear()} Nifero.
          </div>
        </div>
      </footer>
    </>
  );
}
