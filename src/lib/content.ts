export const site = {
  name: "Mitchel Carson",
  title: "Software Engineer · Applied AI & Scientific Computing",
  headline: "Software Engineer · Applied AI & Scientific Computing",
  tagline: "From Air Force Two to applied AI.",
  summary:
    "Mitchel Carson is a software engineer and U.S. Air Force veteran focused on applied AI and scientific computing. As an Executive Missions Aviator in the 89th Airlift Wing (2020–2023) he flew on 50+ executive airlift missions across 30+ countries with zero safety-related incidents. He built Java and Spring Boot GraphQL APIs at USAA and is a UT Austin M.S. Artificial Intelligence student (4.0 GPA, expected May 2027) researching watershed forecasting with deep learning. He holds an active TS/SCI clearance and is based in Austin, Texas.",
  metaDescription:
    "Software engineer and Air Force veteran (89th Airlift Wing, 50+ executive missions, active TS/SCI). UT Austin M.S. AI student building applied AI for watershed forecasting.",
  schemaJobTitle: "M.S. Artificial Intelligence student, The University of Texas at Austin",
  focusLine: "Air Force veteran · Applied AI · Scientific computing",
  runningHead: "Mitchel Carson · Portfolio",
  updated: "September 2026",
  updatedYear: "2026",
  resumePdfUpdated: "September 2026",
  resumeFilename: "mitchelcarson_resume.pdf",
  resumeUrl: "/mitchelcarson_resume.pdf",
  email: "mitchel.carson@gmail.com",
  github: "https://github.com/Mitchel34",
  sourceUrl: "https://github.com/Mitchel34/Portfolio",
  linkedin: "https://www.linkedin.com/in/mitchelcarson",
  url: "https://mitchelcarson.com",
  calendlyUrl: "https://calendly.com/mitchel-carson/30min",
  location: "Austin, Texas",
  timezone: "Central Time",
  clearance: "Active TS/SCI",
};

// ---------------------------------------------------------------------------
// Evidence status system. Every research output, project, and course carries a
// status word next to a glyph; the tone decides the glyph (filled / half / hollow).
// ---------------------------------------------------------------------------

export type EvidenceStatus =
  | "accepted"
  | "completed"
  | "production"
  | "delivered"
  | "under-review"
  | "preliminary"
  | "submitted"
  | "in-progress"
  | "planned"
  | "active-development";

export type EvidenceTone = "confirmed" | "provisional" | "pending";

export const evidenceTone: Record<EvidenceStatus, EvidenceTone> = {
  accepted: "confirmed",
  completed: "confirmed",
  production: "confirmed",
  delivered: "confirmed",
  "under-review": "provisional",
  preliminary: "provisional",
  submitted: "provisional",
  "in-progress": "pending",
  planned: "pending",
  "active-development": "pending",
};

export const evidenceWord: Record<EvidenceStatus, string> = {
  accepted: "Accepted",
  completed: "Completed",
  production: "Production",
  delivered: "Delivered",
  "under-review": "Under review",
  preliminary: "Preliminary",
  submitted: "Submitted",
  "in-progress": "In progress",
  planned: "Planned",
  "active-development": "Active development",
};

// ---------------------------------------------------------------------------
// Navigation. Insertion order is the home-page order; numbers are rendered.
// ---------------------------------------------------------------------------

export type LandingSection = {
  id: string;
  number: string;
  label: string;
  navLabel: string;
  href: string;
  description: string;
  inHeader: boolean;
};

export const landingSections = {
  service: {
    id: "service",
    number: "01",
    label: "Service",
    navLabel: "Service",
    href: "/#service",
    description: "U.S. Air Force: 89th Airlift Wing, 50+ executive missions",
    inHeader: true,
  },
  path: {
    id: "path",
    number: "02",
    label: "Path",
    navLabel: "Path",
    href: "/#path",
    description: "Air Force, computer science, USAA, UT Austin",
    inHeader: true,
  },
  work: {
    id: "work",
    number: "03",
    label: "Work",
    navLabel: "Work",
    href: "/#work",
    description: "HYDRA research, USAA APIs, Harmony, client work",
    inHeader: true,
  },
  research: {
    id: "research",
    number: "04",
    label: "Research & Talks",
    navLabel: "Research",
    href: "/#research",
    description: "AGU26 workshop, abstract, and honors thesis",
    inHeader: true,
  },
  skills: {
    id: "skills",
    number: "05",
    label: "Skills",
    navLabel: "Skills",
    href: "/#skills",
    description: "Machine learning, software, cloud, operations",
    inHeader: true,
  },
  contact: {
    id: "contact",
    number: "06",
    label: "Contact",
    navLabel: "Contact",
    href: "/#contact",
    description: "Email, scheduling, and profiles",
    inHeader: true,
  },
} as const satisfies Record<string, LandingSection>;

export const landingSectionList: LandingSection[] = Object.values(landingSections);
export const landingNavItems: LandingSection[] = landingSectionList.filter((section) => section.inHeader);

export type SitePage = { label: string; href: string; description: string };

export const sitePages: SitePage[] = [
  { label: "About", href: "/about", description: "Story, service, and what I care about" },
  { label: "Projects", href: "/projects", description: "Case studies and open source" },
  { label: "Research", href: "/research", description: "HYDRA in full" },
  { label: "Coursework", href: "/coursework", description: "UT Austin M.S. AI courses" },
  { label: "Résumé", href: "/resume", description: "PDF, experience, education" },
  { label: "Contact", href: "/contact", description: "Form and scheduling" },
];

