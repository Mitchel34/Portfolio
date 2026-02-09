export const site = {
  name: "Mitchel Carson",
  title: "AI Engineer building production-grade ML systems",
  headline:
    "AI Engineer building production-grade ML systems \u2014 from real-time forecasting to financial risk infrastructure",
  summary:
    "I design machine-learning systems that hold up under real-world constraints—accuracy, interpretability, and operational reliability. TS/SCI active.",
  resumeUrl: "/resume.pdf",
  email: "mitchel.carson@gmail.com",
  github: "https://github.com/Mitchel34",
  linkedin: "https://www.linkedin.com/in/mitchelcarson",
  url: "https://mitchelcarson.com",
};

export const focusAreas = [
  "Time-series forecasting",
  "Transformer + RNN hybrids",
  "Applied ML for environmental systems",
  "Production ML and data pipelines",
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

export const about = {
  summary: [
    "My background spans high-stakes operational environments, production software engineering, and applied ML research. Across all of them, I've learned that strong systems come from clear interfaces, disciplined validation, and good communication between people with different expertise.",
    "My senior thesis achieved a 26–54% error reduction in national water forecasts using hybrid deep-learning architectures. I'm especially effective in teams where research, engineering, and domain knowledge intersect—and where reliability and clarity matter as much as raw performance.",
  ],
  values: [
    {
      title: "Reliability in Shared Systems",
      description:
        "I design models and pipelines that teammates can trust—stable metrics, leakage-safe evaluation, and behavior that's predictable under change.",
    },
    {
      title: "Engineering Discipline Enables Team Velocity",
      description:
        "Clean interfaces, reproducible pipelines, and monitoring aren't overhead—they're what let teams move fast without breaking things.",
    },
    {
      title: "Risk Awareness",
      description:
        "Systems should explicitly model uncertainty and downside, not just optimize expected outcomes.",
    },
  ],
};

export const projects: Project[] = [
  {
    slug: "hydra-temporal",
    title: "Hydra Temporal",
    subtitle: "Improving National Streamflow Forecasts (Honors Thesis)",
    status: "Active",
    problem:
      "National water models often struggle with local precision, leaving communities with uncertain flood warnings.",
    impact:
      "Achieved 26–54% RMSE reduction over baselines, directly improving decision support for water management. Operational water forecasts affect real decisions—flood warnings, resource planning, and risk management. Improving accuracy while maintaining stability directly improves trust in these systems.",
    approach: [
      "Developed advanced Transformer-based models to catch residuals that physical models miss.",
      "Integrated multi-source data (NWM v3.0+, ERA5, USGS) for a comprehensive view.",
      "Designed leakage-safe evaluation to ensure performance holds up in the future.",
      "Preparing manuscript for submission to Water Resources Research (AGU).",
    ],
    stack: [
      "PyTorch",
      "Transformer",
      "Hydra",
      "MLflow",
      "xarray",
      "AWS Batch",
    ],
    results: [
      "26–54% reduction in prediction error (RMSE) on held-out basins.",
      "Consistent improvement across varying forecast horizons.",
      "Demonstrated stability under seasonal distribution shifts.",
    ],
    learnings: [
      "Hybrid architectures can correct physical model biases without overfitting.",
      "Rigorous evaluation design is the difference between a demo and a product.",
      "Balancing research goals with operational constraints mirrors how ML systems are built in production teams.",
    ],
    caseStudy: {
      architecture: [
        "Residual-correction pipeline that ingests NOAA NWM forecasts, forcing signals, and basin context.",
        "Transformer encoder for multi-scale temporal context, paired with a recurrent residual head.",
        "Config-driven training and evaluation with strict train/validation/test time boundaries.",
      ],
      reliability: [
        "Leakage-safe splitting by basin and time horizon to match operational inference constraints.",
        "Reproducible runs through fixed seeds, immutable data artifacts, and tracked configuration snapshots.",
        "Stress-tested against seasonal drift and missing-sensor windows for production realism.",
      ],
      delivery: [
        "Packaged experiments with Hydra + MLflow for repeatable model iteration and comparison.",
        "Built deployment-ready outputs for downstream operational routing and dashboard consumption.",
        "Defined clear handoff surfaces so model updates can be integrated without pipeline rewrites.",
      ],
    },
    links: [
      { label: "GitHub", href: "https://github.com/Mitchel34" },
    ],
  },
  {
    slug: "usaa-risk-services",
    title: "USAA Risk Services",
    subtitle: "Secure Production APIs for Financial Services",
    status: "Production",
    problem:
      "Internal teams needed a reliable, compliant way to access core risk data without navigating legacy complexity.",
    impact:
      "Accelerated developer velocity and ensured compliance for partner teams across the organization. Making risk data accessible and predictable reduced cross-team friction and improved decision-making speed.",
    approach: [
      "Designed and deployed strict GraphQL APIs using Java and Spring Boot.",
      "Enhanced internal observability tools by unifying disparate data sources.",
      "Built responsive React dashboards to give stakeholders visibility into risk metrics.",
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
      "Consolidated fragmented data access into a single self-serve API layer, eliminating recurring partner-team support loops.",
      "Introduced schema-validated deployment gates that caught contract regressions before production.",
    ],
    learnings: [
      "Clear interfaces (API contracts) allow teams to move fast safely.",
      "Effective production systems require close collaboration between engineers, product owners, and end users.",
    ],
    caseStudy: {
      architecture: [
        "Contract-first GraphQL API layer over core risk services using Java and Spring Boot.",
        "Typed front-end integrations for operational dashboards and internal support tooling.",
        "Data-access partitioning to separate source-of-record from troubleshooting data paths.",
      ],
      reliability: [
        "Test-gated deployments with schema validation to prevent API contract regressions.",
        "Structured logging and observability hooks for rapid incident diagnosis.",
        "Secure defaults and compliance-aware patterns embedded in service interfaces.",
      ],
      delivery: [
        "Shipped incrementally with Agile team workflows and shared Jira/Git ownership.",
        "Reduced partner-team support loops by making data retrieval predictable and self-serve.",
        "Improved deployment confidence through repeatable release and validation checks.",
      ],
    },
    links: [{ label: "Experience", href: "/resume" }],
  },
  {
    slug: "harmony-trading",
    title: "Harmony",
    subtitle: "Algorithmic trading systems for disciplined decision-making",
    status: "Active Development",
    problem:
      "Financial markets are noisy, adversarial environments where predictive accuracy alone is insufficient. Sustainable trading systems require disciplined evaluation, strict risk controls, and infrastructure that behaves predictably under stress.",
    impact:
      "A modular algorithmic trading system with independent forecasting, risk management, and execution components \u2014 designed so any module can be evaluated, replaced, or improved without breaking the pipeline.",
    approach: [
      "Design a forecasting and execution pipeline that survives regime shifts.",
      "Emphasize risk management over raw returns.",
      "Build components that can be evaluated independently and replaced safely.",
      "Treat trading as a systems engineering problem, not a single model.",
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
      "Market data ingestion and normalization pipeline.",
      "Forecasting models for short- and medium-horizon signals.",
      "Risk engine enforcing position sizing and drawdown limits.",
      "Backtesting framework with leakage-aware evaluation.",
      "Execution simulation via paper trading.",
    ],
    learnings: [
      "No model is trusted without adversarial backtesting.",
      "Risk constraints override model confidence.",
      "Components must fail safely.",
      "Performance claims require statistically sound evaluation.",
    ],
    caseStudy: {
      architecture: [
        "Market data ingestion feeding normalized feature pipelines.",
        "Forecast models generating short- and medium-horizon signals.",
        "Risk engine enforcing position sizing, drawdown limits, and exposure controls.",
        "Execution layer with paper trading simulation and metrics monitoring.",
      ],
      reliability: [
        "Risk-adjusted return metrics (Sharpe, Sortino) over raw P&L.",
        "Maximum drawdown tracking and regime-stability analysis.",
        "Backtest vs. forward-test divergence monitoring.",
        "Leakage-aware evaluation to prevent look-ahead bias.",
      ],
      delivery: [
        "Modular component architecture allowing independent evaluation and replacement.",
        "Incremental development with infrastructure-first approach.",
        "Design decisions documented for future team onboarding.",
      ],
    },
    links: [
      { label: "GitHub", href: "https://github.com/Mitchel34" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const research = {
  title:
    "Senior Honors Thesis: Runoff Forecasting with Deep Learning",
  summary:
    "Post-processing operational streamflow forecasts with Hybrid Transformer/RNN models to improve accuracy while respecting physical constraints. I'm interested in extending this work through collaboration—across hydrology, ML research, and applied engineering teams—to improve real-world decision support.",
  architecture: [
    "Inputs: Operational NWM forecasts, meteorological forcings, static attributes.",
    "Encoder: Transformer capturing multi-scale temporal context.",
    "Integration: Fusing physical model outputs with deep learning corrections.",
    "Pipeline: Automated feature normalization and leakage-safe splitting.",
  ],
  evaluation: [
    "Metrics: RMSE, NSE, KGE (Hydrology-standard metrics).",
    "Validation: Spatial holdouts to test generalization.",
    "Diagnostics: Analyzing error distributions across seasons.",
  ],
  reproducibility: [
    "Config-driven experiments (Hydra) with fixed seeds.",
    "Strict data versioning and artifact tracking.",
    "Full environment captures for every run.",
  ],
  constraints: [
    "Must run within operational latency limits.",
    "Robustness to missing sensor data.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/Mitchel34" },
  ],
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
    role: "SWE Intern",
    org: "USAA",
    period: "May 2025 - August 2025",
    highlights: [
      "Designed and implemented GraphQL APIs using Java and Spring Boot to surface core customer data.",
      "Enhanced internal troubleshooting tools by integrating Non-Source-of-Record data.",
      "Built and refined JavaScript front-end components for data visualization.",
      "Collaborated in an Agile/Scrum team using Jira and Git.",
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
      "Managing logistics for executive missions under zero-margin-for-error conditions shaped how I think about reliability in every system I build.",
  },
];

export const education = [
  {
    degree: "M.S. Artificial Intelligence",
    org: "University of Texas at Austin",
    period: "Spring 2026 (Admitted)",
    details: [
      "Focus on time-series forecasting, deep learning, and applied ML systems.",
    ],
  },
  {
    degree: "B.S. Computer Science",
    org: "Appalachian State University",
    period: "December 2025",
    details: [
      "Magna Cum Laude (GPA 3.6/4.0).",
      "Senior Honors Thesis on Runoff Forecasting with Deep Learning.",
      "Data Science Certificate.",
    ],
  },
];

export const contact = {
  email: site.email,
  github: site.github,
  linkedin: site.linkedin,
};
