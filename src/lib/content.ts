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
  updated: "October 2026",
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
  navLabel: string;
  href: string;
  description: string;
  inHeader: boolean;
};

export const landingSections = {
  work: {
    id: "work",
    number: "01",
    label: "Work",
    navLabel: "Work",
    href: "/#work",
    description: "Completed ML labs, research software, USAA APIs, and client work",
    inHeader: true,
  },
  service: {
    id: "service",
    number: "02",
    label: "Service",
    navLabel: "Service",
    href: "/#service",
    description: "U.S. Air Force: Air Force Two, 89th Airlift Wing, 50+ missions",
    inHeader: true,
  },
  path: {
    id: "path",
    number: "03",
    label: "Path",
    navLabel: "Path",
    href: "/#path",
    description: "Air Force, computer science, USAA, UT Austin",
    inHeader: true,
  },
  research: {
    id: "research",
    number: "04",
    label: "Research & Talks",
    navLabel: "Research",
    href: "/#research",
    description: "AGU26 workshop, poster, manuscripts, and thesis",
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
// Home page. The story runs top to bottom: hook, work, service, path, research,
// skills, contact. Components read these; they never inline copy.
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: ["U.S. Air Force veteran", "Active TS/SCI", "Austin, Texas"],
  statement:
    "I build software and applied AI for decisions that depend on reliable data.",
  summary:
    "Air Force veteran. UT Austin M.S. AI student. I’ve built production APIs at USAA and now research watershed forecasting with deep learning, motivated by experiencing Hurricane Helene in Boone.",
  portraitCaption: "Joint Base Andrews → UT Austin",
};

export type HeroStat = { value: string; label: string; detail: string };

export const heroStats: HeroStat[] = [
  { value: "50+", label: "Executive airlift missions", detail: "Including Air Force Two · 30+ countries" },
  { value: "Zero", label: "Safety-related incidents", detail: "Every mission, 89th Airlift Wing" },
  { value: "30%", label: "Less troubleshooting time", detail: "USAA · Summer 2025" },
  { value: "4.0", label: "GPA", detail: "UT Austin M.S. AI · May 2027" },
];

export type SectionCopy = { title: string; lede: string };

export const sectionCopy = {
  path: {
    title: "The path so far.",
    lede:
      "From executive airlift to software engineering and AI research, with reliability at the center.",
  },
  work: {
    title: "Selected work.",
    lede:
      "Completed ML and platform labs, forecasting research, and production APIs. Explore the problem, approach, evidence, and limits.",
  },
  research: {
    title: "Research and speaking.",
    lede:
      "Upcoming presentations, manuscripts in progress, and the research behind them.",
  },
  skills: {
    title: "What I bring to a team.",
    lede: "Technical depth from research and industry, and operational habits from the Air Force.",
  },
  contact: {
    title: "Let’s talk.",
    lede:
      "I’m open to software engineering and applied AI roles, including scientific computing and teams where an active clearance matters. Let’s talk about your team or a shared research question.",
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
    "From 2020 to 2023 I was an Executive Missions Aviator in the 89th Airlift Wing at Joint Base Andrews, the wing whose executive airlift mission supports the Vice President, the First Lady, the Secretaries of State and Defense, and the Chairman of the Joint Chiefs of Staff. I flew aboard Air Force Two, the call sign of the aircraft carrying the Vice President.",
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
    {
      title: "A zero-incident record",
      body: "More than 50 executive airlift missions across more than 30 countries, all completed with zero safety-related incidents.",
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
    body: "50+ executive airlift missions across 30+ countries with zero safety-related incidents, including Air Force Two missions with the Vice President and missions with the Secretary of State. This is where I chose to pursue AI.",
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
    body: "Machine learning, deep learning, reinforcement learning, and AI ethics completed. HYDRA continues as ongoing research, with a results manuscript in preparation and a software paper planned.",
    link: { label: "Coursework", href: "/coursework" },
  },
  {
    marker: "Next",
    kicker: "Upcoming",
    period: "December 2026",
    title: "AGU26 Annual Meeting",
    role: "Workshop presenter & poster presenting author · San Francisco, CA",
    body: "Presenting an accepted workshop on AI and agentic research workflows on December 6, followed by an accepted HYDRA poster on December 11.",
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
    "Can deep learning make NOAA’s NextGen streamflow forecasts more reliable 1–18 hours ahead? HYDRA studies that question using historical forecasts and only the information available when each forecast was issued.",
  pipeline: [
    {
      step: "Generate",
      title: "Reforecasts and data",
      body: "NextGen reforecast generation software and Google Cloud workflows acquire, validate, and align weather, streamflow, and forecast data with traceable provenance.",
    },
    {
      step: "Correct",
      title: "A learned post-processor",
      body: "Designing a comparison of LSTM, Transformer, and Mamba-style post-processors using the same inputs and evaluation periods.",
    },
    {
      step: "Evaluate",
      title: "By site and lead time",
      body: "Evaluation plan: time-based splits, forecast-time input checks, and hydrologic metrics (RMSE, NSE, KGE) by site and lead time.",
    },
  ],
  status: "in-progress" as EvidenceStatus,
  statusNote:
    "Results pending · research manuscript in preparation · software paper planned",
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
    title: "Quantized Linear Inference Lab",
    kicker: "ML systems",
    subtitle: "Weight quantization error, made inspectable",
    body: "Compared per-tensor and per-row signed-int8 weight simulations against binary64 references. Published 48 synthetic metrics and 24 passing checks; no kernel speed or memory claim.",
    tags: ["Python", "Quantization", "Numerical evaluation"],
    status: "completed",
    href: "/projects/quantized-linear-inference-lab",
    linkLabel: "Case study",
  },
  {
    title: "Batch Inference Contract Guard",
    kicker: "ML platform",
    subtitle: "Validate batch responses before using them",
    body: "A library and JSON CLI that report ID and score-vector contract violations. The synthetic suite accepted nine clean cases and rejected all 69 declared mutations without repairing responses.",
    tags: ["Python", "Data contracts", "CLI"],
    status: "completed",
    href: "/projects/batch-inference-contract-guard",
    linkLabel: "Case study",
  },
  {
    title: "Agent Replay Bench",
    kicker: "Agent tooling",
    subtitle: "Deterministic offline trace comparison",
    body: "Compared traces from four pure toy tools, with 200 clean matches and detection of all 1,480 declared mutations. This is bounded regression evidence for synthetic traces.",
    tags: ["Python", "Trace replay", "Regression testing"],
    status: "completed",
    href: "/projects/agent-replay-bench",
    linkLabel: "Case study",
  },
  {
    title: "USAA",
    kicker: "Industry",
    subtitle: "Enterprise GraphQL APIs",
    metric: { value: "30%", label: "less troubleshooting time" },
    body: "Built Java and Spring Boot GraphQL APIs for enterprise customer-data workflows, with JavaScript comparison views that reduced troubleshooting time.",
    tags: ["Java", "Spring Boot", "GraphQL", "JavaScript"],
    status: "production",
    href: "/projects/usaa-risk-services",
    linkLabel: "Case study",
  },
  {
    title: "Harmony",
    kicker: "Systems",
    subtitle: "Automated decision system with bounded LLM autonomy",
    body: "A financial decision pipeline with explicit action paths and tamper-evident logs. LLMs advise; consequential actions require human approval.",
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
      "In-flight service for distinguished visitors",
      "Mission logistics across 30+ countries",
      "Visas, crew hotels, and subsistence billing",
      "Coordination with White House staff and security teams",
      "Technical communication",
      "Active TS/SCI clearance",
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
  status: "Completed" | "Active" | "Production" | "Active Development";
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
    case "Completed":
      return "completed";
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
    "I chose to pursue AI while serving as an Executive Missions Aviator in the U.S. Air Force’s 89th Airlift Wing. From 2020 to 2023, I flew on 50+ executive airlift missions across 30+ countries with zero safety-related incidents.",
    "Aboard Air Force Two and other executive missions, I coordinated passenger safety, logistics, and service with flight crews, security teams, and White House staff. Preparation and clear communication still shape how I build software. I hold an active TS/SCI clearance.",
    "I graduated cum laude in computer science at Appalachian State, where my senior honors thesis explored runoff forecasting with deep learning. Experiencing Hurricane Helene in Boone motivated HYDRA, my ongoing research on watershed forecasts. At USAA, I built Java and Spring Boot GraphQL APIs and helped cut troubleshooting time by 30%.",
    "Today I’m completing an M.S. in Artificial Intelligence at UT Austin (4.0 GPA, expected May 2027). My work spans forecasting research, production software, and client websites. HYDRA analysis and manuscript preparation are ongoing; a software paper is planned.",
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
      "I flew on 50+ executive airlift missions across 30+ countries, all completed with zero safety-related incidents, working directly onboard with distinguished visitors including the Vice President aboard Air Force Two and the Secretary of State. I also handled in-flight service, baggage, crew hotels, visas, and billing.",
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
      "Motivated by experiencing Hurricane Helene in Boone, I build NextGen reforecast generation software and Google Cloud data workflows, and design deep-learning post-processing for 1–18 hour streamflow forecasts under leakage-aware evaluation. A results manuscript is in preparation.",
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
    slug: "quantized-linear-inference-lab",
    title: "Quantized Linear Inference Lab",
    subtitle: "A dependency-free lab for inspecting weight quantization error",
    status: "Completed",
    problem:
      "Quantization summaries can hide how scale selection changes numerical error. I wanted a small implementation whose calculations and evaluation could be checked independently.",
    impact:
      "Completed a reproducible synthetic comparison of per-tensor and per-output-row signed-int8 weight simulations. Computation uses reconstructed binary64 weights; the results establish neither integer-kernel speed or memory savings nor trained-model accuracy.",
    approach: [
      "Implemented reference linear maps, two weight-scaling strategies, and explicit rounding and clipping behavior in plain Python.",
      "Froze toy fixtures and reported numerical error against independently checked binary64 references.",
    ],
    stack: ["Python", "Signed-int8 simulation", "Numerical evaluation", "CLI"],
    results: [
      "The frozen synthetic evaluation passed all 24 checks and retained all 48 metrics.",
      "Per-row scaling lowered mean errors on three nonzero fixtures; maximum errors tied. These observations apply to the declared toy suite.",
    ],
    learnings: [
      "Scale granularity can change mean error without improving the worst case.",
      "Numerical simulation and an optimized inference kernel require different evidence.",
    ],
    caseStudy: {
      architecture: [
        "Separated reference maps, quantization parameters, reconstructed weights, and error reporting so each step can be inspected.",
      ],
      reliability: [
        "Used hand checks and an independent evaluation oracle rather than accepting the implementation's own output as its reference.",
      ],
      delivery: [
        "Published source, frozen evaluation results, and clean offline installation evidence; no model weights or datasets are required.",
      ],
    },
    links: [
      { label: "GitHub repository", href: "https://github.com/Mitchel34/quantized-linear-inference-lab" },
      { label: "Evaluation report", href: "https://github.com/Mitchel34/quantized-linear-inference-lab/blob/3e0239f9e3232b2d18ccad4b537ea8490ce6794f/RESULTS.md" },
    ],
  },
  {
    slug: "batch-inference-contract-guard",
    title: "Batch Inference Contract Guard",
    subtitle: "Explicit correspondence checks for batch inference responses",
    status: "Completed",
    problem:
      "A batch response can contain plausible scores while dropping, duplicating, or reordering request IDs. Downstream consumers need to see those contract failures before using the response.",
    impact:
      "Built a Python library and JSON CLI that diagnose ID and score-vector violations without repairing responses. Completed synthetic evaluation supports the declared correspondence contract; it does not measure model quality, serving performance, or production reliability.",
    approach: [
      "Checked missing, extra, duplicate, and reordered IDs alongside malformed score vectors.",
      "Compared complete diagnostic reports with independent expected reports and repeated each audit to check determinism.",
    ],
    stack: ["Python", "JSON", "Data contracts", "CLI"],
    results: [
      "Accepted nine clean cases and rejected all 69 declared mutations in the synthetic evaluation.",
      "All independent full-report comparisons matched, with zero repeat mismatches across 156 audits and all 22 evaluation checks passing.",
    ],
    learnings: [
      "Correct response correspondence is a separate concern from prediction quality.",
      "Diagnostics should preserve evidence of a broken contract instead of silently repairing it.",
    ],
    caseStudy: {
      architecture: [
        "Kept contract auditing in a reusable library with a JSON CLI for the same structured reports.",
      ],
      reliability: [
        "Exercised declared mutations against full-report oracles, including violations that superficially valid scores would miss.",
      ],
      delivery: [
        "Published source, evaluation artifacts, and a clean offline wheel installation check with 30 passing hand tests.",
      ],
    },
    links: [
      { label: "GitHub repository", href: "https://github.com/Mitchel34/batch-inference-contract-guard" },
      { label: "Evaluation report", href: "https://github.com/Mitchel34/batch-inference-contract-guard/blob/5b42348668e0e4a1b37aa4200f34a43fcb260403/RESULTS.md" },
    ],
  },
  {
    slug: "agent-replay-bench",
    title: "Agent Replay Bench",
    subtitle: "Offline regression checks for deterministic tool traces",
    status: "Completed",
    problem:
      "Changes to a tool-driven workflow can alter event order, arguments, results, or terminal state. A small deterministic comparator makes those regressions inspectable without a live model or service.",
    impact:
      "Built an offline trace comparator around four pure toy tools, with published mutation and repeatability results. The largest evaluated trace has four events; this synthetic suite does not establish live-agent reliability or a hardened sandbox.",
    approach: [
      "Replayed deterministic toy-tool traces and compared structured events and terminal state.",
      "Generated declared trace mutations and checked both detection categories and repeated report agreement.",
    ],
    stack: ["Python", "JSON", "Trace replay", "Regression testing"],
    results: [
      "Matched 200 clean traces and detected all 1,480 declared mutations in their expected categories.",
      "All 1,680 repeated report pairs matched, and all 24 evaluation checks passed.",
    ],
    learnings: [
      "Deterministic tools make trace differences reproducible and easier to diagnose.",
      "Mutation coverage is meaningful only within the trace format and failure categories actually tested.",
    ],
    caseStudy: {
      architecture: [
        "Separated pure toy-tool execution from trace comparison and machine-readable reporting.",
      ],
      reliability: [
        "Checked clean agreement, declared mutation detection, and repeatability independently in the frozen synthetic evaluation.",
      ],
      delivery: [
        "Published source, evaluation artifacts, and clean offline installation verification with 37 passing tests.",
      ],
    },
    links: [
      { label: "GitHub repository", href: "https://github.com/Mitchel34/agent-replay-bench" },
      { label: "Evaluation report", href: "https://github.com/Mitchel34/agent-replay-bench/blob/9731acb1c0125f9e6a400bec759647a3d1eeb080/evaluation/RESULTS.md" },
    ],
  },
  {
    slug: "nextgen-reforecast-software",
    title: "NextGen Reforecast Software",
    subtitle: "Campaign planning, diagnostic execution, and verified archives",
    status: "Active Development",
    problem:
      "Reforecast campaigns need traceable inputs, explicit execution boundaries, and verifiable outputs before their data can support scientific analysis.",
    impact:
      "Built a completed diagnostic execution foundation within ongoing research software: offline planning, provenance checks, and a pinned Watauga operator workflow. Scientific parameter and source-unit qualification, forecast skill, and independent researcher reproduction remain open.",
    approach: [
      "Implemented an operator prepare → run → verify → export workflow with pinned inputs and runtime admission checks.",
      "Verified complete diagnostic outputs before atomically committing a verified whole-campaign archive and selecting forecast rows for export.",
    ],
    stack: ["Python", "NextGen", "t-route", "Provenance", "CLI"],
    results: [
      "The October 11, 2026 acceptance recorded 293 Python tests, 17 browser contract tests, and 14 installed CLI checks.",
      "Three native and three routing stages matched complete sealed reference arrays; all 36 generated issue/lead rows were verified before 12 selected rows were exported.",
      "Hosted automatic execution, recovery, clean-build qualification, and rights/license resolution remain unfinished. Diagnostic agreement is not scientific release or production qualification.",
    ],
    learnings: [
      "Archive verification and diagnostic reproducibility are useful software milestones while scientific qualification remains incomplete.",
      "A request interface needs an explicit boundary between local preparation and qualified execution.",
    ],
    caseStudy: {
      architecture: [
        "Kept campaign planning, execution locks, model stages, archive verification, and export selection as explicit steps.",
        "A local browser prototype collects requests and inspects preparation reports; it does not acquire inputs, run models, or deliver a scientific archive.",
      ],
      reliability: [
        "The installed diagnostic compared complete canonical arrays with sealed references before export; offline tests also cover refusal paths and archive corruption.",
        "Later increments have targeted test evidence; the dated acceptance figures describe the October 11 implementation.",
      ],
      delivery: [
        "Published the software and diagnostic acceptance record separately from HYDRA's model-correction research. No hosted product or final scientific release is claimed.",
      ],
    },
    links: [
      { label: "GitHub repository", href: "https://github.com/Mitchel34/nextgen-reforecast-software" },
      { label: "October 11 acceptance", href: "https://github.com/Mitchel34/nextgen-reforecast-software/blob/main/docs/PUBLIC_CAMPAIGN_EXECUTION_RESULTS_2026-10-11.md" },
      { label: "Current scope and limits", href: "https://github.com/Mitchel34/nextgen-reforecast-software/blob/main/docs/IMPLEMENTATION_STATUS.md" },
    ],
  },
  {
    slug: "hydra-temporal",
    title: "HYDRA",
    subtitle: "Reforecast generation and deep learning for NOAA NextGen streamflow forecasts",
    status: "Active",
    problem:
      "Experiencing Hurricane Helene in Boone motivated HYDRA. The research asks whether deep learning can reduce errors in NOAA’s NextGen streamflow forecasts at 1–18 hour lead times, using only information available at forecast issue time.",
    impact:
      "The work combines NextGen reforecast generation and Google Cloud data workflows with a planned comparison of deep-learning post-processors. Results are pending. A manuscript for Water Resources Research is in preparation; a software paper for Environmental Modelling & Software is planned.",
    approach: [
      "Built NextGen reforecast generation software and Google Cloud workflows to acquire, validate, and align weather, streamflow, and forecast data with traceable provenance.",
      "Designing a comparison of LSTM, Transformer, and Mamba-style post-processors for 1–18 hour lead times using identical inputs and time splits.",
      "Developing evaluation with leakage-aware temporal splits and hydrologic metrics (RMSE, NSE, KGE) by site and lead time.",
      "Preserving initialization, lead, valid-time, version, and source metadata so every training example traces back to the forecast that produced it.",
      "Preparing a results manuscript for Water Resources Research; a software paper for Environmental Modelling & Software is planned.",
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
      "Model comparison and lead-time evaluation are in development; results will be posted when the analysis is complete.",
      "A results manuscript is in preparation, and a software paper is planned.",
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
        "Packaged data acquisition and reforecast generation as reusable software for a planned software paper; the data tooling is public.",
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
    "HYDRA studies whether deep learning can improve NOAA’s NextGen streamflow forecasts 1–18 hours ahead. The work combines reforecast generation, traceable data workflows, and a planned comparison of sequence models under forecast-time constraints. Experiencing Hurricane Helene in Boone motivated the research.",
  scopeNote:
    "No performance number is reported on this site until the analysis is complete; results will be published with the manuscripts.",
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
    name: "quantized-linear-inference-lab",
    url: "https://github.com/Mitchel34/quantized-linear-inference-lab",
    language: "Python",
    kind: "maintained",
    group: "Tooling",
    note: "completed synthetic evaluation",
    what: "Per-tensor and per-row signed-int8 weight simulations with inspectable numerical error reports.",
    why: "Separates quantization error evidence from unmeasured kernel speed and memory claims.",
  },
  {
    name: "batch-inference-contract-guard",
    url: "https://github.com/Mitchel34/batch-inference-contract-guard",
    language: "Python",
    kind: "maintained",
    group: "Tooling",
    note: "completed synthetic evaluation",
    what: "Library and JSON CLI for batch ID correspondence and score-vector contracts.",
    why: "Makes malformed inference responses visible without silently repairing them.",
  },
  {
    name: "agent-replay-bench",
    url: "https://github.com/Mitchel34/agent-replay-bench",
    language: "Python",
    kind: "maintained",
    group: "Tooling",
    note: "completed synthetic evaluation",
    what: "Deterministic offline comparison of synthetic traces from four pure toy tools.",
    why: "Provides reproducible regression evidence within a declared trace and mutation scope.",
  },
  {
    name: "nextgen-reforecast-software",
    url: "https://github.com/Mitchel34/nextgen-reforecast-software",
    language: "Python",
    kind: "maintained",
    group: "Research code",
    note: "diagnostic foundation · active development",
    what: "Campaign planning, pinned diagnostic execution, and verified whole-campaign archives.",
    why: "Auditable research software with scientific qualification and hosted execution still open.",
  },
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
        "What 50+ executive airlift missions, including Air Force Two, with zero safety-related incidents taught me about preparation and reliability, and how that shows up in software.",
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
