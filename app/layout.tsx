import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nifero — Web Development & Digital Solutions",
  description:
    "Nifero is an independent web development studio building business websites, maintaining websites and developing practical digital solutions.",
  metadataBase: new URL("https://nifero.co.uk"),
  openGraph: {
    title: "Nifero — Web Development & Digital Solutions",
    description: "Better websites. Smarter business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body
        className={`${dmSans.variable} ${manrope.variable} font-sans`}
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {children}
      </body>
    </html>
  );
}