// ---------------------------------------------------------------------------
// Home page. The story runs top to bottom: hook, service, path, work, research,
// skills, contact. Components read these; they never inline copy.
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: ["U.S. Air Force veteran", "Active TS/SCI", "Austin, Texas"],
  statement:
    "I chose to pursue AI while flying executive missions for the U.S. Air Force. Now I build applied AI that makes complex data useful to the people relying on it.",
  summary:
    "UT Austin M.S. Artificial Intelligence student (4.0 GPA). I built production Java and Spring Boot APIs at USAA, and I research watershed forecasting with deep learning, work motivated by living through Hurricane Helene in Boone.",
  portraitCaption: "Joint Base Andrews → UT Austin",
};

export type HeroStat = { value: string; label: string; detail: string };

export const heroStats: HeroStat[] = [
  { value: "50+", label: "Executive airlift missions", detail: "Across 30+ countries · 2020–2023" },
  { value: "Zero", label: "Safety-related incidents", detail: "Every mission, 89th Airlift Wing" },
  { value: "30%", label: "Less troubleshooting time", detail: "USAA · Summer 2025" },
  { value: "4.0", label: "GPA", detail: "UT Austin M.S. AI · May 2027" },
];

export type SectionCopy = { title: string; lede: string };

export const sectionCopy = {
  path: {
    title: "The path so far.",
    lede:
      "Four chapters with one through-line: work other people depend on, done with careful preparation and a standard that does not move.",
  },
  work: {
    title: "Selected work.",
    lede:
      "Research I lead, production software I shipped, and systems I am building. Each project links to a case study with the problem, the approach, and what is still open.",
  },
  research: {
    title: "Research and speaking.",
    lede:
      "Where the work is being presented. Each item carries its current status and is updated as milestones land.",
  },
  skills: {
    title: "What I bring to a team.",
    lede: "Technical depth from research and industry, and operational habits from the Air Force.",
  },
  contact: {
    title: "Let’s talk.",
    lede:
      "I’m open to software engineering and applied AI roles, including scientific computing and mission-driven teams where an active clearance matters. I’m also glad to talk forecasting, evaluation, or the move from military service into AI.",
  },
} satisfies Record<string, SectionCopy>;

// ---------------------------------------------------------------------------
// Service. Facts come only from Mitchel's own résumés; nothing here is inferred.
// ---------------------------------------------------------------------------

export type ServiceItem = { title: string; body: string };

export const service = {
  kicker: "U.S. Air Force · 89th Airlift Wing · 2020–2023",
  title: "Before I wrote code, I flew executive missions aboard Air Force Two.",
  intro: [
    "From 2020 to 2023 I was an Executive Missions Aviator in the 89th Airlift Wing at Joint Base Andrews, the wing whose executive airlift mission supports the Vice President, the First Lady, the Secretaries of State and Defense, and the Chairman of the Joint Chiefs of Staff.",
    "It was while serving that I chose to pursue AI. The job taught me what it means for people to rely on your work, and that is the standard I build to.",
  ],
  record: [
    { term: "Role", value: "Executive Missions Aviator" },
    { term: "Unit", value: "89th Airlift Wing" },
    { term: "Station", value: "Joint Base Andrews, Maryland" },
    { term: "Service", value: "August 2020 – April 2023" },
    { term: "Clearance", value: "Active TS/SCI" },
  ],
  duties: [
    {
      title: "Onboard with senior leaders",
      body: "Worked directly onboard with distinguished visitors, including the Vice President and the Secretary of State.",
    },
    {
      title: "Safety and logistics",
      body: "Managed passenger safety and logistics with flight crews, security teams, and White House staff.",
    },
    {
      title: "A zero-incident record",
      body: "More than 50 executive airlift missions across more than 30 countries, all completed with zero safety-related incidents.",
    },
  ] satisfies ServiceItem[],
  lessonsTitle: "What I carried into engineering",
  lessons: [
    {
      title: "Preparation is the job.",
      body: "A mission was planned long before anyone boarded. I build research the same way: data manifests, configuration, and leakage checks settled before a model trains.",
    },
    {
      title: "Communicate up, down, and across.",
      body: "I worked alongside flight crews, security teams, and White House staff. Now it is product owners, engineers, and scientists, and the habit is the same: say what is known, what is not, and what happens next.",
    },
    {
      title: "The standard does not move.",
      body: "More than 50 missions, zero safety-related incidents. I hold my own work to that bar: evaluation that matches how forecasts are really used, and no result published before the analysis supports it.",
    },
  ] satisfies ServiceItem[],
  clearanceNote:
    "I hold an active TS/SCI clearance and welcome conversations with defense, intelligence, and other mission-driven AI teams.",
};

// ---------------------------------------------------------------------------
// Path: the chronological story, one chapter per stage.
// ---------------------------------------------------------------------------

export type StoryChapter = {
  marker: string;
  kicker: string;
  period: string;
  title: string;
  role: string;
  body: string;
  link?: { label: string; href: string };
  upcoming?: boolean;
};

