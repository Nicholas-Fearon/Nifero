import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy notice | Nifero",
  description: "How Nifero handles personal information from website enquiries.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy notice">
      <p>
        I’m Nicholas Fearon, the independent web developer behind Nifero. I’m responsible
        for how Nifero uses your personal information. You can reach me through the{" "}
        <Link href="/#contact">website contact form</Link>.
      </p>
      <section>
        <h2>Information I collect</h2>
        <p>
          When you send an enquiry, I collect your name, email address, the service you
          choose, your message and the time it was sent. I need those details to understand
          your enquiry and reply. Only include information relevant to your request.
        </p>
      </section>
      <section>
        <h2>How I use your information</h2>
        <p>
          I use your information to answer your enquiry, discuss your project and prepare
          a quote if you ask for one. When you ask me to take steps towards a contract,
          those steps are the basis for using your information. For other enquiries and
          preventing abuse of the form, I rely on my legitimate interests in running
          and protecting Nifero.
        </p>
        <p className="mt-3">
          To limit repeated submissions, the site stores short-lived records based on
          hashed versions of your email address and, when available, your IP address.
        </p>
      </section>
      <section>
        <h2>Who handles your information</h2>
        <p>
          Vercel hosts the website and handles requests to it. Supabase stores submitted
          enquiries and provides sign-in for the private dashboard. If I reply by email,
          email providers also handle that correspondence. These providers may process
          information outside the UK. You can contact me for details about the safeguards
          that apply to your information.
        </p>
      </section>
      <section>
        <h2>How long I keep your information</h2>
        <p>
          I keep enquiry details while I respond and assess whether a project will go
          ahead. If it doesn’t, I keep them only while they’re needed for follow-up or
          another specific purpose, such as resolving a dispute. If work goes ahead,
          I retain the records needed to deliver the work and meet any applicable legal
          or accounting obligations.
        </p>
      </section>
      <section>
        <h2>Your choices and rights</h2>
        <p>
          Read the <Link href="/data-protection">data protection page</Link> to find out
          how to exercise your rights or make a complaint. The{" "}
          <Link href="/cookies">cookie policy</Link> explains how the site uses cookies.
        </p>
      </section>
    </PolicyPage>
  );
}
