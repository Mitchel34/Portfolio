export const site = {
  name: "Mitchel Carson",
  title: "Machine Learning Engineer & Applied AI Researcher",
  headline: "Machine Learning Engineer & Applied AI Researcher",
  tagline: "From Air Force Two to applied AI.",
  role:
    "U.S. Air Force veteran and UT Austin M.S. Artificial Intelligence student researching deep-learning corrections for NOAA’s NextGen streamflow forecasts. Production software at USAA; active TS/SCI.",
  summary:
    "Mitchel Carson is a U.S. Air Force veteran and machine learning engineer. He flew executive missions aboard Air Force Two as an Executive Missions Aviator at Joint Base Andrews (2020–2023), built GraphQL services as a software engineering intern at USAA, and is now a UT Austin M.S. Artificial Intelligence student (expected May 2027) researching deep-learning post-processing of NOAA NextGen streamflow forecasts at 1–18 hour lead times. He holds an active TS/SCI clearance and is based in Austin, Texas.",
  metaDescription:
    "U.S. Air Force veteran (Air Force Two, active TS/SCI) and machine learning engineer. UT Austin M.S. AI student researching deep-learning corrections for NOAA NextGen streamflow forecasts. Austin, TX.",
  schemaJobTitle: "M.S. Artificial Intelligence student, The University of Texas at Austin",
  focusLine: "Air Force veteran · Applied AI research · Production software",
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
    description: "U.S. Air Force: executive missions aboard Air Force Two",
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
    description: "AGU26 workshop, abstract, manuscripts, thesis",
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
    "Nearly three years of executive missions aboard Air Force Two taught me to prepare for everything. Now I bring that discipline to machine learning.",
  summary:
    "I’m completing an M.S. in Artificial Intelligence at UT Austin (4.0 GPA) and researching deep-learning corrections for NOAA’s NextGen streamflow forecasts. Before that: production APIs at USAA and a B.S. in Computer Science.",
  portraitCaption: "Joint Base Andrews → UT Austin",
};

export type HeroStat = { value: string; label: string; detail: string };

export const heroStats: HeroStat[] = [
  { value: "2020–23", label: "U.S. Air Force", detail: "Executive Missions Aviator" },
  { value: "TS/SCI", label: "Clearance", detail: "Active" },
  { value: "4.0", label: "GPA", detail: "UT Austin M.S. AI · May 2027" },
  { value: "AGU26", label: "Workshop facilitator", detail: "Accepted · December 2026" },
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
      "Where the work is being presented and published. Each item carries its current status and is updated as milestones land.",
  },
  skills: {
    title: "What I bring to a team.",
    lede: "Technical depth from research and industry, and operational habits from the Air Force. Each group notes where it was used.",
  },
  contact: {
    title: "Let’s talk.",
    lede:
      "I’m open to machine learning engineering, research engineering, and applied scientist roles, including mission-driven teams where an active clearance matters. I’m also glad to talk forecasting, evaluation, or the move from military service into AI.",
  },
} satisfies Record<string, SectionCopy>;

// ---------------------------------------------------------------------------
// Service. Facts come only from Mitchel's own résumés; nothing here is inferred.
// ---------------------------------------------------------------------------

export type ServiceItem = { title: string; body: string };

