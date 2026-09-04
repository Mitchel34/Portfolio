export const site = {
  name: "Mitchel Carson",
  title: "Machine Learning Engineer & Applied AI Researcher",
  headline: "Machine Learning Engineer & Applied AI Researcher",
  tagline: "Forecast corrections, evaluated the way they’d be used.",
  role:
    "I research deep-learning residual correction for NOAA National Water Model streamflow forecasts and build the reproducible pipelines behind it. M.S. Artificial Intelligence at UT Austin, expected May 2027; production software at USAA before that.",
  summary:
    "Mitchel Carson is a machine learning engineer and UT Austin M.S. Artificial Intelligence student (expected May 2027) researching deep-learning residual correction for NOAA National Water Model streamflow forecasts. He previously built GraphQL services as a software engineering intern at USAA and served as an Executive Missions Aviator in the U.S. Air Force; he holds an active TS/SCI clearance and is based in Austin, Texas.",
  metaDescription:
    "Machine learning engineer and UT Austin M.S. AI student researching residual correction for NOAA National Water Model streamflow forecasts. Austin, TX.",
  schemaJobTitle: "M.S. Artificial Intelligence student, The University of Texas at Austin",
  focusLine: "Applied AI Research · Reproducible ML · Production Software",
  runningHead: "Mitchel Carson · Portfolio",
  updated: "September 2026",
  updatedYear: "2026",
  resumePdfUpdated: "August 2026",
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

export const evidenceLegend: { tone: EvidenceTone; label: string; meaning: string }[] = [
  { tone: "confirmed", label: "confirmed", meaning: "accepted, completed, production" },
  { tone: "provisional", label: "provisional", meaning: "under review, preliminary" },
  { tone: "pending", label: "not yet", meaning: "in progress, planned, active development" },
];

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
  research: {
    id: "research",
    number: "01",
    label: "Research",
    navLabel: "Research",
    href: "/#research",
    description: "HYDRA: residual correction for National Water Model forecasts",
    inHeader: true,
  },
  openSource: {
    id: "open-source",
    number: "02",
    label: "Open Source",
    navLabel: "Open Source",
    href: "/#open-source",
    description: "Research code and tooling, published in the open",
    inHeader: true,
  },
  talks: {
    id: "talks",
    number: "03",
    label: "Talks & Discussions",
    navLabel: "Talks",
    href: "/#talks",
    description: "AGU26 workshop, abstract status, and discussion topics",
    inHeader: true,
  },
  projects: {
    id: "projects",
    number: "04",
    label: "Projects",
    navLabel: "Projects",
    href: "/#projects",
    description: "Production APIs and modular AI software",
    inHeader: true,
  },
  about: {
    id: "about-me",
    number: "05",
    label: "About",
    navLabel: "About",
    href: "/#about-me",
    description: "Background, experience, and what I bring",
    inHeader: true,
  },
  coursework: {
    id: "coursework",
    number: "06",
    label: "Graduate Study",
    navLabel: "Graduate Study",
    href: "/#coursework",
    description: "UT Austin M.S. Artificial Intelligence, 4.0 GPA",
    inHeader: false,
  },
  contact: {
    id: "contact",
    number: "07",
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
  { label: "About", href: "/about", description: "Background, values, focus areas" },
  { label: "Projects", href: "/projects", description: "All case studies" },
  { label: "Research", href: "/research", description: "HYDRA in full" },
  { label: "Coursework", href: "/coursework", description: "Completed and planned graduate courses" },
  { label: "Résumé", href: "/resume", description: "PDF, experience, education" },
  { label: "Contact", href: "/contact", description: "Form and scheduling" },
];

// ---------------------------------------------------------------------------
// Home-page section copy (titles and ledes). Components read these, never inline copy.
// ---------------------------------------------------------------------------

export type SectionCopy = { title: string; lede: string };

export const sectionCopy = {
  research: {
    title: "Residual correction for National Water Model streamflow forecasts.",
    lede:
      "HYDRA tests Transformer and GRU residual-correction models on NOAA National Water Model forecasts, using USGS observations, ERA5 signals, and basin context, with leakage-aware temporal splits and RMSE, NSE, and KGE reported by site and horizon.",
  },
  openSource: {
    title: "The code behind the claims.",
    lede:
      "I publish research code and tooling in the open so results can be inspected and reproduced. A selection follows; everything else is on GitHub.",
  },
  talks: {
    title: "Upcoming, under review, and in progress.",
    lede:
      "One accepted AGU26 workshop, one abstract under review, one manuscript in progress, and the thesis this work grew from, each labeled with its current status and updated as milestones land. Alongside them: topics I am glad to talk through.",
  },
  projects: {
    title: "Engineering beyond HYDRA.",
    lede:
      "Production GraphQL services at USAA and a modular forecasting system with fail-closed validation. Each case study separates problem, approach, current evidence, and limits.",
  },
  about: {
    title: "Operations, production software, research.",
    lede:
      "Air Force executive missions taught me preparation and reliability. USAA taught me production engineering. HYDRA is where I apply both to open questions, with clear metrics, careful evaluation, and documentation others can extend.",
  },
  coursework: {
    title: "UT Austin M.S. Artificial Intelligence.",
    lede:
      "Completed courses represent finished graduate study. Fall 2026 courses are listed as planned and move to completed only after the semester ends.",
  },
  contact: {
    title: "Let’s talk research, systems, or both.",
    lede:
      "Open to conversations about research engineer, applied scientist, and machine learning engineering roles, and to collaboration on forecasting and evaluation.",
  },
} satisfies Record<string, SectionCopy>;

// ---------------------------------------------------------------------------
// Credentials strip (under the masthead).
// ---------------------------------------------------------------------------

export type Credential = { label: string; value: string; href?: string };

export const credentials: Credential[] = [
  {
    label: "Graduate study",
    value: "The University of Texas at Austin · M.S. Artificial Intelligence · GPA 4.0 · expected May 2027",
    href: "/#coursework",
  },
  {
    label: "Research",
    value: "HYDRA · deep-learning residual correction for National Water Model forecasts · manuscript in progress",
    href: "/#research",
  },
  {
    label: "AGU26",
    value: "Scientific workshop facilitator · Accepted",
    href: "/#talks",
  },
  {
    label: "Industry",
    value: "USAA · Software Engineering Intern · 2025",
    href: "/projects/usaa-risk-services",
  },
  {
    label: "Service and clearance",
    value: "U.S. Air Force · Executive Missions Aviator · 2020–2023 · Active TS/SCI",
    href: "/resume",
  },
];

export const focusAreas = [
  "Time-series forecasting research",
  "Leakage-aware evaluation",
  "Reproducible ML pipelines",
  "Production software and APIs",
  "Modular forecasting systems",
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

export const preliminaryResultStat = "Preliminary: 26–54% lower RMSE vs. the LSTM baselines tested";

export const about = {
  summary: [
    "I came to AI through operations first: as an Executive Missions Aviator aboard Air Force 2, where preparation, reliability, and clear communication were the whole job.",
    "I then studied computer science at Appalachian State, wrote a senior honors thesis on runoff forecasting with deep learning, and interned at USAA building GraphQL services in Java and Spring Boot. I also build and advise on software for a small business.",
    "Today I am completing an M.S. in Artificial Intelligence at UT Austin (4.0 GPA) and continuing that thesis as HYDRA, with a manuscript in progress. I test carefully, document decisions, and label results by how much evidence stands behind them.",
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
    title: "United States Air Force",
    role: "Executive Missions Aviator · 2020–2023",
    description:
      "I maintained passenger safety, logistics, and schedule reliability for distinguished guests aboard Air Force 2, coordinating mission planning with flight crews, security teams, and executive staff.",
    askAbout: "Operating under exacting standards, mission planning, and what an active clearance does and does not change.",
    href: "/resume",
    linkLabel: "Experience",
    showOnHome: true,
    showOnAbout: true,
  },
  {
    title: "HYDRA",
    role: "Applied AI for Hydrology · Research in Progress",
    description:
      "I am testing Transformer and GRU corrections for National Water Model streamflow forecasts in a reproducible PyTorch pipeline. Preliminary experiments produced 26–54% lower RMSE than the LSTM baselines tested; final analysis and the manuscript remain in progress.",
    askAbout: "Temporal leakage, forecast evaluation, and defensible research claims.",
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
    role: "Part-Time Software Product · Active Development",
    description:
      "I am building a modular Python system for data input, forecasting, validation, controls, and simulation. Fail-closed checks stop workflows when data or evaluation rules are incomplete.",
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
    subtitle: "Hybrid Deep-learning for Residual Analysis",
    status: "Active",
    problem:
      "National forecasts can miss local watershed behavior. HYDRA tests whether deep-learning corrections can improve National Water Model streamflow forecasts using timelines that reflect real forecasting conditions.",
    impact:
      "Preliminary experiments produced 26–54% lower RMSE than the LSTM baselines tested. The final analysis and manuscript are still in progress.",
    approach: [
      "Developed Transformer and GRU residual-correction experiments for NOAA National Water Model forecasts.",
      "Built a modular PyTorch pipeline integrating NWM forecasts, USGS observations, ERA5 signals, and basin context.",
      "Used Google Cloud BigQuery and Cloud Storage to acquire issued NWM forecasts while preserving initialization, lead, valid-time, version, and source metadata.",
      "Automated normalization, leakage-aware temporal splits, and hydrologic evaluation with RMSE, NSE, and KGE.",
      "Continuing the analysis and preparing a manuscript for Water Resources Research.",
    ],
    stack: [
      "PyTorch",
      "Google Cloud",
      "Transformer",
      "GRU",
      "Hydra Config",
      "MLflow",
      "xarray",
    ],
    results: [
      "Built repeatable evaluations across multiple forecast horizons and watershed sites.",
      "Produced versioned predictions, diagnostics, and figures for ongoing analysis.",
      "Results remain under active review and will be updated after the manuscript analysis is complete.",
    ],
    learnings: [
      "Residual-correction research depends as much on temporal evaluation design as model architecture.",
      "Reproducible data and configuration lineage make changing scientific results auditable.",
      "Research claims should evolve with the evidence rather than outrun the final analysis.",
    ],
    caseStudy: {
      architecture: [
        "Residual-correction pipeline that ingests NOAA NWM forecasts, forcing signals, and basin context.",
        "Transformer encoder for multi-scale temporal context, paired with a recurrent residual head.",
        "Config-driven training and evaluation with strict train/validation/test time boundaries.",
      ],
      reliability: [
        "Leakage-aware splitting by time and evaluation horizon to match operational inference constraints.",
        "Reproducible runs through fixed seeds, immutable data artifacts, and tracked configuration snapshots.",
        "Performance tracked by site, horizon, and hydrologic metric instead of a single aggregate score.",
      ],
      delivery: [
        "Packaged experiments with Hydra configuration and MLflow tracking for repeatable comparison.",
        "Produced versioned artifacts, diagnostics, figures, and technical documentation for scientific review.",
        "Maintained a research website while reserving final manuscript claims for the completed analysis.",
      ],
    },
    links: [
      { label: "Research Details", href: "/research" },
      { label: "GitHub repository", href: "https://github.com/Mitchel34/hydra-nwm-streamflow-correction" },
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
    subtitle: "A modular Python system for forecasting and decision workflows",
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
  title: "HYDRA: Hybrid Deep-learning for Residual Analysis",
  status: "Ongoing research · preliminary results",
  summary:
    "Developing and evaluating Transformer/GRU residual-correction models for National Water Model streamflow forecasts. The pipeline combines hydrologic and meteorological data with leakage-aware temporal evaluation; the final analysis and manuscript are in progress.",
  preliminaryResult:
    "Preliminary experiments produced 26–54% lower RMSE than the LSTM baselines tested. This interim result will be updated as the ongoing analysis and manuscript are completed.",
  resultQualifier: "Preliminary · relative to the LSTM baselines tested",
  preliminaryNote:
    "Preliminary result from early experiments; RMSE relative to the LSTM baselines tested. The final analysis and the Water Resources Research manuscript are in progress.",
  figures: {
    architecture:
      "Conceptual HYDRA research architecture: NWM forecasts, USGS observations, ERA5 signals, and basin context feed a residual-correction model whose output corrects the issued forecast. The implementation continues to evolve with the analysis.",
    explorer:
      "Interactive trace of the HYDRA pipeline: inputs aligned to issue time, residual learning, leakage-aware evaluation, and a bounded outcome. Panel (d) reports a preliminary result; see note 1.",
  },
  architecture: [
    "Inputs: National Water Model forecasts, USGS observations, ERA5 signals, and basin context.",
    "Temporal modeling: Transformer and GRU experiments for learned residual correction.",
    "Pipeline: Modular PyTorch training, automated normalization, and configuration-driven experiments.",
    "Outputs: Versioned predictions, hydrologic diagnostics, figures, and research artifacts.",
  ],
  evaluation: [
    "Metrics: RMSE, NSE, and KGE with results inspected by site and forecast horizon.",
    "Validation: Leakage-aware temporal splits designed around forecast availability.",
    "Diagnostics: Comparisons against National Water Model and LSTM baselines.",
  ],
  reproducibility: [
    "Configuration-driven experiments with tracked parameters and artifacts.",
    "Versioned data lineage, manifests, and evaluation outputs.",
    "Environment and run records designed to support scientific review.",
  ],
  constraints: [
    "Research conclusions remain provisional until the final analysis is complete.",
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
    name: "hydra-nwm-streamflow-correction",
    url: "https://github.com/Mitchel34/hydra-nwm-streamflow-correction",
    language: "Python",
    kind: "maintained",
    group: "Research code",
    what: "GRU, Transformer, and conditioning-head models for time-series regression on National Water Model streamflow.",
    why: "The current HYDRA pipeline, in the open, so the method can be inspected directly.",
  },
  {
    name: "NextGen_Hydra",
    url: "https://github.com/Mitchel34/NextGen_Hydra",
    language: "Python",
    kind: "maintained",
    group: "Research code",
    what: "End-to-end automation to acquire, verify, and tidy historical NOAA NextGen streamflow data.",
    why: "Scripted data acquisition and verification is the precondition for a defensible forecast evaluation.",
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
      "Residual correction of National Water Model streamflow forecasts with Transformer and GRU models. Acceptance and scheduling will be posted when confirmed.",
    links: [{ label: "Research details", href: "/research" }],
    heroLabel: "AGU26 abstract",
  },
  {
    id: "wrr-manuscript",
    kind: "Manuscript",
    order: 3,
    title: "HYDRA manuscript",
    venue: "Water Resources Research (target journal)",
    whenLabel: "In preparation",
    status: "in-progress",
    role: "Author",
    description: "Final analysis and writing are in progress. A link will be added when one exists.",
    links: [{ label: "Research details", href: "/research" }],
    heroLabel: "WRR manuscript",
  },
  {
    id: "honors-thesis",
    kind: "Thesis",
    order: 4,
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
      title: "Residual correction for operational forecasts",
      prompt:
        "Why learn the correction on top of the National Water Model instead of replacing it, and what that buys in evaluation.",
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
        "Hydra configs, MLflow tracking, versioned data lineage, and metrics by site and horizon instead of one aggregate score.",
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
        "What Air Force executive-missions operations taught me about reliability, and what an active TS/SCI clearance does and does not change.",
      groundedIn: "/resume",
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
    period: "May 2025 - August 2025",
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
    org: "United States Air Force",
    period: "August 2020 - April 2023",
    highlights: [
      "Maintained passenger safety and schedule reliability for distinguished guests aboard Air Force 2.",
      "Coordinated across flight crew, security teams, and executive staff to meet exacting operational standards.",
    ],
    bridgingSentence:
      "Coordinating complex executive missions taught me to value preparation, reliability, and clear communication in every system I build.",
  },
];

export const education = [
  {
    degree: "M.S. Artificial Intelligence",
    org: "University of Texas at Austin",
    period: "In progress - Expected May 2027",
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
  return status === "Completed" ? "completed" : "planned";
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
