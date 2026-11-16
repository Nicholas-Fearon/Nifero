import type { Metadata } from "next";
import Link from "next/link";
import { signIn, signOut } from "./actions";
import { getAdminSession } from "./auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enquiries | Nifero",
  robots: { index: false, follow: false },
};

const pageSize = 25;
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/London",
});

const messages: Record<string, string> = {
  "sign-in-failed": "Couldn’t sign in. Check your email and password and try again.",
  "sign-out-failed": "Couldn’t sign out. Please try again.",
};

const button = "rounded-full bg-ink px-5 py-3 text-sm font-bold text-white";
const input = "rounded-xl border border-[#dce2d8] px-4 py-3 focus:outline-[#83a93b]";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page: pageParam, status } = await searchParams;
  const pageNumber = Number(pageParam);
  const page = Number.isInteger(pageNumber) && pageNumber >= 1 && pageNumber <= 1_000_000
    ? pageNumber
    : 1;
  const { configured, user, admin } = await getAdminSession();
  const start = (page - 1) * pageSize;
  const results = admin
    ? await admin.from("enquiries")
      .select("id, name, email, service, message, created_at")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(start, start + pageSize)
    : null;
  const entries = results?.data ?? [];
  const notice = status && Object.hasOwn(messages, status) ? messages[status] : null;

  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="bg-forest text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" aria-label="Nifero home" className="font-display text-3xl font-extrabold tracking-[-.095em]">
            Nifero<span className="text-lime">.</span>
          </Link>
          {user && (
            <form action={signOut}>
              <button className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold">
                Sign out
              </button>
            </form>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Enquiries</h1>
        {notice && (
          <p role="status" className="mb-5 rounded-xl border border-[#dce2d8] bg-white px-4 py-3 text-sm font-semibold">
            {notice}
          </p>
        )}
        {!configured && <p role="alert">Admin sign-in is currently unavailable.</p>}
        {configured && !user && (
          <form action={signIn} className="grid max-w-md gap-3 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-2 font-display text-xl font-extrabold">Admin sign-in</h2>
            <label htmlFor="admin-email" className="text-sm font-bold">Email address</label>
            <input id="admin-email" name="email" type="email" autoComplete="username" maxLength={254} required className={input} />
            <label htmlFor="admin-password" className="text-sm font-bold">Password</label>
            <input id="admin-password" name="password" type="password" autoComplete="current-password" maxLength={256} required className={input} />
            <button className={`mt-2 ${button}`}>Sign in</button>
          </form>
        )}
        {user && !admin && <p>This account doesn’t have access to enquiries.</p>}
        {results?.error && <p role="alert">Enquiries couldn’t be loaded. Refresh the page to try again.</p>}
        {results?.data && entries.length === 0 && (
          <p className="rounded-2xl border border-[#dce2d8] bg-white p-6">
            {page === 1 ? "No enquiries yet." : "There are no enquiries on this page."}
          </p>
        )}
        <div className="grid gap-4">
          {entries.slice(0, pageSize).map((enquiry) => (
            <details key={enquiry.id} className="rounded-2xl border border-[#dce2d8] bg-white">
              <summary className="cursor-pointer rounded-2xl p-5 focus-visible:outline-[#83a93b]">
                <span className="ml-2 font-bold break-words">{enquiry.name}</span>
                <span className="mt-1 block pl-6 text-sm text-muted">
                  {enquiry.service} · <time dateTime={enquiry.created_at}>{dateFormat.format(new Date(enquiry.created_at))}</time>
                </span>
              </summary>
              <div className="grid gap-4 border-t border-[#dce2d8] p-5">
                <a href={`mailto:${encodeURIComponent(enquiry.email)}`} className="w-fit break-all font-bold underline">
                  {enquiry.email}
                </a>
                <p className="whitespace-pre-wrap break-words">{enquiry.message}</p>
              </div>
            </details>
          ))}
        </div>
        {results?.data && (page > 1 || entries.length > pageSize) && (
          <nav aria-label="Enquiry pages" className="mt-6 flex items-center gap-5 text-sm font-bold">
            {page > 1 && <Link href={`/admin?page=${page - 1}`} className="underline">Previous</Link>}
            <span>Page {page}</span>
            {entries.length > pageSize && <Link href={`/admin?page=${page + 1}`} className="underline">Next</Link>}
          </nav>
        )}
      </main>
    </div>
  );
}
