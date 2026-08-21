export const site = {
  name: "Mitchel Carson",
  title: "AI / Machine Learning Engineer",
  headline: "AI / Machine Learning Engineer",
  summary:
    "Software engineer and UT Austin M.S. Artificial Intelligence student building production software, applied AI research, and reliable data systems. Active TS/SCI clearance; based in Austin, Texas.",
  resumeFilename: "mitchelcarson_resume.pdf",
  resumeUrl: "/mitchelcarson_resume.pdf",
  email: "mitchel.carson@gmail.com",
  github: "https://github.com/Mitchel34",
  linkedin: "https://www.linkedin.com/in/mitchelcarson",
  url: "https://mitchelcarson.com",
  calendlyUrl: "https://calendly.com/mitchel-carson/30min",
  focusLine: "Applied AI · Research Engineering · Production Software",
  location: "Austin, Texas",
  timezone: "Central Time",
  clearance: "Active TS/SCI",
};

export const landingSections = {
  about: { id: "about-me", label: "About Me", href: "/#about-me" },
  coursework: { id: "coursework", label: "Coursework", href: "/#coursework" },
  research: { id: "research", label: "Research", href: "/#research" },
  projects: { id: "projects", label: "Projects", href: "/#projects" },
  contact: { id: "contact", label: "Contact", href: "/#contact" },
} as const;

export const landingNavItems = Object.values(landingSections);

export const focusAreas = [
  "Applied AI and ML systems",
  "Forecasting",
  "Research engineering",
  "Data engineering and ML platforms",
  "Reliable production software",
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

export const thesisImpactStat = "26–54% lower forecast error (RMSE) vs. tested LSTM baselines";

export const about = {
  summary: [
    "My work spans production software at USAA, applied hydrology research, modular AI systems, and small-business software consulting.",
    "I build clear interfaces, test carefully, and document decisions so other people can trust and extend the work.",
    "I am pursuing an M.S. in Artificial Intelligence at UT Austin with a 4.0 GPA, building on completed coursework in machine learning, deep learning, reinforcement learning, and AI ethics.",
  ],
  values: [
    {
      title: "Reliable Systems",
      description:
        "I design models and pipelines teammates can trust, with clear metrics, careful evaluation, and predictable behavior when inputs change.",
    },
    {
      title: "Clear Engineering",
      description:
        "Simple interfaces, repeatable pipelines, and useful monitoring help teams move faster.",
    },
    {
      title: "Risk-Aware Design",
      description:
        "Good systems make uncertainty, limits, and failure modes visible.",
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
};

export const proofItems: ProofItem[] = [
  {
    title: "USAA",
    role: "Software Engineering Intern · Global Headquarters",
    description:
      "At USAA’s global headquarters in San Antonio, I built a GraphQL API with Java and Spring Boot and expanded an internal troubleshooting tool with customer-data comparison views.",
    askAbout: "GraphQL API design, customer-data flows, and enterprise delivery.",
    href: "/projects/usaa-risk-services",
    linkLabel: "View project",
  },
  {
    title: "HYDRA",
    role: "Applied AI for Hydrology · Research in Progress",
    description:
      "I am testing Transformer and GRU corrections for National Water Model streamflow forecasts in a reproducible PyTorch pipeline. Early experiments produced 26–54% lower RMSE than the LSTM baselines tested; final analysis and the manuscript remain in progress.",
    askAbout: "Temporal leakage, forecast evaluation, and defensible research claims.",
    href: "/research",
    linkLabel: "View research",
  },
  {
    title: "GreenSpace Lawn Care",
    role: "Software Consultant",
    description:
      "I built and launched GreenSpaceLawnCare.us and advise the company on social media strategy, translating business needs into a clear digital experience.",
    askAbout: "Client discovery, website delivery, and translating business goals into software.",
    href: "https://www.greenspacelawncare.us/",
    linkLabel: "Visit website",
  },
  {
    title: "Harmony",
    role: "Part-Time Software Product · Active Development",
    description:
      "I am building a modular Python system for data input, forecasting, validation, controls, and simulation. Fail-closed checks stop workflows when data or evaluation rules are incomplete.",
    askAbout: "Semantic validation, modular architecture, and reproducible system state.",
    href: "/projects/harmony",
    linkLabel: "View project",
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
      "Early experiments produced 26–54% lower RMSE than the LSTM baselines tested. The final analysis and manuscript are still in progress.",
    approach: [
      "Developed Transformer and GRU residual-correction experiments for NOAA National Water Model forecasts.",
      "Built a modular PyTorch pipeline integrating NWM forecasts, USGS observations, ERA5 signals, and basin context.",
      "Automated normalization, leakage-aware temporal splits, and hydrologic evaluation with RMSE, NSE, and KGE.",
      "Continuing the analysis and preparing a manuscript for Water Resources Research.",
    ],
    stack: [
      "PyTorch",
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
    links: [{ label: "Research Details", href: "/research" }],
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
    ],
    stack: [
      "Python",
      "PyTorch",
      "pandas",
      "NumPy",
      "PostgreSQL",
      "Docker",
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
  title:
    "HYDRA: Hybrid Deep-learning for Residual Analysis",
  status: "Ongoing research - preliminary results",
  summary:
    "Developing and evaluating Transformer/GRU residual-correction models for National Water Model streamflow forecasts. The pipeline combines hydrologic and meteorological data with leakage-aware temporal evaluation; the final analysis and manuscript are in progress.",
  preliminaryResult:
    "Preliminary experiments produced 26–54% lower RMSE than the LSTM baselines tested. This interim result will be updated as the ongoing analysis and manuscript are completed.",
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
  communication: [
    {
      title: "AGU26 abstract",
      status: "Under review",
      description:
        "The HYDRA abstract is under review for the H100 machine-learning-in-hydrology session; acceptance and scheduling will be updated when confirmed.",
    },
    {
      title: "AGU26 scientific workshop",
      status: "Accepted",
      description:
        "At the AGU26 Annual Meeting in San Francisco, December 7-11, 2026, I will facilitate Best Practices for AI and Agentic Workflows in Earth Science Research, helping earth and environmental scientists use AI to accelerate research workflows.",
    },
    {
      title: "Water Resources Research manuscript",
      status: "In progress",
      description:
        "The manuscript and final analysis are still being developed. A manuscript link and finalized claims will be added after completion.",
    },
  ],
  links: [{ label: "HYDRA Case Study", href: "/projects/hydra-temporal" }],
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
      "Fall 2026: Advances in Deep Learning; Planning, Reasoning, and Search Under Uncertainty; Natural Language Processing.",
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
      title: "Planning, Reasoning, and Search Under Uncertainty",
      status: "Fall 2026",
      description: "Planning, search, reasoning, and decision-making under uncertainty.",
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
