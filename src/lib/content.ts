export const site = {
  name: "Mitchel Carson",
  title: "Software Engineer · Applied AI & Scientific Computing",
  headline: "Software Engineer · Applied AI & Scientific Computing",
  tagline: "From Air Force Two to applied AI.",
  summary:
    "Mitchel Carson is a software engineer and U.S. Air Force veteran focused on applied AI and scientific computing. As an Executive Missions Aviator in the 89th Airlift Wing (2020–2023) he flew on 50+ executive airlift missions across 30+ countries, including Air Force Two, with zero safety-related incidents. He built Java and Spring Boot GraphQL APIs at USAA and is a UT Austin M.S. Artificial Intelligence student (4.0 GPA, expected May 2027) researching watershed forecasting with deep learning. He holds an active TS/SCI clearance and is based in Austin, Texas.",
  metaDescription:
    "Software engineer and Air Force veteran (Air Force Two, 89th Airlift Wing, 50+ executive missions, active TS/SCI). UT Austin M.S. AI student building applied AI for watershed forecasting.",
  schemaJobTitle: "M.S. Artificial Intelligence student, The University of Texas at Austin",
  focusLine: "Air Force veteran · Applied AI · Scientific computing",
  runningHead: "Mitchel Carson · Portfolio",
  updated: "November 2026",
  updatedYear: "2026",
  resumePdfUpdated: "October 2026",
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
  href: string;
  description: string;
};

export const landingSections = {
  ask: {
    id: "ask-mitchel",
    number: "00",
    label: "Ask the AI guide",
    href: "/#ask-mitchel",
    description: "Questions about my work, answered by an AI guide",
  },
  work: {
    id: "work",
    number: "01",
    label: "Work",
    href: "/#work",
    description: "HYDRA research, USAA APIs, Harmony, client work",
  },
  research: {
    id: "research",
    number: "02",
    label: "Research & Talks",
    href: "/#research",
    description: "AGU26 workshop and poster, manuscripts, thesis",
  },
  service: {
    id: "service",
    number: "03",
    label: "Service",
    href: "/#service",
    description: "U.S. Air Force, 89th Airlift Wing",
  },
  path: {
    id: "path",
    number: "04",
    label: "Path",
    href: "/#path",
    description: "Air Force, computer science, USAA, UT Austin",
  },
  contact: {
    id: "contact",
    number: "05",
    label: "Contact",
    href: "/#contact",
    description: "Email, scheduling, and profiles",
  },
} as const satisfies Record<string, LandingSection>;

export const landingSectionList: LandingSection[] = Object.values(landingSections);

export type SitePage = { label: string; href: string; description: string };

export const sitePages: SitePage[] = [
  { label: "About", href: "/about", description: "The longer story and how I work" },
  { label: "Projects", href: "/projects", description: "Case studies and open source" },
  { label: "Research", href: "/research", description: "HYDRA in full" },
  { label: "Coursework", href: "/coursework", description: "UT Austin M.S. AI courses" },
  { label: "Résumé", href: "/resume", description: "PDF, experience, education" },
  { label: "Contact", href: "/contact", description: "Form and scheduling" },
];

// ---------------------------------------------------------------------------
// Home page: introduction and AI guide, work, research, service, path, contact.
// The home page introduces; detail lives on the project, research, and résumé
// pages. Each fact has one home, and everything else links to it:
//   service numbers and clearance  -> home, Service
//   USAA result                    -> home, Work (detail in the case study)
//   degrees and GPA                -> home, Path (courses on /coursework)
//   AGU26 and manuscript status    -> home, Research (detail on /research)
// The résumé page is the one deliberate full record, because it mirrors the PDF.
// Components read these; they never inline copy.
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Software engineer · Austin, Texas",
  statement: "I build software and applied AI for decisions that depend on reliable data.",
  background: "Air Force veteran, now researching watershed forecasting at UT Austin.",
};

/** The AI guide's visible copy. The privacy line must match what PortfolioChat and chat-server do. */
export const guide = {
  label: "AI guide",
  title: "Ask about Mitchel",
  /** `source` is dropped on small screens to keep the suggestions above the fold; `notLive` always shows. */
  intro: { source: "An AI guide answers from what’s published on this site.", notLive: "It isn’t me replying live." },
  placeholder: "Ask about his work",
  privacy:
    "Suggested questions use prepared answers. Questions you write are sent to OpenAI, along with the recent conversation, to generate a reply.",
};

