import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-14 sm:px-8 sm:py-20">
      <div className="w-full max-w-3xl rounded-3xl bg-forest px-6 py-10 text-mist sm:px-12 sm:py-14">
        <p className="text-sm font-bold tracking-wide text-gold">Error 404</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-lg leading-8 text-[#e9f6ed]">
          The page may have moved or the link may be out of date.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink">
            Back to the homepage
          </Link>
          <Link href="/#contact" className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold hover:bg-white/10">
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
