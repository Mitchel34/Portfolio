export const site = {
  name: "Mitchel Carson",
  title: "AI Engineer / Software Engineer",
  headline: "Building AI systems that bridge research and reality.",
  summary:
    "I build AI systems that are accurate, interpretable, and engineered for the real world. TS/SCI active.",
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
  status: "Active" | "Production";
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
    "My journey began in high-stakes environments aboard Air Force 2, where reliability wasn't optional—it was the mission. I brought that same discipline to software engineering at USAA and now to my research in hydrological forecasting.",
    "Today, I focus on time-series AI that works in the wild. My senior thesis achieved a 26–54% error reduction in national water forecasts using hybrid architectures. I value systems that are leakage-safe, reproducible, and verifiable.",
  ],
  values: [
    {
      title: "Reliability First",
      description:
        "Metrics must reflect operational reality. Models should remain stable even when data shifts.",
    },
    {
      title: "Interpretability",
      description:
        "We need to know *why* a model fails. I build systems that reveal their reasoning, not just their results.",
    },
    {
      title: "Real-World Impact",
      description:
        "Research shouldn't stay in a notebook. I aim for improvements that drive actual decisions.",
    },
    {
      title: "Engineering Discipline",
      description:
        "Pipelines, monitoring, and clear interfaces are as critical as the model architecture itself.",
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
      "Achieved 26–54% RMSE reduction over baselines, directly improving decision support for water management.",
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
      "Accelerated developer velocity and ensured compliance for partner teams across the organization.",
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
      "Streamlined data access for business partners, reducing support tickets.",
      "Increased deployment confidence through automated testing pipelines.",
    ],
    learnings: [
      "Clear interfaces (API contracts) allow teams to move fast safely.",
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
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const research = {
  title:
    "Senior Honors Thesis: Runoff Forecasting with Deep Learning",
  summary:
    "Post-processing operational streamflow forecasts with Hybrid Transformer/RNN models to improve accuracy while respecting physical constraints.",
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

export const experience = [
  {
    role: "SWE Intern",
    org: "USAA",
    period: "May 2025 - August 2025",
    highlights: [
      "Designed and implemented GraphQL APIs using Java and Spring Boot to surface core customer data.",
      "Enhanced internal troubleshooting tools by integrating Non-Source-of-Record data.",
      "Built and refined JavaScript front-end components for data visualization.",
      "Collaborated in an Agile/Scrum team using Jira and Git.",
    ],
  },
  {
    role: "Executive Missions Aviator",
    org: "United States Air Force",
    period: "August 2020 - April 2023",
    highlights: [
      "Maintained passenger safety and schedule reliability for distinguished guests aboard Air Force 2.",
      "Responsible for mission planning and communication with the White House.",
      "Managed logistics, billing, and visa applications for crew and passengers.",
    ],
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