export type SectionCopy = { title: string; lede?: string };

export const sectionCopy = {
  work: {
    title: "Selected work.",
    lede: "Forecasting research, production APIs, and a decision system in development.",
  },
  research: {
    title: "Research and talks.",
    lede: "Two accepted AGU26 presentations coming up in December, and the writing in progress behind them.",
  },
  path: {
    title: "The path so far.",
  },
  contact: {
    title: "Let’s talk.",
    lede:
      "I’m open to software engineering and applied AI roles, including scientific computing. If you’re hiring, or working on a related research question, email is the fastest way to reach me.",
  },
} satisfies Record<string, SectionCopy>;

// ---------------------------------------------------------------------------
// Service. Facts come only from Mitchel's own résumés; nothing here is inferred.
// ---------------------------------------------------------------------------

export type ServiceItem = { title: string; body: string };

export const service = {
  kicker: "U.S. Air Force · 89th Airlift Wing",
  title: "Before I wrote code, I flew executive missions aboard Air Force Two.",
  intro: [
    "I served in the wing whose executive airlift mission supports the Vice President, the First Lady, the Secretaries of State and Defense, and the Chairman of the Joint Chiefs of Staff.",
    "It was while serving that I chose to pursue AI. The job taught me what it means for people to rely on your work, and that is the standard I build to.",
  ],
  stats: [
    { value: "50+", label: "executive airlift missions" },
    { value: "30+", label: "countries" },
    { value: "Zero", label: "safety-related incidents" },
  ],
  record: [
    { term: "Role", value: "Executive Missions Aviator" },
    { term: "Station", value: "Joint Base Andrews, Maryland" },
    { term: "Service", value: "August 2020 – April 2023" },
    { term: "Clearance", value: "Active TS/SCI" },
  ],
  clearanceNote: "I welcome conversations with defense, intelligence, and other mission-driven AI teams.",
  aboutLink: { label: "What the job was, and what I carried into engineering", href: "/about#service" },
  // The job and its lessons are told on /about.
  duties: [
    {
      title: "Onboard with senior leaders",
      body: "Worked directly onboard with distinguished visitors, including the Vice President aboard Air Force Two and the Secretary of State.",
    },
    {
      title: "Safety and logistics",
      body: "Managed passenger safety and logistics with flight crews, security teams, and White House staff.",
    },
    {
      title: "Mission administration",
      body: "Handled in-flight meal and beverage service, baggage logistics, crew hotel bookings and ground transportation, visa applications, and crew and passenger subsistence billing.",
    },
  ] satisfies ServiceItem[],
  lessonsTitle: "What I carried into engineering",
  lessons: [
    {
      title: "Preparation is the job.",
      body: "A mission was planned long before anyone boarded, down to the hotels, the visas, and the in-flight service. I build research the same way: data manifests, configuration, and leakage checks settled before a model trains.",
    },
    {
      title: "Communicate up, down, and across.",
      body: "I worked alongside flight crews, security teams, and White House staff. Now it is product owners, engineers, and scientists, and the habit is the same: say what is known, what is not, and what happens next.",
    },
    {
      title: "The standard does not move.",
      body: "Every mission had to go right, so the bar never changed with the day. I hold my own work to it: evaluation that matches how forecasts are really used, and no result published before the analysis supports it.",
    },
  ] satisfies ServiceItem[],
};

// ---------------------------------------------------------------------------
// Path: the chronological story, one short chapter per stage.
// ---------------------------------------------------------------------------

export type StoryChapter = {
  marker: string;
  period: string;
  title: string;
  role: string;
  body?: string;
  link: { label: string; href: string };
};

export const story: StoryChapter[] = [
  {
    marker: "I",
    period: "2020 – 2023",
    title: "U.S. Air Force",
    role: "Executive Missions Aviator",
    link: { label: "Service", href: "/#service" },
  },
  {
    marker: "II",
    period: "Graduated December 2025",
    title: "Appalachian State University",
    role: "B.S. Computer Science, cum laude",
    body: "A Data Science Certificate, and a senior honors thesis on runoff forecasting that grew into HYDRA.",
    link: { label: "Thesis-era code", href: "https://github.com/Mitchel34/Runoff_Forcasting" },
  },
  {
    marker: "III",
    period: "Summer 2025",
    title: "USAA",
    role: "Software Engineering Intern",
    body: "Production GraphQL APIs on an enterprise team at the San Antonio headquarters.",
    link: { label: "Case study", href: "/projects/usaa-risk-services" },
  },
  {
    marker: "IV",
    period: "2026 – expected May 2027",
    title: "The University of Texas at Austin",
    role: "M.S. Artificial Intelligence · 4.0 GPA",
    body: "Machine learning, deep learning, reinforcement learning, and AI ethics so far, alongside the HYDRA research.",
    link: { label: "Coursework", href: "/coursework" },
  },
];

