"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { enquiryLimits, enquiryServices } from "@/lib/enquiry-fields";

const services = [
  {
    num: "01 / BUILD",
    title: "Website design & development",
    body: "Thoughtfully built websites that look sharp, work smoothly and make it easy for customers to take the next step.",
    note: "New websites & redesigns",
    featured: true,
  },
  {
    num: "02 / CARE",
    title: "Website maintenance & support",
    body: "Planned updates, monitoring, backups and agreed technical support to keep your website running reliably.",
    note: "Monthly plans available",
  },
  {
    num: "03 / IMPROVE",
    title: "Repairs, performance & optimisation",
    body: "Fix what is broken, improve speed and mobile usability, and make the most of your existing website.",
    note: "One-off fixes & improvements",
  },
  {
    num: "04 / SOLVE",
    title: "Custom web solutions",
    body: "Booking tools, portals, dashboards and practical workflows built around how your business actually operates.",
    note: "Scoped & quoted individually",
  },
];
const concepts = [
  {
    id: "local",
    category: "website",
    label: "Concept / Business website",
    name: "Local business presence",
    body: "A polished, mobile-first website to help customers discover, understand and contact a local business.",
    art: "the local.",
    style: "bg-[#d7e8c8]",
    inner: "bg-white text-[#233e26]",
  },
  {
    id: "booking",
    category: "app",
    label: "Concept / Booking solution",
    name: "Smarter bookings",
    body: "A clear booking experience for appointments or sessions, with availability management.",
    art: "bookwise.",
    style: "bg-[#263c35]",
    inner: "bg-[#15221c] text-lime border border-[#4a6756]",
  },
  {
    id: "dashboard",
    category: "app",
    label: "Concept / Business dashboard",
    name: "Better business visibility",
    body: "A dashboard concept that brings key business information together in one useful place.",
    art: "overview.",
    style: "bg-[#e8ddcf]",
    inner: "bg-[#f4eee4] text-[#41362d]",
  },
];
const steps = [
  [
    "01",
    "Discover",
    "We talk through your business, audience, goals and the problem you need to solve.",
  ],
  [
    "02",
    "Plan",
    "You get a proposal with clear scope, pricing, delivery stages and deliverables.",
  ],
  [
    "03",
    "Build",
    "Your project is developed and tested, with feedback at agreed milestones.",
  ],
  [
    "04",
    "Support",
    "Choose ongoing care or request further improvements after launch.",
  ],
];
const faqs = [
  [
    "Do you only work with new websites?",
    "No. Nifero can also repair, improve and maintain existing websites, following an initial technical review.",
  ],
  [
    "Do you build WordPress websites?",
    "Yes. WordPress suits many business websites. For bespoke functionality, custom Next.js and React development is also available.",
  ],
  [
    "Can you take over maintenance of my website?",
    "Usually, after an onboarding audit of access, plugins, backups, hosting and any existing issues.",
  ],
  [
    "How much does a website cost?",
    "Projects are quoted individually. After an initial discussion you will receive a written proposal outlining scope, price and delivery stages.",
  ],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#home"
      aria-label="Nifero home"
      className={`font-display text-[32px] font-extrabold tracking-[-.095em] ${light ? "text-white" : "text-ink"}`}
    >
      nifero<span className="text-[#83a93b]">.</span>
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
  number,
  heading,
  description,
}: {
  number: string;
  heading: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[.16em] text-[#60842a]">
          {number}
        </p>
        <h2 className="font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl">
          {heading}
        </h2>
      </div>
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
      setFormError("We couldn’t send your enquiry. Please check your connection and try again.");
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
          <span>Based in Suffolk · Working across the UK</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[#dfe5dc] bg-mist/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-[1160px] items-center justify-between px-5 sm:px-8">
          <Logo />
          <div className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a href="#services" className="hover:text-[#668b2b]">
              Services
            </a>
            <a href="#work" className="hover:text-[#668b2b]">
              Our work
            </a>
            <a href="#process" className="hover:text-[#668b2b]">
              Process
            </a>
            <a href="#about" className="hover:text-[#668b2b]">
              About
            </a>
            <PillLink href="#contact">Let&apos;s talk</PillLink>
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
              ["Our work", "#work"],
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
              <p className="mb-7 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.16em] text-lime">
                <span className="h-0.5 w-6 bg-lime" />
                Web development & digital solutions
              </p>
              <h1 className="font-display text-[clamp(3.3rem,6.4vw,5.8rem)] font-extrabold leading-[1.08] tracking-[-.075em]">
                Better websites.
                <br />
                <span className="text-lime">Smarter business.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-[#b6c5ba]">
                Modern websites, dependable maintenance and practical digital
                solutions built to help your business move forward.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PillLink href="#contact" light>
                  Start a project
                </PillLink>
                <PillLink href="#services" outline>
                  Explore services
                </PillLink>
              </div>
              <p className="mt-9 text-xs text-[#8fa294]">
                Personal service · Clear communication · Built with purpose
              </p>
            </div>
            <div
              aria-label="Illustrative website dashboard design"
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
                  <span className="rounded-full bg-[#dcf4af] px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#335019]">
                    Your business online
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                    Designed to make
                    <br />
                    an impact.
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-[#617168]">
                    Beautiful design. Useful features. A better experience for
                    your customers.
                  </p>
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
              <div className="absolute bottom-4 left-0 -rotate-6 rounded-2xl bg-[#d5f28d] px-6 py-5 text-[#203019] shadow-xl sm:-left-7">
                <strong className="font-display text-3xl font-extrabold">
                  100%
                </strong>
                <p className="mt-1 text-xs font-bold">Focused on your goals</p>
              </div>
            </div>
          </div>
        </section>
        <div className="border-b border-[#dce2d8] bg-[#e9ece4]">
          <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs font-extrabold uppercase tracking-[.1em] text-[#657568] sm:px-8">
            <span>Modern development</span>
            <span>Personal approach</span>
            <span>Reliable support</span>
            <span>Practical solutions</span>
          </div>
        </div>
        <section
          id="services"
          className="mx-auto max-w-[1160px] px-5 py-24 sm:px-8"
        >
          <Heading
            number="01 / What we do"
            heading={
              <>
                The right solution.
                <br />
                For the right problem.
              </>
            }
            description="From a new website to ongoing support and custom tools, straightforward solutions shaped around your business."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.num}
                className={`flex min-h-[290px] flex-col rounded-[23px] border border-[#dce2d8] p-8 transition-transform hover:-translate-y-1 ${s.featured ? "bg-[#d5ef9d]" : "bg-white"}`}
              >
                <p className="text-xs font-extrabold tracking-wider text-[#718474]">
                  {s.num}
                </p>
                <h3 className="mb-4 mt-8 max-w-sm font-display text-[29px] font-bold leading-tight">
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
              number="02 / Portfolio"
              heading={
                <>
                  Made to solve
                  <br />
                  real problems.
                </>
              }
              description="Examples of digital experiences Nifero could build. These are illustrative concepts, not completed client projects."
            />
            <div
              className="mb-8 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter portfolio concepts"
            >
              {(
                [
                  ["all", "All concepts"],
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
                      <span className="mt-4 inline-block rounded-full bg-[#314631] px-3 py-2 text-[9px] text-white">
                        Explore concept ↗
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#628a2d]">
                      {c.label}
                    </p>
                    <h3 className="my-2 font-display text-xl font-extrabold">
                      {c.name}
                    </h3>
                    <p className="text-sm leading-6 text-muted">{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">
              Portfolio items are illustrative and should be replaced with real
              case studies and verified results.
            </p>
          </div>
        </section>
        <section
          id="process"
          className="mx-auto max-w-[1160px] px-5 py-24 sm:px-8"
        >
          <Heading
            number="03 / How it works"
            heading={
              <>
                Simple process.
                <br />
                No guesswork.
              </>
            }
            description="Work directly with the developer from the first conversation through launch and support."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n, title, body]) => (
              <div key={n} className="border-t-2 border-[#bac9b4] pt-6">
                <span className="text-sm font-extrabold text-[#77994c]">
                  {n}
                </span>
                <h3 className="mb-3 mt-8 font-display text-2xl font-bold">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="about" className="bg-forest py-24 text-white">
          <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr]">
            <div className="flex min-h-[335px] flex-col justify-between overflow-hidden rounded-[25px] bg-[#26372c] p-9">
              <span className="text-xs font-bold uppercase tracking-widest text-[#cce8af]">
                The person behind Nifero
              </span>
              <strong className="font-display text-4xl font-extrabold leading-tight">
                Small studio.
                <br />
                Big-picture thinking.
              </strong>
              <span className="text-xs text-[#cce8af]">
                Independent by design.
              </span>
            </div>
            <div>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-lime">
                04 / About Nifero
              </p>
              <h2 className="mb-7 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Personal service.
                <br />
                Practical solutions.
              </h2>
              <p className="mb-4 text-[17px] leading-8 text-[#b4c2b6]">
                Hi, I&apos;m Nicholas Fearon, the developer behind Nifero. I
                combine hands-on web development with experience running a
                business, so I understand that a website should do more than
                look good. It needs to be clear, reliable and useful.
              </p>
              <p className="text-[17px] leading-8 text-[#b4c2b6]">
                I build with modern technologies and WordPress, choosing the
                approach that fits the project rather than forcing every
                business into the same template.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Next.js & React",
                  "WordPress",
                  "Tailwind CSS",
                  "Supabase",
                  "Business-first thinking",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#49604e] px-3 py-2 text-xs font-semibold text-[#d8e7d6]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[900px] px-5 py-24 sm:px-8">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#60842a]">
            Good to know
          </p>
          <h2 className="mb-8 font-display text-4xl font-extrabold sm:text-5xl">
            Frequently asked questions.
          </h2>
          {faqs.map(([q, a]) => (
            <details key={q} className="group border-b border-[#dce2d8] py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-extrabold marker:hidden">
                {q}
                <span className="text-xl text-[#718b55] group-open:rotate-45">
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
              <p className="mb-4 text-xs font-extrabold uppercase tracking-widest">
                05 / Let&apos;s talk
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[1.1] sm:text-6xl">
                Have a project
                <br />
                in mind?
              </h2>
              <p className="mt-7 max-w-md text-lg leading-8 text-[#43543d]">
                Whether you need a new website, support with an existing one or
                a tailored digital solution, tell me what you&apos;re working
                on.
              </p>
              <p className="mt-7 font-bold">
                Based in Suffolk. Working across the UK.
              </p>
              <div className="mt-9 flex items-center gap-2 text-sm font-bold">
                <ArrowDown size={18} /> Start with a conversation
              </div>
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
                  placeholder="Your name"
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
                  className="rounded-xl border border-[#dce2d8] bg-white px-4 py-3 focus:outline-[#83a93b]"
                >
                  {enquiryServices.map((service) => <option key={service}>{service}</option>)}
                </select>
                <label className="text-sm font-bold" htmlFor="message">
                  Tell me about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={enquiryLimits.message}
                  rows={4}
                  placeholder="A little about what you need..."
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
            <p className="text-sm text-[#a6b8aa]">
              Modern websites. Reliable support. Practical solutions.
            </p>
            <div className="flex gap-5 text-sm">
              <a href="#services">Services</a>
              <a href="#work">Work</a>
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