export const story: StoryChapter[] = [
  {
    marker: "I",
    kicker: "Service",
    period: "2020 – 2023",
    title: "U.S. Air Force",
    role: "Executive Missions Aviator · 89th Airlift Wing · Joint Base Andrews, MD",
    body: "50+ executive airlift missions across 30+ countries with zero safety-related incidents, working onboard with the Vice President and the Secretary of State. This is where I chose to pursue AI.",
    link: { label: "Service record", href: "/#service" },
  },
  {
    marker: "II",
    kicker: "Foundation",
    period: "Graduated December 2025",
    title: "Appalachian State University",
    role: "B.S. Computer Science · Cum laude · Boone, NC",
    body: "A Data Science Certificate and a senior honors thesis on runoff forecasting with deep learning. Experiencing Hurricane Helene in Boone is what motivated HYDRA, my research on watershed dynamics and forecast reliability.",
    link: { label: "Thesis-era code", href: "https://github.com/Mitchel34/Runoff_Forcasting" },
  },
  {
    marker: "III",
    kicker: "Industry",
    period: "Summer 2025",
    title: "USAA",
    role: "Software Engineering Intern · Global Headquarters, San Antonio, TX",
    body: "Java and Spring Boot GraphQL APIs for customer-data workflows used across enterprise channels. API enhancements and JavaScript comparison views cut troubleshooting time by 30%.",
    link: { label: "Case study", href: "/projects/usaa-risk-services" },
  },
  {
    marker: "IV",
    kicker: "Research",
    period: "2026 – May 2027",
    title: "The University of Texas at Austin",
    role: "M.S. Artificial Intelligence · 4.0 GPA · Austin, TX",
    body: "Machine learning, deep learning, reinforcement learning, and AI ethics completed, with HYDRA continuing as ongoing research.",
    link: { label: "Coursework", href: "/coursework" },
  },
  {
    marker: "Next",
    kicker: "Upcoming",
    period: "December 2026",
    title: "AGU26 Annual Meeting",
    role: "Scientific workshop facilitator · San Francisco, CA",
    body: "Leading an accepted workshop on best practices for AI and agentic workflows in earth science research.",
    link: { label: "Research and speaking", href: "/#research" },
    upcoming: true,
  },
];

// ---------------------------------------------------------------------------
// Work. The featured project is HYDRA; the rest are cards.
// ---------------------------------------------------------------------------

export const featuredWork = {
  slug: "hydra-temporal",
  kicker: "Featured research",
  title: "HYDRA",
  subtitle: "Watershed forecasting research with deep learning",
  plain:
    "Experiencing Hurricane Helene in Boone is why I study watershed dynamics and forecast reliability. HYDRA asks whether a deep-learning model can make NOAA’s NextGen streamflow forecasts more reliable 1 to 18 hours ahead, using only information that would really be available when the forecast is issued.",
  pipeline: [
    {
      step: "Generate",
      title: "Reforecasts and data",
      body: "NextGen reforecast generation software and Google Cloud workflows acquire, validate, and align weather, streamflow, and forecast data with traceable provenance.",
    },
    {
      step: "Correct",
      title: "A learned post-processor",
      body: "Designing post-processing for 1–18 hour lead times, comparing LSTM, Transformer, and Mamba-style models on identical inputs and splits.",
    },
    {
      step: "Evaluate",
      title: "By site and lead time",
      body: "Leakage-aware temporal splits and hydrologic metrics (RMSE, NSE, KGE), reported by site and lead time.",
    },
  ],
  status: "in-progress" as EvidenceStatus,
  statusNote: "Ongoing research · results pending",
  links: [
    { label: "Research details", href: "/research" },
    { label: "Case study", href: "/projects/hydra-temporal" },
    { label: "Code on GitHub", href: "https://github.com/Mitchel34/NextGen_Hydra" },
  ],
};

export type WorkCard = {
  title: string;
  kicker: string;
  subtitle: string;
  /** Optional headline number, shown large on the card. */
  metric?: { value: string; label: string };
  body: string;
  tags: string[];
  status: EvidenceStatus;
  href: string;
  linkLabel: string;
};

export const otherWork: WorkCard[] = [
  {
    title: "USAA",
    kicker: "Industry",
    subtitle: "Enterprise GraphQL APIs",
    metric: { value: "30%", label: "less troubleshooting time" },
    body: "Built Java and Spring Boot GraphQL APIs for customer-data workflows used across enterprise channels, plus API enhancements and JavaScript comparison views that integrate name and employment data from multiple sources.",
    tags: ["Java", "Spring Boot", "GraphQL", "JavaScript"],
    status: "production",
    href: "/projects/usaa-risk-services",
    linkLabel: "Case study",
  },
  {
    title: "Harmony",
    kicker: "Systems",
    subtitle: "Automated decision system with bounded LLM autonomy",
    body: "A financial decision pipeline built as an explicit state graph with declared action paths and tamper-evident logging. LLMs sit in advisory nodes that can flag or veto but cannot execute, and every consequential action requires human approval.",
    tags: ["Python", "scikit-learn", "SQLite", "React", "AWS"],
    status: "active-development",
    href: "/projects/harmony",
    linkLabel: "Case study",
  },
  {
    title: "GreenSpace Lawn Care",
    kicker: "Client work",
    subtitle: "Small-business website and digital strategy",
    body: "Built and launched the company’s website and advise on its social media strategy, translating business needs into a clear digital experience.",
    tags: ["Web", "Client discovery", "Strategy"],
    status: "delivered",
    href: "https://www.greenspacelawncare.us/",
    linkLabel: "Visit site",
  },
];

// ---------------------------------------------------------------------------
// Skills, each group grounded in where it was used.
// ---------------------------------------------------------------------------

export type ToolkitGroup = {
  label: string;
  items: string[];
  /** Where the group was used; omitted when it would only restate the résumé. */
  usedIn?: string;
  /** Rendered in the navy "service" treatment on the home page. */
  service?: boolean;
};

