export interface Project {
  id: string;
  number: string;
  badge: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  architecture: {
    layer: string;
    tech: string;
    detail: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
  statChipIcon: string;
  statChipText: string;
  url: string;
  linkText: string;
  span?: string;
  isFlagship?: boolean;
}

export interface TimelineItem {
  period: string;
  role: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface SkillItem {
  icon: string;
  title: string;
  badge: string;
  description: string;
  technologies: string[];
  productionProof: string;
}

export interface StatItem {
  icon: string;
  value: string | number;
  target?: number;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Bram Verhoeff",
    shortName: "Bram",
    role: "Full-Stack Software Developer & Founder",
    age: 19,
    status: "Beschikbaar voor selecte projecten via Agevo",
    eyebrowMatrix: "BRAM VERHOEFF // FULL-STACK ARCHITECT // FOUNDER AGEVO DEV // STUDYELITE",
    heroHeadlinePart1: "Engineering High-Impact",
    heroHeadlineHighlight: "Software & AI Platforms.",
    typewriterPhrases: [
      "Full-Stack Software Architect & Founder ⚡",
      "Next.js, TypeScript & Supabase Engineering ⚙️",
      "AI-Integraties & GoHighLevel Automations 🌐",
      "Van Concept naar Schaalbaar SaaS-Product 🚀",
    ],
    heroStorytellingLead:
      "Ik bouw geen standaard websites, maar schaalbare webapplicaties, AI-gedreven SaaS-producten en slimme bedrijfsautomatiseringen. Als oprichter van Agevo Development (KVK 42160840), bedenker van StudyElite en HBO-ICT student aan De Haagse Hogeschool combineer ik diepe technische architectuur met direct zakelijk resultaat.",
    company: "Agevo Development",
    kvk: "42160840",
    cvFile: "/CV Bram Verhoeff.pdf",
    location: "Den Haag, Nederland 🇳🇱",
    responseTime: "Binnen 24 uur",
  },

  socials: [
    {
      name: "LinkedIn",
      url: "https://nl.linkedin.com/in/bram-verhoeff",
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn profiel",
    },
    {
      name: "GitHub",
      url: "https://github.com/bram-verhoeff",
      icon: "fa-brands fa-github",
      label: "GitHub profiel",
    },
    {
      name: "Email",
      url: "mailto:bramverhoeff@hotmail.com",
      icon: "fa-solid fa-envelope",
      label: "Stuur een e-mail",
    },
    {
      name: "Website",
      url: "https://agevodev.nl",
      icon: "fa-solid fa-globe",
      label: "Agevo Development Studio",
    },
  ] as SocialLink[],

  contactInfo: [
    {
      icon: "fa-solid fa-envelope",
      label: "Direct E-mail",
      value: "bramverhoeff@hotmail.com",
      url: "mailto:bramverhoeff@hotmail.com",
    },
    {
      icon: "fa-solid fa-building",
      label: "Development Studio (B2B)",
      value: "agevodev.nl · KVK 42160840",
      url: "https://agevodev.nl",
    },
    {
      icon: "fa-solid fa-map-pin",
      label: "Standplaats",
      value: "Den Haag, Nederland 🇳🇱",
      url: undefined,
    },
    {
      icon: "fa-solid fa-clock",
      label: "Gemiddelde Reactietijd",
      value: "Binnen 24 uur op werkdagen",
      url: undefined,
    },
  ],