export const service = {
  kicker: "U.S. Air Force · 2020–2023",
  title: "Before I wrote code, I flew executive missions aboard Air Force Two.",
  intro: [
    "Air Force Two is the call sign of the aircraft carrying the Vice President. For nearly three years I was an Executive Missions Aviator at Joint Base Andrews, responsible for the safety, schedule, and comfort of the distinguished guests aboard.",
    "The job was equal parts planning and execution. I coordinated missions with White House staff, security teams, and flight crews, and I owned the details that make a mission run on time: in-flight service, baggage, crew hotels, ground transportation, billing, and visas.",
  ],
  record: [
    { term: "Role", value: "Executive Missions Aviator" },
    { term: "Branch", value: "United States Air Force" },
    { term: "Station", value: "Joint Base Andrews, Maryland" },
    { term: "Service", value: "August 2020 – April 2023" },
    { term: "Clearance", value: "Active TS/SCI" },
  ],
  duties: [
    {
      title: "Mission planning",
      body: "Planned missions with White House staff by phone and email, and coordinated with flight crews, security teams, and executive staff.",
    },
    {
      title: "Safety and service",
      body: "Responsible for passenger safety, comfort, and in-flight service for distinguished guests aboard Air Force Two.",
    },
    {
      title: "Logistics",
      body: "Owned baggage logistics, crew hotel bookings, and crew ground transportation so the schedule held.",
    },
    {
      title: "Administration",
      body: "Handled visa applications and crew and passenger subsistence billing.",
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
      body: "I coordinated with White House staff, security teams, and aircrew. Now it is product owners, engineers, and scientists, and the habit is the same: say what is known, what is not, and what happens next.",
    },
    {
      title: "The standard does not move.",
      body: "On an executive aircraft, “mostly right” is not an option. I hold my own work to that bar: evaluation that matches how forecasts are really used, and no result published before the analysis supports it.",
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
    role: "Executive Missions Aviator · Joint Base Andrews, MD",
    body: "Executive missions aboard Air Force Two: passenger safety, logistics, and mission planning with White House staff.",
    link: { label: "Service record", href: "/#service" },
  },
  {
    marker: "II",
    kicker: "Foundation",
    period: "Graduated December 2025",
    title: "Appalachian State University",
    role: "B.S. Computer Science · Cum laude · Boone, NC",
    body: "A Data Science Certificate and a senior honors thesis on runoff forecasting with deep learning: my first research project, and the seed of HYDRA.",
    link: { label: "Thesis-era code", href: "https://github.com/Mitchel34/Runoff_Forcasting" },
  },
  {
    marker: "III",
    kicker: "Industry",
    period: "Summer 2025",
    title: "USAA",
    role: "Software Engineering Intern · Global Headquarters, San Antonio, TX",
    body: "GraphQL APIs in Java and Spring Boot for customer data used across enterprise channels, and comparison views for an internal troubleshooting tool.",
    link: { label: "Case study", href: "/projects/usaa-risk-services" },
  },
  {
    marker: "IV",
    kicker: "Research",
    period: "2026 – May 2027",
    title: "The University of Texas at Austin",
    role: "M.S. Artificial Intelligence · 4.0 GPA · Austin, TX",
    body: "Machine learning, deep learning, reinforcement learning, and AI ethics completed; the honors thesis continues as HYDRA, with two manuscripts in preparation.",
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
  subtitle: "Deep-learning corrections for NOAA NextGen streamflow forecasts",
  plain:
    "River forecasts inform flood warnings and water management. HYDRA asks whether a deep-learning model can correct NOAA’s NextGen streamflow forecasts 1 to 18 hours ahead, using only information that would really be available when the forecast is issued.",
  pipeline: [
    {
      step: "Generate",
      title: "NextGen reforecasts",
      body: "Software I built drives NOAA’s NextGen framework to produce retrospective forecasts with full timing metadata.",
    },
    {
      step: "Correct",
      title: "A learned post-processor",
      body: "LSTM, Transformer, and Mamba-style state-space models trained on identical inputs and splits.",
    },
    {
      step: "Evaluate",
      title: "By site and lead time",
      body: "Leakage-aware temporal splits, with RMSE, NSE, and KGE reported at every lead time from 1 to 18 hours.",
    },
  ],
  status: "in-progress" as EvidenceStatus,
  statusNote: "Manuscripts in preparation for Water Resources Research and Environmental Modelling & Software",
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
    body: "Built GraphQL API capabilities in Java and Spring Boot for customer-data workflows used across enterprise channels, plus comparison views for an internal troubleshooting tool.",
    tags: ["Java", "Spring Boot", "GraphQL", "JavaScript"],
    status: "production",
    href: "/projects/usaa-risk-services",
    linkLabel: "Case study",
  },
  {
    title: "Harmony",
    kicker: "Systems",
    subtitle: "Modular AI-agent and finance research system on AWS",
    body: "A Python research system that separates data, forecasting, validation, policy controls, and simulation. Fail-closed checks stop a workflow when data or evaluation rules are incomplete.",
    tags: ["Python", "PyTorch", "AWS", "Docker"],
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

export type ToolkitGroup = { label: string; items: string[]; usedIn: string };

export const toolkit: ToolkitGroup[] = [
  {
    label: "Machine learning",
    items: [
      "PyTorch",
      "LSTM, Transformer, and Mamba-style models",
      "Forecast post-processing",
      "Leakage-aware temporal evaluation",
      "RMSE · NSE · KGE",
      "pandas · NumPy · xarray",
    ],
    usedIn: "HYDRA, Harmony, UT Austin coursework",
  },
  {
    label: "Software engineering",
    items: ["Java · Spring Boot", "GraphQL", "React · Next.js", "Node.js", "Git · Jira · Agile/Scrum"],
    usedIn: "USAA, client work, this site",
  },
  {
    label: "Cloud and data",
    items: ["Google Cloud: BigQuery, Cloud Storage", "AWS research compute (CPU/GPU)", "Docker", "PostgreSQL", "SQL"],
    usedIn: "HYDRA data acquisition, Harmony experiments",
  },
  {
    label: "Languages",
    items: ["Python", "Java", "TypeScript / JavaScript", "SQL", "R"],
    usedIn: "Research, industry, coursework",
  },
  {
    label: "Operations and leadership",
    items: [
      "Mission planning",
      "Coordination with senior executive staff",
      "Schedule-critical logistics",
      "Technical communication",
      "Active TS/SCI clearance",
    ],
    usedIn: "U.S. Air Force, USAA, AGU26 workshop",
  },
];

export const focusAreas = [
  "Streamflow forecast post-processing",
  "Sequence models: LSTM, Transformer, Mamba",
  "Leakage-aware evaluation by lead time",
  "Reproducible research software",
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
    "I came to AI through operations first. From 2020 to 2023 I was an Executive Missions Aviator in the U.S. Air Force, flying aboard Air Force Two out of Joint Base Andrews, where preparation, reliability, and clear communication were the whole job.",
    "I planned missions with White House staff, coordinated with security teams and flight crews, and owned the logistics that keep an executive schedule on time. I still hold an active TS/SCI clearance.",
    "After the Air Force I studied computer science at Appalachian State, graduating cum laude with a senior honors thesis on runoff forecasting with deep learning, and interned at USAA building GraphQL services in Java and Spring Boot. I also build and advise on software for a small business.",
    "Today I am completing an M.S. in Artificial Intelligence at UT Austin (4.0 GPA) and continuing that thesis as HYDRA, with two manuscripts in preparation. I test carefully, document decisions, and label results by how much evidence stands behind them.",
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
    role: "Executive Missions Aviator · Joint Base Andrews · 2020–2023",
    description:
      "I flew executive missions aboard Air Force Two, responsible for the safety, schedule, and comfort of distinguished guests. I planned missions with White House staff and owned the logistics: baggage, crew hotels, ground transportation, billing, and visas.",
    askAbout: "Operating under exacting standards, mission planning, and moving from military service into AI.",
    href: "/#service",
    linkLabel: "Service record",
    showOnHome: true,
    showOnAbout: true,
  },
  {
    title: "USAA",
    role: "Software Engineering Intern · Global Headquarters · 2025",
    description:
      "At USAA’s global headquarters in San Antonio, I built a GraphQL API with Java and Spring Boot and expanded an internal troubleshooting tool with customer-data comparison views.",
    askAbout: "GraphQL API design, customer-data flows, and enterprise delivery.",
    href: "/projects/usaa-risk-services",
    linkLabel: "View project",
    showOnHome: true,
    showOnAbout: true,
  },
  {
    title: "HYDRA",
    role: "Applied AI for Hydrology · Research in Progress",
    description:
      "I build reforecast generation software for NOAA’s NextGen framework and a post-processing model that improves its streamflow forecasts at 1–18 hour lead times, comparing LSTM, Transformer, and Mamba-style models under leakage-aware evaluation.",
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
    role: "AI-agent and finance research system · Active development",
    description:
      "I am building a modular Python research system for data input, forecasting, validation, controls, and simulation, with an isolated AWS compute path for reproducible experiments. Fail-closed checks stop workflows when data or evaluation rules are incomplete.",
    askAbout: "Semantic validation, modular architecture, and reproducible system state.",
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
    subtitle: "Reforecast generation and post-processing AI for NOAA NextGen streamflow forecasts",
    status: "Active",
    problem:
      "Short-lead streamflow forecasts from NOAA’s NextGen framework carry errors that a learned post-processor may be able to reduce. HYDRA asks whether a model trained on reforecasts generated with the same framework can improve forecasts at 1–18 hour lead times without leaking future information.",
    impact:
      "The work has two parts: software that generates NextGen reforecasts and prepares the data, and a post-processing model evaluated by lead time. A results manuscript for Water Resources Research and a software paper for Environmental Modelling & Software are in preparation.",
    approach: [
      "Built NextGen reforecast generation software that produces retrospective streamflow forecasts, plus tooling that acquires, verifies, and tidies the data.",
      "Designing a deep-learning post-processor that improves NextGen streamflow forecasts at 1–18 hour lead times.",
      "Comparing LSTM, vanilla Transformer, and Mamba-style state-space models (with attention) on identical inputs and splits.",
      "Using Google Cloud BigQuery and Cloud Storage for hydrologic data acquisition while preserving initialization, lead, valid-time, version, and source metadata.",
      "Evaluating with leakage-aware temporal splits and hydrologic metrics reported by site and lead time.",
      "Preparing a results manuscript for Water Resources Research and a software manuscript for Environmental Modelling & Software.",
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
      "Reforecast generation software and data tooling are in place; the NextGen_Hydra repository is public.",
      "Model comparison and lead-time evaluation are in progress; results will be posted when the analysis is complete.",
      "Two manuscripts are in preparation.",
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
        "Packaged data acquisition and reforecast generation as reusable software intended for a software paper.",
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
      "During my internship at USAA’s global headquarters in San Antonio, I built GraphQL API capabilities with Java and Spring Boot and expanded an internal troubleshooting tool with customer-data comparison views.",
    approach: [
      "Designed and implemented GraphQL APIs using Java and Spring Boot.",
      "Added supplementary customer data to an internal troubleshooting tool.",
      "Built responsive JavaScript comparison views and delivered work through an Agile team workflow.",
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
      "Contributed customer-data API capabilities for enterprise workflows.",
      "Improved internal data visibility with new comparison views for business users and troubleshooters.",
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
    subtitle: "A modular Python research system for AI-agent and finance workflows on AWS",
    status: "Active Development",
    problem:
      "Forecasting software needs more than a model. It also needs reliable data, repeatable testing, clear controls, and a safe response when inputs are incomplete.",
    impact:
      "Harmony is an active Python software project with separate components for data input, forecasting, validation, controls, and simulation. This design makes each part easier to test, inspect, and replace.",
    approach: [
      "Separated data, forecasting, validation, controls, and simulation into independent components.",
      "Saved system state and run records so behavior can be reviewed over time.",
      "Required validation and safety checks before performance testing.",
      "Designed the system to stop when data history is incomplete or an action is unsupported.",
      "Designed an AWS research-compute path for isolated, reproducible CPU/GPU experiments while keeping local tooling as the control and review plane.",
    ],
    stack: [
      "Python",
      "PyTorch",
      "pandas",
      "NumPy",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    results: [
      "Configurable components for data input and normalization.",
      "Replaceable forecasting components for time-series experiments.",
      "Checks that timestamps, prediction targets, transformations, schemas, and evaluation rules are consistent.",
      "Policy controls and simulation components with saved state.",
    ],
    learnings: [
      "Data and evaluation definitions must be correct before model performance can be compared.",
      "Safety controls should take priority over model confidence.",
      "Modular design makes research components easier to test, review, and replace.",
      "Performance claims require forward testing, not only historical simulation.",
    ],
    caseStudy: {
      architecture: [
        "Data adapters feed normalized, versioned feature pipelines.",
        "Forecasting components implement shared interfaces for independent comparison.",
        "Validation and policy layers evaluate meaning and constraints before simulated actions.",
        "Paper-mode simulation, SQLite state, and monitoring preserve inspectable system behavior.",
      ],
      reliability: [
        "Fail-closed validation for incomplete timestamps, targets, transformations, schemas, or evaluation meaning.",
        "Leakage-aware research evaluation and explicit separation between historical, shadow, and paper evidence.",
        "Controls remain independent from forecast confidence and can stop downstream behavior.",
        "No live-execution or investment-performance claim is part of the current scope.",
      ],
      delivery: [
        "Modular component architecture supports independent testing and replacement.",
        "Infrastructure-first development keeps state, evidence, and boundaries visible.",
        "Architecture and operating decisions are documented for reproducibility and future handoff.",
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
  title: "HYDRA: post-processing AI for NextGen streamflow reforecasts",
  status: "Ongoing research · results pending",
  summary:
    "Developing reforecast generation software for NOAA’s NextGen framework and a deep-learning post-processor that improves streamflow forecasts at 1–18 hour lead times, with LSTM, vanilla Transformer, and Mamba-style state-space models compared under leakage-aware evaluation. Two manuscripts are in preparation.",
  scopeNote:
    "No performance number is reported on this site until the analysis is complete; results will be published with the manuscripts.",
  figures: {
    explorer:
      "Interactive trace of the HYDRA pipeline: reforecast generation, the three model families compared, leakage-aware evaluation by lead time, and the planned outputs.",
  },
  architecture: [
    "Reforecasts: NextGen reforecast generation software produces retrospective forecasts with consistent initialization, lead-time, and version metadata.",
    "Inputs: NextGen reforecasts and streamflow observations aligned to forecast issue time.",
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
    why: "Data tooling behind the NextGen reforecast work; the software paper builds on it.",
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
// Talks, workshops, and writing. Single source of truth for the hero "Now" line,
// the home Talks section, and /research. Statuses use the evidence system.
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
  heroLabel?: string;
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
    heroLabel: "AGU26 workshop facilitator",
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
    heroLabel: "AGU26 abstract",
  },
  {
    id: "wrr-manuscript",
    kind: "Manuscript",
    order: 3,
    title: "HYDRA results manuscript",
    venue: "Water Resources Research (target journal)",
    whenLabel: "In preparation",
    status: "in-progress",
    role: "Author",
    description:
      "Post-processing results for NextGen streamflow reforecasts at 1–18 hour lead times. Analysis and writing are in progress; a link will be added when one exists.",
    links: [{ label: "Research details", href: "/research" }],
    heroLabel: "WRR manuscript",
  },
  {
    id: "ems-software-paper",
    kind: "Manuscript",
    order: 4,
    title: "NextGen reforecast generation software",
    venue: "Environmental Modelling & Software (target journal)",
    whenLabel: "Planned",
    status: "planned",
    role: "Author",
    description:
      "Software paper describing the reforecast generation and data tooling, planned alongside the code release.",
    links: [{ label: "Code on GitHub", href: "https://github.com/Mitchel34/NextGen_Hydra" }],
    heroLabel: "EM&S software paper",
  },
  {
    id: "honors-thesis",
    kind: "Thesis",
    order: 5,
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
      groundedIn: "/#talks",
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
      title: "Fail-closed validation in forecasting systems",
      prompt:
        "Why controls should not depend on model confidence, and how Harmony stops when data or evaluation rules are incomplete.",
      groundedIn: "/projects/harmony",
    },
    {
      title: "Reliability lessons from executive-missions operations",
      prompt:
        "What flying executive missions aboard Air Force Two taught me about preparation and reliability, and how that shows up in research code.",
      groundedIn: "/#service",
    },
    {
      title: "From military service into AI",
      prompt:
        "What the move from an Air Force flying job to computer science and graduate AI research actually looked like, for veterans weighing the same path.",
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
    org: "USAA",
    period: "May 2025 – August 2025",
    highlights: [
      "At USAA’s global headquarters in San Antonio, designed and implemented GraphQL APIs using Java and Spring Boot to surface core customer data.",
      "Integrated supplementary data into an internal troubleshooting tool.",
      "Built and refined JavaScript front-end components for data visualization.",
      "Worked with an Agile engineering team using Jira and Git.",
      "Worked closely with product owners, backend engineers, and internal users to ensure APIs were usable, secure, and operationally reliable.",
    ],
  },
  {
    role: "Executive Missions Aviator",
    org: "United States Air Force · Joint Base Andrews, MD",
    period: "August 2020 – April 2023",
    highlights: [
      "Maintained passenger safety, comfort, and schedule reliability for distinguished guests aboard Air Force Two.",
      "Planned missions directly with White House staff by phone and email.",
      "Coordinated with flight crews, security teams, and executive staff under exacting operational standards.",
      "Owned in-flight service, baggage logistics, crew hotel bookings, and crew ground transportation.",
      "Handled visa applications and crew and passenger subsistence billing.",
      "Hold an active TS/SCI clearance.",
    ],
    bridgingSentence:
      "Coordinating executive missions taught me to value preparation, reliability, and clear communication in every system I build.",
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