export const toolkit: ToolkitGroup[] = [
  {
    label: "Machine learning and data",
    items: [
      "PyTorch · MLX · scikit-learn",
      "LSTM, Transformer, and Mamba-style models",
      "Leakage-aware temporal evaluation",
      "RMSE · NSE · KGE",
      "pandas · NumPy · xarray · PyArrow",
      "PostgreSQL · SQLite",
    ],
    usedIn: "HYDRA, Harmony, UT Austin coursework",
  },
  {
    label: "Backend and web",
    items: ["Java · Spring Boot", "GraphQL", "FastAPI", "React · Next.js", "Node.js", "HTML/CSS · Tailwind CSS"],
    usedIn: "USAA, Harmony, client work, this site",
  },
  {
    label: "Cloud and tools",
    items: ["Google Cloud: BigQuery, Cloud Storage", "AWS research compute (CPU/GPU)", "Docker", "Git · pytest · Jira"],
    usedIn: "HYDRA, Harmony, USAA",
  },
  {
    label: "Languages",
    items: ["Java", "Python", "JavaScript / TypeScript", "SQL", "C · C++ · Assembly", "Swift · R"],
  },
  {
    label: "Operations and leadership",
    service: true,
    items: [
      "Safety-critical operations",
      "Logistics across 30+ countries",
      "Coordination with White House staff and security teams",
      "Technical communication",
      "Active TS/SCI clearance",
    ],
    usedIn: "U.S. Air Force (89th Airlift Wing), USAA, AGU26 workshop",
  },
];

export const focusAreas = [
  "Watershed forecasting and forecast reliability",
  "Sequence models: LSTM, Transformer, Mamba",
  "Leakage-aware evaluation by lead time",
  "Bounded LLM autonomy in decision systems",
  "Cloud research compute: Google Cloud, AWS",
  "Production software and APIs",
];

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCaseStudy = {
  architecture: string[];
  reliability: string[];
  delivery: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  status: "Active" | "Production" | "Active Development";
  problem: string;
  impact: string;
  approach: string[];
  stack: string[];
  results: string[];
  learnings: string[];
  caseStudy: ProjectCaseStudy;
  links?: ProjectLink[];
};

export function projectEvidenceStatus(status: Project["status"]): EvidenceStatus {
  switch (status) {
    case "Production":
      return "production";
    case "Active Development":
      return "active-development";
    case "Active":
    default:
      return "in-progress";
  }
}

export const about = {
  summary: [
    "I came to AI through operations first. From 2020 to 2023 I was an Executive Missions Aviator in the U.S. Air Force’s 89th Airlift Wing, flying on more than 50 executive airlift missions across more than 30 countries. Every one was completed with zero safety-related incidents.",
    "I worked directly onboard with distinguished visitors, including the Vice President and the Secretary of State, managing passenger safety and logistics with flight crews, security teams, and White House staff. It was while serving that I chose to pursue AI. I still hold an active TS/SCI clearance.",
    "I studied computer science at Appalachian State, graduating cum laude with a senior honors thesis on runoff forecasting with deep learning. Experiencing Hurricane Helene in Boone is what motivated HYDRA, my research on watershed dynamics and forecast reliability. At USAA I built Java and Spring Boot GraphQL APIs and cut troubleshooting time by 30%, and I also build and advise on software for a small business.",
    "Today I am completing an M.S. in Artificial Intelligence at UT Austin (4.0 GPA), with HYDRA as ongoing research. I focus on applied AI that makes complex data useful to the people relying on it.",
  ],
  values: [
    {
      title: "Evaluation under forecast-time constraints",
      description:
        "I design models and pipelines teammates can trust, with clear metrics, careful evaluation, and predictable behavior when inputs change.",
    },
    {
      title: "Reproducible by default",
      description: "Configs, seeds, data manifests, and tracked runs ship with the result, not after it.",
    },
    {
      title: "Limits made visible",
      description: "Good systems make uncertainty, limits, and failure modes visible.",
    },
  ],
};

export type ProofItem = {
  title: string;
  role: string;
  description: string;
  askAbout: string;
  href: string;
  linkLabel: string;
  showOnHome: boolean;
  showOnAbout: boolean;
};

export const proofItems: ProofItem[] = [
  {
    title: "United States Air Force",
    role: "Executive Missions Aviator · 89th Airlift Wing · 2020–2023",
    description:
      "I flew on 50+ executive airlift missions across 30+ countries, all completed with zero safety-related incidents, working directly onboard with distinguished visitors including the Vice President and the Secretary of State.",
    askAbout: "Operating to a zero-incident standard, executive airlift, and moving from military service into AI.",
    href: "/#service",
    linkLabel: "Service record",
    showOnHome: true,
    showOnAbout: true,
  },
  {
    title: "USAA",
    role: "Software Engineering Intern · Global Headquarters · 2025",
    description:
      "At USAA’s global headquarters in San Antonio, I built Java and Spring Boot GraphQL APIs for customer-data workflows and cut troubleshooting time by 30% with API enhancements and JavaScript comparison views.",
    askAbout: "GraphQL API design, customer-data flows, and enterprise delivery.",
    href: "/projects/usaa-risk-services",
    linkLabel: "View project",
    showOnHome: true,
    showOnAbout: true,
  },
  {
    title: "HYDRA",
    role: "Watershed forecasting research · Ongoing",
    description:
      "Motivated by experiencing Hurricane Helene in Boone, I build NextGen reforecast generation software and Google Cloud data workflows, and design deep-learning post-processing for 1–18 hour streamflow forecasts under leakage-aware evaluation.",
    askAbout: "Temporal leakage, forecast evaluation by lead time, and defensible research claims.",
    href: "/research",
    linkLabel: "View research",
    showOnHome: false,
    showOnAbout: false,
  },
  {
    title: "GreenSpace Lawn Care",
    role: "Software Consultant",
    description:
      "I built and launched GreenSpaceLawnCare.us and advise the company on social media strategy, translating business needs into a clear digital experience.",
    askAbout: "Client discovery, website delivery, and translating business goals into software.",
    href: "https://www.greenspacelawncare.us/",
    linkLabel: "Visit website",
    showOnHome: false,
    showOnAbout: true,
  },
  {
    title: "Harmony",
    role: "Automated decision system with bounded LLM autonomy · Active development",
    description:
      "I am building a financial decision pipeline as an explicit state graph with declared action paths and tamper-evident logging. LLMs are confined to advisory nodes that can flag or veto but cannot execute, and each consequential action requires human approval.",
    askAbout: "Bounding LLM autonomy, explicit state graphs, and auditable decision logs.",
    href: "/projects/harmony",
    linkLabel: "View project",
    showOnHome: false,
    showOnAbout: false,
  },
];

