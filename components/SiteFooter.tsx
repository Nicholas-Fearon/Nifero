import Link from "next/link";
import { services } from "@/lib/services";

export default function SiteFooter() {
  return (
    <footer className="bg-forest text-mist">
      <div className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="Nifero home"
              className="font-display text-3xl font-extrabold tracking-[-.095em]"
            >
              Nifero<span aria-hidden="true" className="text-gold">.</span>
            </Link>
            <p className="mt-2 text-sm text-[#c7e3d0]">Independent web development in Suffolk, UK.</p>
          </div>
          <nav aria-label="Website links">
            <h2 className="mb-3 text-base font-bold">Website</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <li><Link href="/#services" className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">Services</Link></li>
              <li><Link href="/#work" className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">Design concepts</Link></li>
              <li><Link href="/#process" className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">Process</Link></li>
              <li><Link href="/#contact" className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">Contact</Link></li>
            </ul>
          </nav>
          <nav aria-label="Service links">
            <h2 className="mb-3 text-base font-bold">Services</h2>
            <ul className="text-sm">
              {services.map(({ slug, shortTitle }) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">{shortTitle}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Privacy and data links">
            <h2 className="mb-3 text-base font-bold">Privacy and data</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <li><Link href="/privacy" className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">Privacy notice</Link></li>
              <li><Link href="/data-protection" className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">Data protection</Link></li>
              <li><Link href="/cookies" className="inline-flex min-h-11 items-center py-2 hover:underline hover:underline-offset-4">Cookie policy</Link></li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-white/20 pt-5 text-xs text-[#c7e3d0]">
          © {new Date().getFullYear()} Nifero
        </p>
      </div>
    </footer>
  );
}
