import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  alternates: { canonical: "/cookies" },
  title: "Cookie policy | Nifero",
  description: "Cookie use on the Nifero website and private enquiry dashboard.",
};

export default function CookiesPage() {
  return (
    <PolicyPage title="Cookie policy">
      <p>
        Cookies are small files a website can store in your browser. Nifero’s public
        pages and enquiry form work without an account.
      </p>
      <section>
        <h2>Essential cookies</h2>
        <p>
          Supabase uses authentication cookies when an administrator signs in. They
          keep the administrator signed in and allow the private dashboard to check
          their session. Signing out clears the session cookies. Vercel may also use
          essential cookies when it needs to perform a security check.
        </p>
      </section>
      <section>
        <h2>Analytics and advertising</h2>
        <p>This website does not use analytics or advertising cookies.</p>
      </section>
      <section>
        <h2>Manage cookies</h2>
        <p>
          You can block or delete cookies in your browser settings. Blocking essential
          cookies may prevent admin sign-in. For more information on personal
          information, read the <Link href="/privacy">privacy notice</Link>.
        </p>
      </section>
    </PolicyPage>
  );
}
