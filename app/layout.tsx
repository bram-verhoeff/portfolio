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
  title: "Bram Verhoeff | Full-Stack Software Architect & Founder — Agevo Development",
  description:
    "Full-Stack Software Developer & Oprichter van Agevo Development (KVK 42160840) in Den Haag. Bedenker van het AI-studieplatform StudyElite.nl en specialist in Next.js, Supabase & AI-automatisering.",
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
    title: "Bram Verhoeff | Full-Stack Architect & Founder — Agevo Development",
    description:
      "Oprichter van Agevo Development (KVK 42160840) & maker van StudyElite.nl. Specialist in schaalbare Next.js webapplicaties, SaaS en AI-automatisering.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bram Verhoeff — Full-Stack Software Developer & Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bram Verhoeff | Software Architect — Agevo Development",
    description:
      "Oprichter van Agevo Development (KVK 42160840) & maker van StudyElite.nl.",
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
              jobTitle: "Full-Stack Software Architect & Founder",
              worksFor: {
                "@type": "Organization",
                name: "Agevo Development",
                url: "https://agevodev.nl/",
              },
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "De Haagse Hogeschool",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "ROC Mondriaan",
                },
              ],
              description:
                "Full-Stack Software Developer & Oprichter van Agevo Development (KVK 42160840). Maker van StudyElite.nl.",
              email: "mailto:bramverhoeff@hotmail.com",
              nationality: "Nederlandse",
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Supabase",
                "PHP",
                "Symfony",
                "GoHighLevel",
                "SaaS Development",
                "OpenAI API",
              ],
              sameAs: [
                "https://nl.linkedin.com/in/bram-verhoeff",
                "https://github.com/bram-verhoeff",
                "https://agevodev.nl",
                "https://studyelite.nl",
              ],
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