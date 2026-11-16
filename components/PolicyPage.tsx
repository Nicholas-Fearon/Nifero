import Link from "next/link";
import type { ReactNode } from "react";

export default function PolicyPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <Link href="/" className="text-sm font-semibold text-celtic underline underline-offset-4">
        Back to Nifero
      </Link>
      <h1 className="mb-7 mt-5 font-display text-4xl font-extrabold sm:text-5xl">{title}</h1>
      <div className="space-y-8 leading-7 text-ink [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_a]:text-celtic [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </main>
  );
}
