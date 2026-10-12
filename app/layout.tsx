import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SpotlightGlow } from "@/components/ui/SpotlightGlow";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bramverhoeff.nl"),
  title: "Bram Verhoeff | Full-Stack Software Developer & Architect — Agevo Development",
  description:
    "18-jarige Full-Stack Software Developer & Oprichter van Agevo Development (KVK 42160840). Maker van StudyElite en schaalbare SaaS-applicaties.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://bramverhoeff.nl/",
    siteName: "Bram Verhoeff",
    locale: "nl_NL",
    title: "Bram Verhoeff | Software Developer — Agevo Development",
    description:
      "18-jarige Full-Stack Software Developer & Oprichter van Agevo Development (KVK 42160840). Maker van StudyElite en schaalbare SaaS-applicaties.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bram Verhoeff — Full-Stack Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bram Verhoeff | Software Developer — Agevo Development",
    description:
      "18-jarige Full-Stack Software Developer & Oprichter van Agevo Development (KVK 42160840). Maker van StudyElite en schaalbare SaaS-applicaties.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bram Verhoeff",
              url: "https://bramverhoeff.nl/",
              image: "https://bramverhoeff.nl/og-image.jpg",
              jobTitle: "Full-Stack Software Developer & Ondernemer",
              worksFor: {
                "@type": "Organization",
                name: "Agevo Development",
                url: "https://agevodev.nl/",
              },
              description:
                "18-jarige Full-Stack Software Developer & Oprichter van Agevo Development (KVK 42160840). Maker van StudyElite.",
              email: "mailto:bramverhoeff@hotmail.com",
              nationality: "Nederlandse",
              knowsAbout: [
                "PHP",
                "JavaScript",
                "Node.js",
                "MySQL",
                "Go High Level",
                "SaaS development",
                "REST API's",
              ],
              sameAs: ["https://nl.linkedin.com/in/bram-verhoeff"],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-[#05080e] text-[#f8fafc] antialiased selection:bg-[#00b4ff] selection:text-black overflow-x-hidden">
        <SmoothScroll>
          <SpotlightGlow />
          <ParticleBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