export const projects: Project[] = [
  {
    slug: "hydra-temporal",
    title: "HYDRA",
    subtitle: "Watershed forecasting research: reforecast generation and deep-learning post-processing for NOAA NextGen streamflow forecasts",
    status: "Active",
    problem:
      "Experiencing Hurricane Helene in Boone is what motivated HYDRA. Short-lead streamflow forecasts from NOAA’s NextGen framework carry errors that a learned post-processor may be able to reduce, and HYDRA asks whether a model trained on reforecasts generated with the same framework can improve forecasts at 1–18 hour lead times without leaking future information.",
    impact:
      "The work has two parts: NextGen reforecast generation software with Google Cloud workflows that prepare the data, and a post-processing model evaluated by site and lead time. The research is ongoing and results are pending.",
    approach: [
      "Built NextGen reforecast generation software and Google Cloud workflows to acquire, validate, and align weather, streamflow, and forecast data with traceable provenance.",
      "Designing forecast post-processing for 1–18 hour lead times, comparing LSTM, Transformer, and Mamba-style models on identical inputs and splits.",
      "Evaluating with leakage-aware temporal splits and hydrologic metrics (RMSE, NSE, KGE), reporting performance by site and lead time.",
      "Preserving initialization, lead, valid-time, version, and source metadata so every training example traces back to the forecast that produced it.",
    ],
    stack: [
      "PyTorch",
      "LSTM",
      "Transformer",
      "Mamba (state-space)",
      "NextGen",
      "Google Cloud",
      "xarray",
    ],
    results: [
      "Reforecast generation software and Google Cloud data workflows are in place; the NextGen_Hydra repository is public.",
      "Model comparison and lead-time evaluation are in progress; results will be posted when the analysis is complete.",
    ],
    learnings: [
      "Post-processing depends as much on how reforecasts are generated and aligned as on model architecture.",
      "Reproducible data and configuration lineage make changing scientific results auditable.",
      "Research claims should evolve with the evidence rather than outrun the analysis.",
    ],
    caseStudy: {
      architecture: [
        "Reforecast generation software drives NOAA’s NextGen framework to produce retrospective forecasts with consistent metadata.",
        "A post-processing model consumes reforecasts and observations to produce improved forecasts at 1–18 hour lead times.",
        "Config-driven training and evaluation with strict train/validation/test time boundaries.",
      ],
      reliability: [
        "Leakage-aware splitting by time and lead time to match operational inference constraints.",
        "Reproducible runs through fixed seeds, immutable data artifacts, and tracked configuration snapshots.",
        "Performance tracked by site, lead time, and hydrologic metric instead of a single aggregate score.",
      ],
      delivery: [
        "Packaged data acquisition and reforecast generation as reusable software; the data tooling is public.",
        "Produced versioned artifacts, diagnostics, and technical documentation for scientific review.",
        "Maintained a research website while reserving claims for the completed analysis.",
      ],
    },
    links: [
      { label: "Research Details", href: "/research" },
      { label: "GitHub repository", href: "https://github.com/Mitchel34/NextGen_Hydra" },
    ],
  },
  {
    slug: "usaa-risk-services",
    title: "USAA Software Engineering",
    subtitle: "Enterprise APIs and Troubleshooting Software",
    status: "Production",
    problem:
      "Internal teams needed customer data presented through dependable services and clear troubleshooting views.",
    impact:
      "During my internship at USAA’s global headquarters in San Antonio, I built Java and Spring Boot GraphQL APIs for customer-data workflows and reduced troubleshooting time by 30% through API enhancements and JavaScript comparison views.",
    approach: [
      "Built Java and Spring Boot GraphQL APIs for customer-data workflows used across enterprise channels.",
      "Integrated name and employment data from multiple sources into an internal troubleshooting tool.",
      "Built JavaScript comparison views and delivered work through an Agile team workflow.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "GraphQL",
      "React",
      "TypeScript",
      "PostgreSQL",
    ],
    results: [
      "Reduced troubleshooting time by 30% through API enhancements and JavaScript comparison views.",
      "Contributed customer-data API capabilities for enterprise workflows.",
    ],
    learnings: [
      "Clear API contracts help teams make changes safely.",
      "Reliable production software depends on close collaboration between engineers, product owners, and end users.",
    ],
    caseStudy: {
      architecture: [
        "Contract-first GraphQL API layer over core risk services using Java and Spring Boot.",
        "Typed front-end integrations for operational dashboards and internal support tooling.",
        "Data-access partitioning to separate source-of-record from troubleshooting data paths.",
      ],
      reliability: [
        "Used typed GraphQL contracts and team review workflows to keep service changes predictable.",
        "Worked within security- and compliance-conscious production engineering practices.",
        "Validated data presentation with the internal users who depended on the troubleshooting workflow.",
      ],
      delivery: [
        "Shipped incrementally with Agile team workflows and shared Jira/Git ownership.",
        "Coordinated API and front-end changes across product, backend, and business stakeholders.",
        "Participated in sprint planning, stand-ups, code collaboration, and retrospectives using Jira and Git.",
      ],
    },
    links: [{ label: "Experience", href: "/resume" }],
  },
  {
    slug: "harmony",
    title: "Harmony",
    subtitle: "An automated decision system with bounded LLM autonomy",
    status: "Active Development",
    problem:
      "LLMs are useful for research and analysis, but an automated decision system should not let them act on their own. Harmony is a financial decision pipeline designed so that every step is declared and logged, and every consequential action waits for a human.",
    impact:
      "Harmony is an active Python project built as an explicit state graph with declared action paths and tamper-evident logging of each step. LLM research and analysis are confined to advisory nodes that can flag or veto but cannot execute.",
    approach: [
      "Built the decision pipeline in Python, scikit-learn, SQLite, and React as an explicit state graph with declared action paths.",
      "Logged each step in a tamper-evident record so every decision can be reviewed.",
      "Confined LLM research and analysis to advisory nodes that can flag or veto but cannot execute.",
      "Required human approval for each consequential action.",
      "Designed an isolated AWS environment for reproducible CPU/GPU research experiments, with local tools to control runs and review results.",
    ],
    stack: ["Python", "scikit-learn", "SQLite", "React", "AWS"],
    results: [
      "An explicit state graph with declared action paths.",
      "Tamper-evident logging of each step.",
      "Advisory LLM nodes that can flag or veto but cannot execute.",
      "Human approval required for each consequential action.",
    ],
    learnings: [
      "Boundaries belong in the architecture, not in a model’s confidence.",
      "Declared action paths make it possible to say exactly what the system can and cannot do.",
      "Tamper-evident logs make every decision reviewable after the fact.",
      "Performance claims require forward testing, not only historical simulation.",
    ],
    caseStudy: {
      architecture: [
        "An explicit state graph defines each step of the decision pipeline and the action paths between them.",
        "LLM research and analysis run in advisory nodes that can flag or veto a decision but cannot execute one.",
        "Built with Python, scikit-learn, SQLite, and React.",
      ],
      reliability: [
        "Tamper-evident logging of each step.",
        "Human approval is required for each consequential action.",
        "No live-execution or investment-performance claim is part of the current scope.",
      ],
      delivery: [
        "An isolated AWS environment for reproducible CPU/GPU research experiments.",
        "Local tools control runs and review results.",
      ],
    },
    links: [],
  },
];