// ---------------------------------------------------------------------------
// Work. Short summaries only; methods and background live on the project pages.
// Each project has its own treatment in WorkSection.
// ---------------------------------------------------------------------------

export const work = {
  hydra: {
    kicker: "Research",
    title: "HYDRA",
    subtitle: "Watershed forecasting with deep learning",
    summary:
      "Can deep learning make NOAA’s NextGen streamflow forecasts more reliable 1–18 hours ahead? I build the reforecast pipeline and the models that test it.",
    status: "in-progress" as EvidenceStatus,
    href: "/projects/hydra-temporal",
    linkLabel: "Case study",
    codeHref: "https://github.com/Mitchel34/NextGen_Hydra",
    sceneNote: "Decorative illustration, not model output",
  },
  usaa: {
    kicker: "Industry",
    title: "USAA",
    subtitle: "Enterprise GraphQL APIs",
    metric: { value: "30%", label: "less troubleshooting time" },
    summary:
      "Java and Spring Boot GraphQL APIs for customer-data workflows, with comparison views for the engineers who troubleshoot them.",
    tags: ["Java", "Spring Boot", "GraphQL", "JavaScript"],
    status: "production" as EvidenceStatus,
    href: "/projects/usaa-risk-services",
    linkLabel: "Case study",
  },
  harmony: {
    kicker: "Systems",
    title: "Harmony",
    subtitle: "A decision system with bounded LLM autonomy",
    summary: "A financial decision pipeline where LLMs advise, humans approve, and every step is logged.",
    /** Schematic of the declared path a decision takes. `advisory` marks the step that cannot execute. */
    steps: [
      { label: "Proposed action", note: "declared path" },
      { label: "LLM review", note: "can flag or veto", advisory: true },
      { label: "Human approval", note: "required" },
      { label: "Action", note: "executed" },
    ],
    logNote: "Tamper-evident log of every step",
    tags: ["Python", "scikit-learn", "SQLite", "React", "AWS"],
    status: "active-development" as EvidenceStatus,
    href: "/projects/harmony",
    linkLabel: "Case study",
  },
  greenspace: {
    kicker: "Client work",
    title: "GreenSpace Lawn Care",
    summary: "Built and launched a small-business website, and advise on its social media strategy.",
    status: "delivered" as EvidenceStatus,
    href: "https://www.greenspacelawncare.us/",
    displayUrl: "greenspacelawncare.us",
  },
};

// ---------------------------------------------------------------------------
// Skills, each group grounded in where it was used. Rendered on /resume.
// ---------------------------------------------------------------------------