  projects: [
    {
      id: "studyelite",
      number: "01 / 02 · FLAGSHIP AI SAAS",
      badge: "Live AI SaaS",
      emoji: "🎓",
      title: "StudyElite",
      subtitle: "AI-Gestuurd Studieplatform & Neural Planner",
      description:
        "Volwaardig B2C SaaS-platform dat chaotische studiewijzers en syllabi automatisch omzet in hapklare dagtaken. Voorzien van een interactief dashboard, slimme agenda-synchronisatie en gepersonaliseerde AI-studiebegeleiding.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI API", "Freemium SaaS"],
      architecture: [
        {
          layer: "Frontend & UI",
          tech: "Next.js App Router + Tailwind",
          detail: "High-performance dark UI met realtime taak-updates en mobiele responsiviteit.",
        },
        {
          layer: "AI Engine",
          tech: "LLM Task Decomposition",
          detail: " Splitst complexe toetsstof en PDF-syllabi automatisch op in concrete micro-taken.",
        },
        {
          layer: "Backend & Auth",
          tech: "Supabase PostgreSQL + RLS",
          detail: "Beveiligde gebruikersdata, dynamische categorie-filters en abonnement-beheer.",
        },
      ],
      metrics: [
        { label: "AI Latency", value: "~140ms" },
        { label: "Uptime", value: "99.9%" },
        { label: "Model", value: "Freemium + Pro" },
      ],
      statChipIcon: "fa-solid fa-robot",
      statChipText: "Smart AI Guidance Engine",
      url: "https://studyelite.nl/",
      linkText: "Open studyelite.nl",
      span: "col-span-12 lg:col-span-6",
      isFlagship: true,
    },
    {
      id: "agevo",
      number: "02 / 02 · SOFTWARE STUDIO",
      badge: "KVK 42160840",
      emoji: "⚡",
      title: "Agevo Development",
      subtitle: "High-Impact Web, SaaS & AI Automation Agency",
      description:
        "Mijn officiële softwarestudio in Den Haag. Via Agevo help ik ambitieuze MKB-bedrijven en startups met maatwerk webapplicaties, schaalbare SaaS-producten en winstgevende AI- & workflow-automatiseringen.",
      tags: ["B2B Agency", "Maatwerk SaaS", "AI Automations", "Next.js", "Vercel Edge"],
      architecture: [
        {
          layer: "Propositie",
          tech: "End-to-End Product Delivery",
          detail: "Van Figma-prototype en database-design tot productie op Vercel.",
        },
        {
          layer: "Automatisering",
          tech: "Custom API's & Workflows",
          detail: "Koppelt CRM-systemen, AI-callbots en lead-funnels naadloos aan elkaar.",
        },
        {
          layer: "Performance",
          tech: "100/100 Core Web Vitals",
          detail: "Gebouwd voor maximale B2B-conversie, snelheid en technische SEO.",
        },
      ],
      metrics: [
        { label: "KVK Nummer", value: "42160840" },
        { label: "Regio", value: "Den Haag" },
        { label: "Focus", value: "SaaS & ROI" },
      ],
      statChipIcon: "fa-solid fa-building",
      statChipText: "Officiële Studio · KVK 42160840",
      url: "https://agevodev.nl/",
      linkText: "Bezoek agevodev.nl",
      span: "col-span-12 lg:col-span-6",
      isFlagship: false,
    },
  ] as Project[],

  techMarquee: [
    { name: "Next.js 15", icon: "fa-solid fa-bolt", color: "#ffffff" },
    { name: "React 19", icon: "fa-brands fa-react", color: "#38bdf8" },
    { name: "TypeScript", icon: "fa-solid fa-code", color: "#3178c6" },
    { name: "Tailwind CSS", icon: "fa-solid fa-wind", color: "#06b6d4" },
    { name: "Supabase", icon: "fa-solid fa-database", color: "#3ecf8e" },
    { name: "PHP & Symfony", icon: "fa-brands fa-php", color: "#777bb4" },
    { name: "Node.js", icon: "fa-brands fa-node-js", color: "#339933" },
    { name: "OpenAI API", icon: "fa-solid fa-robot", color: "#10b981" },
    { name: "GoHighLevel", icon: "fa-solid fa-bolt", color: "#ff6b35" },
    { name: "Java", icon: "fa-brands fa-java", color: "#f89820" },
    { name: "PostgreSQL & MySQL", icon: "fa-solid fa-database", color: "#4479a1" },
    { name: "Figma UI/UX", icon: "fa-brands fa-figma", color: "#f24e1e" },
    { name: "Vercel & DNS", icon: "fa-solid fa-server", color: "#00b4ff" },
    { name: "Git & GitHub", icon: "fa-brands fa-git-alt", color: "#f05032" },
    { name: "REST APIs & Webhooks", icon: "fa-solid fa-code-branch", color: "#818cf8" },
  ],

