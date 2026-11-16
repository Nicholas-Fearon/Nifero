import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Data protection | Nifero",
  description: "How to exercise your data protection rights or raise a concern with Nifero.",
};

export default function DataProtectionPage() {
  return (
    <PolicyPage title="Data protection">
      <p>
        The <Link href="/privacy">privacy notice</Link> explains what information Nifero
        holds and how it’s used. This page explains how to make a request or raise a concern.
      </p>
      <section>
        <h2>Your rights</h2>
        <p>Depending on the circumstances, you can ask Nifero to:</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>Give you a copy of the personal information it holds about you.</li>
          <li>Correct inaccurate or incomplete information.</li>
          <li>Delete your information or restrict how it’s used.</li>
          <li>Give you certain information in a format you can take to another service.</li>
        </ul>
      </section>
      <section>
        <h2>Your right to object</h2>
        <p>
          You can object to the use of your personal information where Nifero relies on
          legitimate interests. Tell me what you object to and why.
        </p>
      </section>
      <section>
        <h2>Make a request or raise a concern</h2>
        <p>
          Use the <Link href="/#contact">website contact form</Link>, choose
          “Something else” and explain what you’re asking for. If your enquiry refers
          to an earlier message, include the email address you used. I may need to
          confirm your identity before sharing personal information.
        </p>
      </section>
      <section>
        <h2>Complain to the regulator</h2>
        <p>
          You can also complain about the handling of your personal information to the
          UK Information Commissioner.
        </p>
        <p className="mt-2">
          <a href="https://ico.org.uk/make-a-complaint/">Make a data protection complaint</a>
        </p>
      </section>
    </PolicyPage>
  );
}
