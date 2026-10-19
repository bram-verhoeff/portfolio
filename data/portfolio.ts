export interface Project {
  id: string;
  index: string;
  kind: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  architecture: { layer: string; tech: string; detail: string }[];
  metrics: { label: string; value: string }[];
  url: string;
  linkText: string;
  tone: "ink" | "accent";
}

export interface TimelineItem {
  period: string;
  role: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface SkillItem {
  title: string;
  badge: string;
  description: string;
  technologies: string[];
  productionProof: string;
}

export interface StatItem {
  value: number | null;
  display: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Bram Verhoeff",
    firstName: "Bram",
    lastName: "Verhoeff",
    role: "Full-Stack Developer & Founder",
    status: "Beschikbaar voor selecte projecten",
    lead: "Ik bouw geen standaard websites, maar schaalbare webapplicaties, AI-gedreven SaaS-producten en slimme bedrijfsautomatiseringen.",
    rotatingWords: ["webapplicaties", "SaaS-producten", "AI-workflows", "automatiseringen"],
    company: "Agevo Development",
    kvk: "42160840",
    email: "bramverhoeff@hotmail.com",
    cvFile: "/CV Bram Verhoeff.pdf",
    location: "Den Haag, NL",
    responseTime: "Binnen 24 uur",
  },

  socials: [
    { name: "LinkedIn", url: "https://nl.linkedin.com/in/bram-verhoeff" },
    { name: "GitHub", url: "https://github.com/bram-verhoeff" },
    { name: "Agevo", url: "https://agevodev.nl" },
    { name: "StudyElite", url: "https://studyelite.nl" },
  ] as SocialLink[],