export type ToolkitGroup = {
  label: string;
  items: string[];
  /** Where the group was used; omitted when it would only restate the résumé. */
  usedIn?: string;
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
    items: [
      "Safety-critical operations",
      "In-flight service for distinguished visitors",
      "International mission logistics",
      "Visas, crew hotels, and subsistence billing",
      "Coordination with White House staff and security teams",
      "Technical communication",
    ],
    usedIn: "U.S. Air Force (89th Airlift Wing, Air Force Two), USAA, AGU26 workshop",
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
  /** One or two sentences for the /projects index; the case study carries the rest. */
  summary: string;
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
  lede: "I decided to pursue AI while serving on Air Force executive airlift missions. This is the longer version of how I got from there to forecasting research.",
  summary: [
    "Aboard Air Force Two and other executive missions, I coordinated passenger safety, logistics, and service with flight crews, security teams, and White House staff. Preparation and clear communication still shape how I build software.",
    "After the Air Force I studied computer science at Appalachian State. I was in Boone when Hurricane Helene hit, and my senior honors thesis on runoff forecasting grew into HYDRA, the watershed-forecasting research I still work on.",
    "Along the way I interned at USAA, building GraphQL APIs on an enterprise team, and I’m now completing an M.S. in Artificial Intelligence at UT Austin. My work spans forecasting research, production software, and client websites.",
  ],
  links: [
    { label: "Service record", href: "/#service" },
    { label: "Projects", href: "/projects" },
    { label: "Résumé", href: "/resume" },
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

export const projects: Project[] = [
  {
    slug: "hydra-temporal",
    title: "HYDRA",
    subtitle: "Reforecast generation and deep learning for NOAA NextGen streamflow forecasts",
    status: "Active",
    summary:
      "Ongoing research on whether deep learning can reduce errors in NOAA’s NextGen streamflow forecasts 1–18 hours ahead. The reforecast software and data workflows are built; the model comparison is in development.",
    problem:
      "Can deep learning reduce errors in NOAA’s NextGen streamflow forecasts at 1–18 hour lead times, using only information available at forecast issue time?",
    impact:
      "The work combines NextGen reforecast generation and Google Cloud data workflows with a planned comparison of deep-learning post-processors. Results are pending.",
    approach: [
      "Built NextGen reforecast generation software and Google Cloud workflows to acquire, validate, and align weather, streamflow, and forecast data with traceable provenance.",
      "Designing a comparison of LSTM, Transformer, and Mamba-style post-processors for 1–18 hour lead times using identical inputs and time splits.",
      "Developing evaluation with leakage-aware temporal splits and hydrologic metrics (RMSE, NSE, KGE) by site and lead time.",
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
      "Model comparison and lead-time evaluation are in development. No performance number is reported until the analysis is complete.",
      "A results manuscript for Water Resources Research is in preparation, and a software paper for Environmental Modelling & Software is planned.",
    ],
    learnings: [
      "Post-processing depends as much on how reforecasts are generated and aligned as on model architecture.",
      "Reproducible data and configuration lineage make changing scientific results auditable.",
      "Research claims should evolve with the evidence rather than outrun the analysis.",
    ],
    caseStudy: {
      architecture: [
        "Reforecast generation software drives NOAA’s NextGen framework to produce retrospective forecasts with consistent metadata.",
        "The proposed post-processor uses reforecasts and available observations to estimate streamflow corrections at 1–18 hour lead times.",
        "Config-driven training and evaluation with strict train/validation/test time boundaries.",
      ],
      reliability: [
        "Leakage-aware splitting by time and lead time to match operational inference constraints.",
        "Reproducible runs through fixed seeds, immutable data artifacts, and tracked configuration snapshots.",
        "Evaluation is designed to report performance by site, lead time, and hydrologic metric.",
      ],
      delivery: [
        "Packaged data acquisition and reforecast generation as reusable software; the data tooling is public.",
        "Produced versioned artifacts, diagnostics, and technical documentation for scientific review.",
        "Maintained a research website while reserving claims for the completed analysis.",
      ],
    },
    links: [
      { label: "Research page", href: "/research" },
      { label: "Code on GitHub", href: "https://github.com/Mitchel34/NextGen_Hydra" },
    ],
  },
  {
    slug: "usaa-risk-services",
    title: "USAA Software Engineering",
    subtitle: "Enterprise APIs and Troubleshooting Software",
    status: "Production",
    summary:
      "Java and Spring Boot GraphQL APIs for customer-data workflows during a summer 2025 internship, plus comparison views that made troubleshooting faster.",
    problem:
      "Internal teams needed customer data presented through dependable services and clear troubleshooting views.",
    impact:
      "During my internship at USAA’s global headquarters in San Antonio, I built Java and Spring Boot GraphQL APIs for customer-data workflows, and JavaScript comparison views for the people troubleshooting them.",
    approach: [
      "Built Java and Spring Boot GraphQL APIs for customer-data workflows used across enterprise channels.",
      "Integrated name and employment data from multiple sources into an internal troubleshooting tool.",
      "Built JavaScript comparison views and delivered work through an Agile team workflow.",
    ],
    stack: ["Java", "Spring Boot", "GraphQL", "JavaScript"],
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
        "JavaScript comparison views in the internal troubleshooting tool, showing name and employment data from multiple sources side by side.",
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
    links: [{ label: "Résumé", href: "/resume" }],
  },
  {
    slug: "harmony",
    title: "Harmony",
    subtitle: "An automated decision system with bounded LLM autonomy",
    status: "Active Development",
    summary:
      "A financial decision pipeline built as an explicit state graph. LLMs advise and can veto, but every consequential action waits for a human, and each step is logged.",
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
    "HYDRA studies whether deep learning can improve NOAA’s NextGen streamflow forecasts 1–18 hours ahead. The work combines reforecast generation, traceable data workflows, and a planned comparison of sequence models under forecast-time constraints. Experiencing Hurricane Helene in Boone motivated the research.",
  scopeNote:
    "No performance number is reported until the analysis is complete. Results will be published with the manuscripts.",
  figures: {
    explorer:
      "Explore HYDRA’s reforecast inputs, planned model comparison, evaluation design, and publication plans.",
  },
  architecture: [
    "Reforecasts: NextGen reforecast generation software produces retrospective forecasts with consistent initialization, lead-time, and version metadata.",
    "Inputs: weather, streamflow, and forecast data, acquired and validated with Google Cloud workflows and aligned to forecast issue time with traceable provenance.",
    "Model comparison plan: LSTM, Transformer, and Mamba-style state-space post-processors using the same inputs and time splits.",
    "Planned outputs: Post-processed forecasts at 1–18 hour lead times, diagnostics, and reproducible research artifacts. Improvement remains to be established.",
  ],
  evaluation: [
    "Metric plan: Hydrologic error and skill metrics (RMSE, NSE, KGE), evaluated by site and lead time.",
    "Validation: Leakage-aware temporal splits designed around forecast availability.",
    "Reference: Raw NextGen reforecasts at every lead time.",
  ],
  reproducibility: [
    "Configuration-driven experiments with tracked parameters and artifacts.",
    "Versioned data lineage, manifests, and evaluation outputs.",
    "Environment and run records designed to support scientific review.",
  ],
  constraints: [
    "Operational claims must respect the timing and availability of every model input.",
    "Conclusions stay provisional until the held-out evaluation is complete.",
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
    why: "Data tooling behind the NextGen reforecast work; the planned software paper builds on it.",
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
// Talks section, /research, and /resume. Statuses use the evidence system and match
// the current conference and manuscript milestones.
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
    venue: "AGU26 · SCIWS10 · San Francisco",
    whenLabel: "December 6, 2026",
    status: "accepted",
    role: "Workshop presenter",
    description:
      "With Mohammad Ali Javidian (App State): practical AI and agentic research workflows. December 6, 8:30 a.m.–5 p.m. PST · Moscone Center, South, Room 157.",
    links: [{ label: "AGU26 workshop details", href: "https://studio.m-anage.com/agu/agu26/meetingapp.cgi/Session/280856" }],
  },
  {
    id: "agu26-poster",
    kind: "Poster",
    order: 2,
    title: "Hydra: Identifying Data That Improve Local National Water Model Streamflow Estimates",
    venue: "AGU26 · H51P · San Francisco",
    whenLabel: "December 11, 2026",
    status: "accepted",
    role: "Presenting author",
    description:
      "Data-source comparisons using NWM, USGS, ERA5, and ERA5-Land at three southern Appalachian gauges. December 11, 8:30 a.m.–12 p.m. PST · Moscone Center, Halls A–C.",
    links: [
      { label: "AGU26 poster details", href: "https://studio.m-anage.com/agu/agu26/meetingapp.cgi/Paper/2094875" },
      { label: "Research details", href: "/research" },
    ],
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
      "Post-processing results for NextGen streamflow forecasts at 1–18 hour lead times. Analysis and writing are in progress; a link will be added when one exists.",
    links: [{ label: "Research details", href: "/research" }],
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
  intro: "These are conversations I’d like to have, not talks I’ve given.",
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
      prompt: "What executive airlift taught me about preparation and reliability, and how that shows up in software.",
      groundedIn: "/#service",
    },
    {
      title: "From military service into AI",
      prompt:
        "Why I chose to pursue AI while serving, and what the path from an Air Force flying job to computer science and graduate AI research looked like, for veterans weighing the same move.",
      groundedIn: "/about",
    },
  ] satisfies DiscussionTopic[],
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
      "Worked directly onboard with distinguished visitors including the Vice President aboard Air Force Two and the Secretary of State; managed passenger safety and logistics with flight crews, security teams, and White House staff.",
      "Handled in-flight meal and beverage service, baggage logistics, crew hotel bookings and ground transportation, visa applications, and crew and passenger subsistence billing.",
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
  current: [
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