export const harmonyBoundaryNote =
  "Active development. Scope is limited to the components listed. No live-execution or investment-performance claim is part of the current scope.";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isRepositoryLink(link: ProjectLink) {
  const label = link.label.toLowerCase();
  const href = link.href.toLowerCase();

  return (
    isExternalLink(link.href) &&
    (label.includes("github") ||
      label.includes("repo") ||
      href.includes("github.com") ||
      href.includes("gitlab.com") ||
      href.includes("bitbucket.org"))
  );
}

export function getProjectRepositoryUrl(project: Project) {
  return project.links?.find(isRepositoryLink)?.href;
}

export function getProjectPrimaryExternalLink(project: Project) {
  return getProjectRepositoryUrl(project) ?? project.links?.find((link) => isExternalLink(link.href))?.href;
}

export const research = {
  title: "HYDRA: watershed forecasting research",
  status: "Ongoing research · results pending",
  summary:
    "Motivated by experiencing Hurricane Helene in Boone, HYDRA studies watershed dynamics and forecast reliability: NextGen reforecast generation software and Google Cloud data workflows, plus a deep-learning post-processor for 1–18 hour streamflow forecasts, with LSTM, Transformer, and Mamba-style models compared under leakage-aware evaluation.",
  scopeNote: "No performance number is reported on this site until the analysis is complete.",
  figures: {
    explorer:
      "Interactive trace of the HYDRA pipeline: reforecast generation, the three model families compared, leakage-aware evaluation by lead time, and the outputs.",
  },
  architecture: [
    "Reforecasts: NextGen reforecast generation software produces retrospective forecasts with consistent initialization, lead-time, and version metadata.",
    "Inputs: weather, streamflow, and forecast data, acquired and validated with Google Cloud workflows and aligned to forecast issue time with traceable provenance.",
    "Models: LSTM, vanilla Transformer, and Mamba-style state-space models (with attention) trained as post-processors on identical inputs.",
    "Outputs: Improved forecasts at 1–18 hour lead times, diagnostics, and research artifacts.",
  ],
  evaluation: [
    "Metrics: Hydrologic error and skill metrics (RMSE, NSE, KGE) reported by site and lead time.",
    "Validation: Leakage-aware temporal splits designed around forecast availability.",
    "Reference: Raw NextGen reforecasts at every lead time.",
  ],
  reproducibility: [
    "Configuration-driven experiments with tracked parameters and artifacts.",
    "Versioned data lineage, manifests, and evaluation outputs.",
    "Environment and run records designed to support scientific review.",
  ],
  constraints: [
    "Research conclusions remain provisional until the analysis is complete; no performance numbers are reported yet.",
    "Operational claims must respect the timing and availability of every model input.",
  ],
  links: [{ label: "HYDRA Case Study", href: "/projects/hydra-temporal" }],
};

// ---------------------------------------------------------------------------
// Open source. Only verified public repositories; no counts or vanity metrics.
// An "Upstream contributions" group exists for future pull requests to other
// projects; a group with no entries is not rendered.
// ---------------------------------------------------------------------------

