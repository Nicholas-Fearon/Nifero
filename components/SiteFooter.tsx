import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-forest text-mist">
      <div className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-[1.2fr_1fr_1fr]">
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
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <li><Link href="/#services" className="hover:underline">Services</Link></li>
              <li><Link href="/#work" className="hover:underline">Design concepts</Link></li>
              <li><Link href="/#process" className="hover:underline">Process</Link></li>
              <li><Link href="/#contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
          <nav aria-label="Privacy and data links">
            <h2 className="mb-3 text-base font-bold">Privacy and data</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <li><Link href="/privacy" className="hover:underline">Privacy notice</Link></li>
              <li><Link href="/data-protection" className="hover:underline">Data protection</Link></li>
              <li><Link href="/cookies" className="hover:underline">Cookie policy</Link></li>
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
