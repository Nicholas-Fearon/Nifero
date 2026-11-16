import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enquiry received | Nifero",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="grid flex-1 place-items-center bg-forest px-5 py-12 text-white sm:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-white/20 px-6 py-10 sm:px-12 sm:py-14">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          We’ve received your enquiry
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#e9f6ed]">
          Thanks for getting in touch. I’ll reply to the email address you provided.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
