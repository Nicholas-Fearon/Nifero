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

const title = "Nifero | Web Design & Development in Suffolk";
const description =
  "Independent web development studio in Suffolk. Website design, maintenance and custom web applications for businesses across the UK.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://nifero.co.uk"),
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${dmSans.variable} ${manrope.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