export type OpenSourceGroup = "Research code" | "Upstream contributions" | "Tooling" | "Coursework & explorations";

export const openSourceGroupOrder: OpenSourceGroup[] = [
  "Research code",
  "Upstream contributions",
  "Tooling",
  "Coursework & explorations",
];

export type OpenSourceEntry = {
  name: string;
  url: string;
  language: string;
  kind: "maintained" | "contribution";
  group: OpenSourceGroup;
  what: string;
  why: string;
  note?: string;
  upstream?: { repo: string; prTitle: string; prUrl: string; mergedLabel: string };
};

export const openSource: OpenSourceEntry[] = [
  {
    name: "NextGen_Hydra",
    url: "https://github.com/Mitchel34/NextGen_Hydra",
    language: "Python",
    kind: "maintained",
    group: "Research code",
    what: "End-to-end automation to acquire, verify, and tidy historical NOAA NextGen streamflow data.",
    why: "Data tooling behind the NextGen reforecast work, public so results can be traced to their data.",
  },
  {
    name: "hydra-nwm-streamflow-correction",
    url: "https://github.com/Mitchel34/hydra-nwm-streamflow-correction",
    language: "Python",
    kind: "maintained",
    group: "Research code",
    note: "earlier phase · 2025–2026",
    what: "GRU, Transformer, and conditioning-head models for National Water Model streamflow time-series regression.",
    why: "Earlier HYDRA phase on the National Water Model, kept public for lineage.",
  },
  {
    name: "Runoff_Forcasting",
    url: "https://github.com/Mitchel34/Runoff_Forcasting",
    language: "Python",
    kind: "maintained",
    group: "Research code",
    note: "thesis-era · 2025",
    what: "Thesis-era pipeline: preprocess data, train a deep-learning model, evaluate the corrected forecasts.",
    why: "Predecessor to HYDRA from the senior honors thesis, kept public so the lineage is visible.",
  },
  {
    name: "Portfolio",
    url: "https://github.com/Mitchel34/Portfolio",
    language: "TypeScript",
    kind: "maintained",
    group: "Tooling",
    what: "This website: Next.js 16, React 19, Tailwind CSS 4, a Resend contact API, and a Calendly embed.",
    why: "The content and every claim on this site are versioned in the same repository that deploys it.",
  },
  {
    name: "Bayesian_Network",
    url: "https://github.com/Mitchel34/Bayesian_Network",
    language: "R",
    kind: "maintained",
    group: "Coursework & explorations",
    what: "Probabilistic reasoning with Bayesian networks: D-separation testing and inference.",
    why: "Probabilistic foundations that shape how I treat forecast uncertainty.",
  },
  {
    name: "MazeApp",
    url: "https://github.com/Mitchel34/MazeApp",
    language: "Java",
    kind: "maintained",
    group: "Coursework & explorations",
    what: "Maze generator and solver: randomized DFS generation and A* search, with a Swing GUI.",
    why: "Search algorithms, implemented and visualized.",
  },
];

// ---------------------------------------------------------------------------
// Talks, workshops, and writing. Single source of truth for the home Research &
// Talks section and /research. Statuses use the evidence system. Manuscripts are
// listed only once the résumé lists them.
// ---------------------------------------------------------------------------

export type TalkKind = "Workshop" | "Talk" | "Abstract" | "Manuscript" | "Thesis" | "Poster";

export type TalkItem = {
  id: string;
  kind: TalkKind;
  order: number;
  title: string;
  venue: string;
  whenLabel: string;
  status: EvidenceStatus;
  role?: string;
  description: string;
  links?: { label: string; href: string }[];
  past?: boolean;
};

export const talks: TalkItem[] = [
  {
    id: "agu26-workshop",
    kind: "Workshop",
    order: 1,
    title: "Best Practices for AI and Agentic Workflows in Earth Science Research",
    venue: "AGU26 Annual Meeting · San Francisco · December 7–11, 2026",
    whenLabel: "December 2026",
    status: "accepted",
    role: "Scientific workshop facilitator",
    description:
      "Teaching earth and environmental scientists practical AI methods for their research workflows.",
  },
  {
    id: "agu26-abstract",
    kind: "Abstract",
    order: 2,
    title: "HYDRA streamflow-forecasting abstract",
    venue: "AGU26 · Hydrology session H100 (machine learning in hydrology)",
    whenLabel: "Decision pending",
    status: "under-review",
    description:
      "Abstract on the HYDRA streamflow-forecasting work. Acceptance and scheduling will be posted when confirmed.",
    links: [{ label: "Research details", href: "/research" }],
  },
  {
    id: "honors-thesis",
    kind: "Thesis",
    order: 3,
    title: "Senior Honors Thesis on runoff forecasting with deep learning",
    venue: "Appalachian State University",
    whenLabel: "December 2025",
    status: "completed",
    role: "Author",
    description: "The deep-learning runoff-forecasting work that became HYDRA.",
    links: [{ label: "Thesis-era code on GitHub", href: "https://github.com/Mitchel34/Runoff_Forcasting" }],
    past: true,
  },
];

export type DiscussionTopic = {
  title: string;
  prompt: string;
  groundedIn?: string;
};

