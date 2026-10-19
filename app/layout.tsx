import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { Cursor } from "@/components/motion/Cursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  viewportFit: "cover",
};

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
    <html lang="nl" className={`${geist.variable} ${geistMono.variable}`}>
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
      <body className="bg-canvas font-sans text-fg antialiased">
        <SmoothScroll>
          <IntroProvider>
            {children}
            <Cursor />
          </IntroProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}