  about: {
    label: "Het Verhaal & De Reis",
    title: "Gebouwd op code,\ngedreven door resultaat.",
    bioParagraph1:
      "Ik ben Bram Verhoeff, Full-Stack Software Developer en ondernemer uit Den Haag. Wat begon met het uit elkaar halen en begrijpen van digitale systemen, groeide tijdens mijn afgeronde MBO 4 Software Development opleiding en mijn huidige HBO-ICT studie aan De Haagse Hogeschool uit tot het bouwen van complete productie-platformen.",
    bioParagraph2:
      "Met mijn eigen softwarestudio Agevo Development (KVK 42160840) en het AI-studieplatform StudyElite laat ik zien dat ik verder kijk dan alleen nette code: software moet schaalbaar zijn, processen versnellen en direct waarde opleveren voor de eindgebruiker.",
    stats: [
      {
        icon: "fa-solid fa-rocket",
        value: "4",
        target: 4,
        label: "Eigen Ventures & Platforms",
      },
      {
        icon: "fa-solid fa-clock",
        value: "1000+",
        target: 1000,
        label: "Uur praktijkervaring in AI & GHL",
      },
      {
        icon: "fa-solid fa-building",
        value: "42160840",
        label: "KVK — Agevo Development",
      },
      {
        icon: "fa-solid fa-bolt",
        value: "< 24u",
        label: "Persoonlijke reactietijd",
      },
    ] as StatItem[],
  },

  timeline: [
    {
      period: "2026 — Heden",
      role: "Founder & BSc Student",
      title: "HBO-ICT (De Haagse Hogeschool) & Oprichting Agevo",
      description:
        "Verbreding op universitair/HBO-niveau in software-architectuur, gecombineerd met de officiële KVK-registratie van mijn studio Agevo Development en de lancering van StudyElite.nl.",
      highlights: ["Agevo Development (KVK)", "StudyElite.nl Livegang", "HBO-ICT"],
    },
    {
      period: "2025 — 2026",
      role: "Software & Automation Intern (1.000 uur)",
      title: "Full-Stack, AI Call Bots & GoHighLevel Specialist",
      description:
        "Intensieve praktijkstage van 1.000 uur waarin ik verantwoordelijk was voor geavanceerde GoHighLevel-automatiseringen, het configureren van AI-callbots, API-koppelingen en het ontwerpen van converterende UI's in Figma.",
      highlights: ["GoHighLevel Workflows", "AI Voice & Chat Bots", "Figma UI Design"],
    },
    {
      period: "2023 — 2026",
      role: "Diploma Behaald (MBO Niveau 4)",
      title: "Software Developer — ROC Mondriaan",
      description:
        "Succesvol afgeronde opleiding Software Development in Den Haag. Sterke basis gelegd in Object-Oriented Programming (PHP, Symfony, Java), relationele databases (SQL) en moderne JavaScript/TypeScript frameworks.",
      highlights: ["MBO 4 Diploma", "Symfony & PHP", "Full-Stack Fundament"],
    },
    {
      period: "2019 — 2023",
      role: "Voortgezet Onderwijs",
      title: "Segbroek College — Den Haag",
      description:
        "Middelbare schooltijd in Den Haag waar de eerste stappen in webdevelopment, hardware-tweaking en ondernemerschap zijn gezet.",
      highlights: ["Den Haag", "Eerste Webprojecten"],
    },
  ] as TimelineItem[],

