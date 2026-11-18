import type { Metadata } from "next";
import NiferoSite from "@/components/NiferoSite";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nifero | Web Design & Development in Suffolk",
    description: "Independent web development in Suffolk. Business websites, website maintenance and custom web applications for clients across the UK.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nifero.co.uk/#organization",
    name: "Nifero",
    url: "https://nifero.co.uk",
    description: "Independent web development studio in Suffolk serving businesses across the UK.",
    founder: { "@type": "Person", name: "Nicholas Fearon" },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
      <NiferoSite />
    </>
  );
}
