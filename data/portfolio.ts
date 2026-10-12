export interface Project {
  id: string;
  number: string;
  badge: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  statChipIcon: string;
  statChipText: string;
  url: string;
  linkText: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

export interface SkillItem {
  icon: string;
  title: string;
  description: string;
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
    role: "Full-Stack Software Developer & Architect",
    age: 18,
    status: "Beschikbaar voor projecten / opdrachten",
    eyebrowMatrix: "BRAM VERHOEFF // FULL-STACK ARCHITECT // FOUNDER AGEVO DEV // STUDYELITE",
    heroHeadlinePart1: "Engineering High-Impact",
    heroHeadlineHighlight: "Software & SaaS Platforms.",
    typewriterPhrases: [
      "18-jarige Software Architect & Founder ⚡",
      "Full-Stack Web & SaaS Engineering ⚙️",
      "Go High Level & Custom API Automations 🌐",
      "Van Visionair Concept naar Schaalbaar Live Product 🚀"
    ],
    heroStorytellingLead:
      "Ik transformeer complexe ideeën naar robuuste, razendsnelle en winstgevende live platforms. Als 18-jarige full-stack developer en oprichter van Agevo Development (KVK 42160840) en het AI-platform StudyElite combineer ik state-of-the-art engineering met een ondernemersmentaliteit — van de allereerste byte tot productie op schaal.",
    company: "Agevo Development",
    kvk: "42160840",
    cvFile: "/CV Bram Verhoeff.pdf",
    location: "Nederland 🇳🇱",
    responseTime: "Binnen 24 uur"
  },

  socials: [
    {
      name: "LinkedIn",
      url: "https://nl.linkedin.com/in/bram-verhoeff",
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn profiel"
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      icon: "fa-brands fa-github",
      label: "GitHub profiel"
    },
    {
      name: "Email",
      url: "mailto:info@bramverhoeff.nl",
      icon: "fa-solid fa-envelope",
      label: "Stuur een email"
    },
    {
      name: "Website",
      url: "https://bramverhoeff.nl",
      icon: "fa-solid fa-globe",
      label: "Officiële website"
    }
  ] as SocialLink[],

  contactInfo: [
    {
      icon: "fa-solid fa-envelope",
      label: "Email",
      value: "bramverhoeff@hotmail.com",
      url: "mailto:bramverhoeff@hotmail.com"
    },
    {
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn",
      value: "linkedin.com/in/bram-verhoeff",
      url: "https://nl.linkedin.com/in/bram-verhoeff"
    },
    {
      icon: "fa-solid fa-map-pin",
      label: "Locatie",
      value: "Nederland 🇳🇱",
      url: undefined
    },
    {
      icon: "fa-solid fa-clock",
      label: "Reactietijd",
      value: "Binnen 24 uur",
      url: undefined
    }
  ],

  projects: [
    {
      id: "agevo",
      number: "01 / 02",
      badge: "Live Onderneming",
      emoji: "⚡",
      title: "Agevo Development",
      description:
        "Mijn eigen software development onderneming (KVK 42160840). Gespecialiseerd in het ontwikkelen van hoogwaardige webapplicaties, maatwerk platforms, API-koppelingen en geavanceerde Go High Level automations voor bedrijven.",
      tags: [
        "Software Development",
        "KVK 42160840",
        "Full-Stack",
        "Go High Level",
        "Web & SaaS"
      ],
      statChipIcon: "fa-solid fa-building",
      statChipText: "KVK 42160840",
      url: "https://agevodev.nl/",
      linkText: "Bezoek agevodev.nl"
    },
    {
      id: "studyelite",
      number: "02 / 02",
      badge: "Live SaaS",
      emoji: "🎓",
      title: "StudyElite",
      description:
        "AI-gestuurd studieplannerplatform voor studenten. Helpt gebruikers hun studieplanning te optimaliseren met gepersonaliseerde AI-begeleiding, taakanalyses en geavanceerde workflow tools om slimmer te studeren.",
      tags: ["AI", "SaaS", "Study Planner", "Smart Guidance"],
      statChipIcon: "fa-solid fa-robot",
      statChipText: "Smart AI Guidance",
      url: "https://studyelite.nl/",
      linkText: "Bezoek studyelite.nl"
    }
  ] as Project[],

  techMarquee: [
    { name: "HTML5", icon: "fa-brands fa-html5", color: "#e34f26" },
    { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#1572b6" },
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#c9a300" },
    { name: "PHP", icon: "fa-brands fa-php", color: "#777bb4" },
    { name: "Laravel", icon: "fa-brands fa-laravel", color: "#ff2d20" },
    { name: "Vue.js", icon: "fa-brands fa-vuejs", color: "#4fc08d" },
    { name: "React", icon: "fa-brands fa-react", color: "#0077b6" },
    { name: "Node.js", icon: "fa-brands fa-node-js", color: "#339933" },
    { name: "Python", icon: "fa-brands fa-python", color: "#3776ab" },
    { name: "Figma", icon: "fa-brands fa-figma", color: "#f24e1e" },
    { name: "Docker", icon: "fa-brands fa-docker", color: "#2496ed" },
    { name: "Git", icon: "fa-brands fa-git-alt", color: "#f05032" },
    { name: "MySQL", icon: "fa-solid fa-database", color: "#4479a1" },
    { name: "PostgreSQL", icon: "fa-solid fa-database", color: "#336791" },
    { name: "Go High Level", icon: "fa-solid fa-bolt", color: "#ff6b35" },
    { name: "OpenAI API", icon: "fa-solid fa-robot", color: "#10b981" },
    { name: "AWS", icon: "fa-brands fa-aws", color: "#ff9900" },
    { name: "Responsive Design", icon: "fa-solid fa-mobile-alt", color: "#007aff" },
    { name: "REST APIs", icon: "fa-solid fa-code-branch", color: "#0077b6" },
    { name: "Web Security", icon: "fa-solid fa-shield-alt", color: "#00a86b" }
  ],

  about: {
    label: "Over mij",
    title: "Passie voor\ncode & innovatie",
    bioParagraph1:
      "Ik ben Bram Verhoeff, een 18-jarige developer met een passie voor programmeren en technologie. Mijn reis in de wereld van software development begon met een nieuwsgierigheid naar hoe dingen werken en is uitgegroeid tot een echte passie. Ik ben altijd bezig met het leren van nieuwe technologieën en het ontwikkelen van mijn vaardigheden.",
    bioParagraph2:
      "Oprichter van softwarebedrijf Agevo Development (KVK 42160840) en het AI-studieplannerplatform StudyElite. Gedreven door innovatie, geavanceerde automations en het bouwen van tastbare, schaalbare applicaties voor ambitieuze bedrijven.",
    stats: [
      {
        icon: "fa-solid fa-rocket",
        value: "2",
        target: 2,
        label: "Live platforms"
      },
      {
        icon: "fa-solid fa-cake-candles",
        value: "18",
        target: 18,
        label: "Jaar oud"
      },
      {
        icon: "fa-solid fa-building",
        value: "42160840",
        label: "KVK — Agevo Development"
      },
      {
        icon: "fa-solid fa-bolt",
        value: "24u",
        label: "Reactietijd"
      }
    ] as StatItem[]
  },

  timeline: [
    {
      period: "2019 — 2023",
      title: "Segbroek College",
      description: "Ik zat op het Segbroek College van 2019 tot en met 2023."
    },
    {
      period: "2023 — 2026",
      title: "Software Developer opleiding (MBO)",
      description:
        "Student geweest aan de Software Developer opleiding op MBO niveau en daarvoor geslaagd."
    },
    {
      period: "2025 — 2026",
      title: "Stage bij IkWilPersoneel",
      description: "Ik heb in 2025 en 2026 stage gelopen bij IkWilPersoneel."
    },
    {
      period: "2026 — Heden",
      title: "HBO-ICT",
      description: "Ik ben momenteel student aan de HBO-ICT opleiding."
    }
  ] as TimelineItem[],

  skills: [
    {
      icon: "🌐",
      title: "Frontend Development",
      description:
        "HTML, CSS, JavaScript & Bootstrap voor moderne, responsieve webinterfaces."
    },
    {
      icon: "⚙️",
      title: "Backend Development",
      description:
        "PHP, Symfony, Node.js & REST API's voor krachtige server-side applicaties."
    },
    {
      icon: "🗂️",
      title: "Database Development",
      description:
        "MySQL voor database design, queries en datamanagement in webapplicaties."
    },
    {
      icon: "🖌️",
      title: "UI/UX Design",
      description:
        "Figma voor wireframing, prototyping en gebruiksvriendelijke interface designs."
    },
    {
      icon: "⚡",
      title: "Go High Level Automations",
      description:
        "Custom GHL automations, workflow bouwen, API integraties en geavanceerde funnel systemen."
    },
    {
      icon: "💼",
      title: "Ondernemerschap",
      description:
        "Product development, growth hacking, custom Go High Level automations en het leiden van een tech-startup."
    }
  ] as SkillItem[],

  contact: {
    label: "Contact",
    title: "Laten we samenwerken",
    description: "Heb je een project? Ik hoor graag van je!",
    projectTypes: [
      "Website / Webapplicatie",
      "AI-integratie",
      "Full-stack project",
      "Consultancy / Advies",
      "Anders"
    ]
  },

  footer: {
    brand: "Bram.",
    role: "Software Developer · Agevo Development (KVK 42160840)",
    copyright:
      "© 2026 Bram Verhoeff — Agevo Development (KVK: 42160840) — Gebouwd, niet gekopieerd."
  }
};