  skills: [
    {
      icon: "⚡",
      title: "Modern Frontend & UI Engineering",
      badge: "Core Stack",
      description:
        "Het bouwen van razendsnelle, interactieve interfaces met Server/Client component-discipline, vloeiende Framer Motion animaties en pixel-perfecte Tailwind styling.",
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
      productionProof: "Draait live op StudyElite.nl, Agevodev.nl & dit portfolio.",
    },
    {
      icon: "⚙️",
      title: "Backend Architectuur & API's",
      badge: "Server-Side",
      description:
        "Ontwerpen van robuuste server-side logica, beveiligde authenticatie-flows, RESTful endpoints en krachtige MVC-architecturen.",
      technologies: ["Node.js", "PHP 8", "Symfony", "Java", "REST APIs", "Webhooks"],
      productionProof: "Bewezen in maatwerk backends en gekoppelde SaaS-services.",
    },
    {
      icon: "🤖",
      title: "AI-Integraties & GHL Automations",
      badge: "Specialisme",
      description:
        "Slimme LLM-pijplijnen voor taak-analyse, geautomatiseerde GoHighLevel CRM-workflows, AI-callbots en conversie-funnels die handmatig werk elimineren.",
      technologies: ["OpenAI API", "GoHighLevel", "AI Call Bots", "Prompt Engineering", "Workflows"],
      productionProof: "1000+ uur praktijkervaring + kernmotor achter StudyElite.",
    },
    {
      icon: "🗄️",
      title: "Database Design & Cloud Ops",
      badge: "Data & Infra",
      description:
        "Gestructureerd databeheer, realtime synchronisatie, Row-Level Security (RLS) en zero-downtime deployments met custom DNS-configuraties.",
      technologies: ["Supabase", "PostgreSQL", "MySQL", "Vercel", "DirectAdmin", "Git"],
      productionProof: "Realtime agenda- & gebruikersopslag voor StudyElite.",
    },
    {
      icon: "🎨",
      title: "High-Conversion UI/UX Design",
      badge: "Product Design",
      description:
        "Vertalen van complexe gebruikersreizen naar intuïtieve dark-mode dashboards, Bento-grids en klikbare prototypes voordat de eerste regel code wordt geschreven.",
      technologies: ["Figma", "Design Systems", "Wireframing", "CRO", "Responsive UX"],
      productionProof: "Van leeg canvas naar de luxe blauw/goud UI van StudyElite.",
    },
    {
      icon: "🚀",
      title: "SaaS & Tech Ondernemerschap",
      badge: "Founder Mindset",
      description:
        "Ik denk niet als een uitvoerende programmeur, maar als een product-eigenaar: focus op snelle MVP-lanceringen, freemium-conversie, SEO en zakelijk rendement.",
      technologies: ["Product Strategy", "SaaS Pricing", "Technical SEO", "KVK Ondernemer"],
      productionProof: "Oprichter van Agevo Development (KVK 42160840).",
    },
  ] as SkillItem[],

  contact: {
    label: "Samenwerken",
    title: "Klaar om iets sterkers\nte bouwen?",
    description:
      "Of je nu een compleet SaaS-platform wilt laten ontwikkelen via Agevo, je bedrijfsprocessen wilt automatiseren met AI, of wilt sparren over een technische uitdaging — kies je route hieronder.",
    projectTypes: [
      "Maatwerk Webapplicatie / SaaS",
      "AI-Integratie & GoHighLevel Automation",
      "High-End Bedrijfswebsite (via Agevo)",
      "Stage / Werkgever / Recruitment",
      "Anders / Kennismaken",
    ],
  },

  footer: {
    brand: "Bram.",
    role: "Full-Stack Developer & Founder · Agevo Development (KVK 42160840)",
    copyright:
      "© 2026 Bram Verhoeff — Engineered by Agevo Development (KVK: 42160840) — Den Haag, NL.",
  },
};