export const discussions = {
  title: "Topics I am glad to talk through.",
  intro: "These are invitations, not past talks. Book 30 minutes or email me if one of these is your problem too.",
  topics: [
    {
      title: "Leakage-safe temporal evaluation",
      prompt:
        "What “available at forecast time” really means for train, validation, and test splits, and how easy it is to cheat by accident.",
      groundedIn: "/research",
    },
    {
      title: "Post-processing operational forecasts by lead time",
      prompt:
        "Why learn a correction on top of NextGen reforecasts instead of replacing the model, and what changes between 1 and 18 hours ahead.",
      groundedIn: "/research",
    },
    {
      title: "Sequence models for hydrology: LSTM, Transformer, Mamba",
      prompt: "What a fair comparison between recurrent, attention, and state-space models needs before anyone declares a winner.",
      groundedIn: "/research",
    },
    {
      title: "AI and agentic workflows in earth-science research",
      prompt: "What I am putting in front of scientists at AGU26: what is worth adopting, and what to be cautious about.",
      groundedIn: "/#research",
    },
    {
      title: "Reproducible research pipelines",
      prompt:
        "Reforecast generation you can rerun, versioned data lineage, and metrics by site and lead time instead of one aggregate score.",
      groundedIn: "/projects/hydra-temporal",
    },
    {
      title: "From production software to research code",
      prompt: "What transfers from GraphQL services at USAA to research code, and what had to be unlearned.",
      groundedIn: "/resume",
    },
    {
      title: "Bounding LLM autonomy in decision systems",
      prompt:
        "Why LLMs should advise rather than act, and how Harmony confines them to nodes that can flag or veto while every consequential action waits for a human.",
      groundedIn: "/projects/harmony",
    },
    {
      title: "Reliability lessons from executive-missions operations",
      prompt:
        "What 50+ executive airlift missions with zero safety-related incidents taught me about preparation and reliability, and how that shows up in software.",
      groundedIn: "/#service",
    },
    {
      title: "From military service into AI",
      prompt:
        "Why I chose to pursue AI while serving, and what the path from an Air Force flying job to computer science and graduate AI research looked like, for veterans weighing the same move.",
      groundedIn: "/about",
    },
  ] satisfies DiscussionTopic[],
  calendlyCta: { label: "Book a 30-minute conversation", href: site.calendlyUrl },
  emailCta: { label: "Or email me", href: `mailto:${site.email}` },
  supportingLine: `${site.location} · ${site.timezone}`,
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  highlights: string[];
  bridgingSentence?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    org: "USAA · San Antonio, TX",
    period: "May 2025 – August 2025",
    highlights: [
      "Built Java and Spring Boot GraphQL APIs for customer-data workflows used across enterprise channels.",
      "Reduced troubleshooting time by 30% through API enhancements and JavaScript comparison views integrating name and employment data from multiple sources.",
    ],
  },
  {
    role: "Executive Missions Aviator",
    org: "United States Air Force · 89th Airlift Wing",
    period: "August 2020 – April 2023",
    highlights: [
      "Flew on 50+ executive airlift missions across 30+ countries, all completed with zero safety-related incidents.",
      "Worked directly onboard with distinguished visitors including the Vice President and Secretary of State; managed passenger safety and logistics with flight crews, security teams, and White House staff.",
      "Served in the 89th Airlift Wing, whose executive airlift mission supported the Vice President, First Lady, Secretaries of State and Defense, and Chairman of the Joint Chiefs of Staff.",
      "Hold an active TS/SCI clearance.",
    ],
    bridgingSentence:
      "I chose to pursue AI while serving, and the preparation, coordination, and zero-incident standard of executive airlift came with me.",
  },
];

export const education = [
  {
    degree: "M.S. Artificial Intelligence",
    org: "University of Texas at Austin",
    period: "In progress – expected May 2027",
    details: [
      "Current GPA: 4.0/4.0.",
      "Completed: AI Ethics, Machine Learning, Deep Learning, and Reinforcement Learning.",
      "Fall 2026: Advances in Deep Learning; Optimization; Natural Language Processing.",
    ],
  },
  {
    degree: "B.S. Computer Science",
    org: "Appalachian State University",
    period: "December 2025",
    details: [
      "Cum Laude (GPA 3.6/4.0).",
      "Senior Honors Thesis on Runoff Forecasting with Deep Learning.",
      "Data Science Certificate.",
    ],
  },
];

export type CourseworkItem = {
  title: string;
  status: "Completed" | "Fall 2026";
  description: string;
};

export function courseEvidenceStatus(status: CourseworkItem["status"]): EvidenceStatus {
  return status === "Completed" ? "completed" : "in-progress";
}

export const coursework = {
  program: "M.S. Artificial Intelligence",
  institution: "University of Texas at Austin",
  currentGpa: "4.0/4.0",
  expectedGraduation: "May 2027",
  completed: [
    {
      title: "AI Ethics",
      status: "Completed",
      description: "Responsible AI, governance, and the societal implications of deployed systems.",
    },
    {
      title: "Machine Learning",
      status: "Completed",
      description: "Supervised and unsupervised learning, model selection, and empirical evaluation.",
    },
    {
      title: "Deep Learning",
      status: "Completed",
      description: "Neural networks, optimization, representation learning, and hands-on implementation.",
    },
    {
      title: "Reinforcement Learning",
      status: "Completed",
      description: "Value-based and policy-gradient methods, function approximation, and sequential decisions.",
    },
  ] satisfies CourseworkItem[],
  upcoming: [
    {
      title: "Advances in Deep Learning",
      status: "Fall 2026",
      description: "Advanced deep-learning methods and current research.",
    },
    {
      title: "Optimization",
      status: "Fall 2026",
      description: "Optimization foundations and methods for artificial intelligence and machine learning.",
    },
    {
      title: "Natural Language Processing",
      status: "Fall 2026",
      description: "Computational methods for language understanding and generation.",
    },
  ] satisfies CourseworkItem[],
};

export const contact = {
  email: site.email,
  github: site.github,
  linkedin: site.linkedin,
};
