import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const title = `${service.title} | Nifero`;
  const url = `/services/${service.slug}`;
  return {
    title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: { title, description: service.description, url, type: "website" },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <Link href="/" className="inline-flex min-h-11 items-center text-celtic underline underline-offset-4">Nifero</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#services" className="inline-flex min-h-11 items-center text-celtic underline underline-offset-4">Services</Link>
      </nav>
      <h1 className="max-w-[22ch] font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl">{service.title}</h1>
      <p className="mt-5 max-w-[65ch] text-lg leading-8 text-muted">{service.intro}</p>
      <div className="mt-9 space-y-8 border-t border-forest/15 pt-8">
        {service.sections.map(({ title, body }) => (
          <section key={title}>
            <h2 className="mb-2 text-2xl font-bold">{title}</h2>
            <p className="max-w-[70ch] leading-7 text-muted">{body}</p>
          </section>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Questions about this service</h2>
        {service.questions.map(([question, answer]) => (
          <details key={question} className="border-t border-forest/20">
            <summary className="min-h-11 cursor-pointer py-3 font-semibold">{question}</summary>
            <p className="max-w-[70ch] pb-4 leading-7 text-muted">{answer}</p>
          </details>
        ))}
      </section>
      <div className="mt-8">
        <Link href="/#contact" className="inline-flex min-h-11 items-center rounded-full bg-forest px-5 py-3 text-sm font-bold text-mist hover:bg-celtic">
          {service.contact}
        </Link>
      </div>
      <nav aria-label="Other services" className="mt-10 border-t border-forest/15 pt-6">
        <h2 className="mb-2 text-xl font-bold">Other services</h2>
        <ul className="flex flex-wrap gap-x-6">
          {services.filter((item) => item.slug !== slug).map((item) => (
            <li key={item.slug}>
              <Link href={`/services/${item.slug}`} className="inline-flex min-h-11 items-center text-sm text-celtic underline underline-offset-4">{item.shortTitle}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