  projects: [
    {
      id: "studyelite",
      index: "01",
      kind: "Flagship AI SaaS",
      title: "StudyElite",
      subtitle: "AI-gestuurd studieplatform & neural planner",
      description:
        "Volwaardig B2C SaaS-platform dat chaotische studiewijzers en syllabi automatisch omzet in hapklare dagtaken. Met een interactief dashboard, slimme agenda-synchronisatie en gepersonaliseerde AI-studiebegeleiding.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI API", "Freemium SaaS"],
      architecture: [
        {
          layer: "Frontend & UI",
          tech: "Next.js App Router + Tailwind",
          detail: "High-performance UI met realtime taak-updates en mobiele responsiviteit.",
        },
        {
          layer: "AI Engine",
          tech: "LLM Task Decomposition",
          detail: "Splitst complexe toetsstof en PDF-syllabi automatisch op in concrete micro-taken.",
        },
        {
          layer: "Backend & Auth",
          tech: "Supabase PostgreSQL + RLS",
          detail: "Beveiligde gebruikersdata, dynamische filters en abonnementsbeheer.",
        },
      ],
      metrics: [
        { label: "AI latency", value: "~140ms" },
        { label: "Uptime", value: "99.9%" },
        { label: "Model", value: "Freemium + Pro" },
      ],
      url: "https://studyelite.nl/",
      linkText: "studyelite.nl",
      tone: "ink",
    },
    {
      id: "agevo",
      index: "02",
      kind: "Software Studio",
      title: "Agevo Development",
      subtitle: "Web, SaaS & AI-automation studio",
      description:
        "Mijn officiële softwarestudio in Den Haag. Via Agevo help ik ambitieuze MKB-bedrijven en startups met maatwerk webapplicaties, schaalbare SaaS-producten en winstgevende AI- en workflow-automatiseringen.",
      tags: ["B2B Studio", "Maatwerk SaaS", "AI Automations", "Next.js", "Vercel Edge"],
      architecture: [
        {
          layer: "Propositie",
          tech: "End-to-end product delivery",
          detail: "Van Figma-prototype en database-design tot productie op Vercel.",
        },
        {
          layer: "Automatisering",
          tech: "Custom API's & workflows",
          detail: "Koppelt CRM-systemen, AI-callbots en lead-funnels naadloos aan elkaar.",
        },
        {
          layer: "Performance",
          tech: "100/100 Core Web Vitals",
          detail: "Gebouwd voor maximale B2B-conversie, snelheid en technische SEO.",
        },
      ],
      metrics: [
        { label: "KVK", value: "42160840" },
        { label: "Regio", value: "Den Haag" },
        { label: "Focus", value: "SaaS & ROI" },
      ],
      url: "https://agevodev.nl/",
      linkText: "agevodev.nl",
      tone: "accent",
    },
  ] as Project[],

  techMarquee: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PHP & Symfony",
    "Node.js",
    "OpenAI API",
    "GoHighLevel",
    "Java",
    "PostgreSQL",
    "Figma",
    "Vercel",
    "REST & Webhooks",
  ],

  about: {
    title: "Gebouwd op code, gedreven door resultaat.",
    manifesto:
      "Wat begon met het uit elkaar halen van digitale systemen, groeide via MBO 4 Software Development en mijn HBO-ICT studie aan De Haagse Hogeschool uit tot het bouwen van complete productieplatformen. Met Agevo Development en StudyElite laat ik zien dat ik verder kijk dan nette code: software moet schalen, processen versnellen en direct waarde opleveren.",
    stats: [
      { value: 4, display: "4", label: "Eigen ventures & platforms" },
      { value: 1000, display: "1000+", suffix: "+", label: "Uur praktijk in AI & GHL" },
      { value: 24, display: "<24u", prefix: "<", suffix: "u", label: "Persoonlijke reactietijd" },
      { value: null, display: "42160840", label: "KVK Agevo Development" },
    ] as StatItem[],
  },

  timeline: [
    {
      period: "2026 — nu",
      role: "Founder & BSc student",
      title: "HBO-ICT & oprichting Agevo",
      description:
        "Verbreding op HBO-niveau in software-architectuur aan De Haagse Hogeschool, gecombineerd met de KVK-registratie van Agevo Development en de lancering van StudyElite.nl.",
      highlights: ["Agevo Development", "StudyElite live", "HBO-ICT"],
    },
    {
      period: "2025 — 2026",
      role: "Software & automation intern",
      title: "AI-callbots & GoHighLevel",
      description:
        "Praktijkstage van 1.000 uur: verantwoordelijk voor geavanceerde GoHighLevel-automatiseringen, AI-callbots, API-koppelingen en converterende UI's in Figma.",
      highlights: ["GHL workflows", "AI voice & chat", "Figma UI"],
    },
    {
      period: "2023 — 2026",
      role: "Diploma MBO niveau 4",
      title: "Software Developer — ROC Mondriaan",
      description:
        "Afgeronde opleiding Software Development in Den Haag. Sterke basis in OOP (PHP, Symfony, Java), relationele databases en moderne JavaScript/TypeScript frameworks.",
      highlights: ["MBO 4 diploma", "Symfony & PHP", "Full-stack fundament"],
    },
    {
      period: "2019 — 2023",
      role: "Voortgezet onderwijs",
      title: "Segbroek College — Den Haag",
      description:
        "De eerste stappen in webdevelopment, hardware-tweaking en ondernemerschap.",
      highlights: ["Den Haag", "Eerste webprojecten"],
    },
  ] as TimelineItem[],

  skills: [
    {
      title: "Frontend & UI engineering",
      badge: "Core stack",
      description:
        "Razendsnelle, interactieve interfaces met Server/Client-component discipline, vloeiende Framer Motion animaties en pixel-perfecte Tailwind styling.",
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
      productionProof: "Live op StudyElite.nl, agevodev.nl en dit portfolio.",
    },
    {
      title: "Backend architectuur & API's",
      badge: "Server-side",
      description:
        "Robuuste server-side logica, beveiligde authenticatie-flows, RESTful endpoints en krachtige MVC-architecturen.",
      technologies: ["Node.js", "PHP 8", "Symfony", "Java", "REST APIs", "Webhooks"],
      productionProof: "Bewezen in maatwerk backends en gekoppelde SaaS-services.",
    },
    {
      title: "AI-integraties & automations",
      badge: "Specialisme",
      description:
        "LLM-pijplijnen voor taakanalyse, geautomatiseerde GoHighLevel CRM-workflows, AI-callbots en conversie-funnels die handmatig werk elimineren.",
      technologies: ["OpenAI API", "GoHighLevel", "AI call bots", "Prompt engineering", "Workflows"],
      productionProof: "1000+ uur praktijkervaring en de kernmotor achter StudyElite.",
    },
    {
      title: "Database design & cloud ops",
      badge: "Data & infra",
      description:
        "Gestructureerd databeheer, realtime synchronisatie, Row-Level Security en zero-downtime deployments met custom DNS-configuraties.",
      technologies: ["Supabase", "PostgreSQL", "MySQL", "Vercel", "DirectAdmin", "Git"],
      productionProof: "Realtime agenda- en gebruikersopslag voor StudyElite.",
    },
    {
      title: "UI/UX & product design",
      badge: "Design",
      description:
        "Complexe gebruikersreizen vertalen naar intuïtieve dashboards en klikbare prototypes, voordat de eerste regel code wordt geschreven.",
      technologies: ["Figma", "Design systems", "Wireframing", "CRO", "Responsive UX"],
      productionProof: "Van leeg canvas naar de volledige UI van StudyElite.",
    },
    {
      title: "SaaS & ondernemerschap",
      badge: "Founder mindset",
      description:
        "Denken als product-eigenaar, niet als uitvoerder: snelle MVP-lanceringen, freemium-conversie, SEO en zakelijk rendement.",
      technologies: ["Product strategy", "SaaS pricing", "Technical SEO", "KVK ondernemer"],
      productionProof: "Oprichter van Agevo Development (KVK 42160840).",
    },
  ] as SkillItem[],

  contact: {
    title: "Laten we iets sterkers bouwen.",
    description:
      "Een compleet SaaS-platform via Agevo, processen automatiseren met AI, of sparren over een technische uitdaging — vertel me waar je aan denkt.",
    projectTypes: [
      "Webapplicatie / SaaS",
      "AI & automation",
      "Bedrijfswebsite",
      "Stage / recruitment",
      "Kennismaken",
    ],
    timelines: ["< 4 weken", "1 – 3 maanden", "Flexibel"],
  },
};
