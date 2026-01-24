export const site = {
  name: "Mitchel Carson",
  title: "AI Engineer / Software Engineer",
  headline: "AI engineer building trustworthy forecasting systems.",
  summary:
    "I design ML models and the software around them, from hybrid Transformer/RNN research to production APIs. TS/SCI active.",
  resumeUrl: "/resume.pdf",
  email: "mitchel.carson@gmail.com",
  github: "https://github.com/Mitchel34",
  linkedin: "https://www.linkedin.com/in/mitchelcarson",
};

export const focusAreas = [
  "Time-series forecasting",
  "Transformer + RNN hybrids",
  "Applied ML for environmental systems",
  "Production ML and data pipelines",
];

export const about = {
  summary: [
    "I am a Computer Science graduate (Dec 2025) and incoming M.S. in AI student at UT Austin (Spring 2026). My background spans from mission-critical operations in the USAF to building production APIs at USAA and conducting deep learning research for hydrological forecasting.",
    "My senior honors thesis focused on correction for NOAA streamflow forecasts, achieving 26–54% RMSE reduction using hybrid Transformer architectures. I value leakage-safe evaluation, reproducibility, and systems that withstand real-world conditions.",
  ],
  values: [
    {
      title: "Reliability",
      description:
        "Metrics should reflect operational outcomes and remain stable under distribution shift.",
    },
    {
      title: "Interpretability",
      description:
        "Models should explain residual behavior and reveal failure modes, not just scores.",
    },
    {
      title: "Real-world impact",
      description:
        "Forecast improvements should translate into decisions that matter.",
    },
    {
      title: "Systems that get used",
      description:
        "Pipelines, monitoring, and clear handoffs are part of the model.",
    },
  ],
};

export const projects = [
  {
    title: "Hydra Temporal",
    subtitle: "Residual correction for NOAA NWM streamflow forecasts (Honors Thesis)",
    problem:
      "Operational NWM forecasts show site-specific residual error that limits decision quality.",
    impact:
      "Achieved 26–54% RMSE reduction over LSTM baselines, supporting better water management.",
    approach: [
      "Developed advanced Transformer-based models for temporal sequence modeling.",
      "Integrated multi-source data (NWM v3.0+, ERA5, USGS observations).",
      "Designed leakage-safe evaluation with custom hydrologic metrics.",
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
      "26–54% RMSE reduction on held-out basins.",
      "Robust improvements in multi-horizon streamflow prediction.",
      "Stable performance under distribution shift.",
    ],
    learnings: [
      "Hybrid architectures capture residual structure without overfitting.",
      "Evaluation design is as critical as model choice.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Mitchel34" },
    ],
  },
  {
    title: "USAA Risk Services",
    subtitle: "Production APIs and internal tools for secure workflows",
    problem:
      "Internal teams needed reliable service APIs with tight latency and compliance constraints.",
    impact:
      "Improved developer velocity and system reliability for partner teams.",
    approach: [
      "Designed and implemented GraphQL APIs using Java and Spring Boot.",
      "Enhanced troubleshooting tools by integrating Non-Source-of-Record data.",
      "Built responsive React front-end components for data visualization.",
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
      "Improved data visibility for Business Partners.",
      "Higher deployment confidence with automated tests.",
    ],
    learnings: [
      "Clear interfaces and observability speed up cross-team integration.",
    ],
    links: [{ label: "Experience", href: "/resume" }],
  },
];

export const research = {
  title:
    "Senior Honors Thesis: Runoff Forecasting with Deep Learning",
  summary:
    "Built hybrid Transformer and RNN models to post-process operational streamflow forecasts, improving accuracy while respecting real-world constraints.",
  architecture: [
    "Inputs: NWM streamflow forecast, meteorological forcings, basin attributes.",
    "Transformer encoder captures multi-scale temporal context.",
    "Integrated multi-source data (NWM v3.0+, ERA5, USGS).",
    "Automated feature normalization and leakage-safe splits.",
  ],
  evaluation: [
    "Metrics: RMSE, NSE, KGE.",
    "Validation: leakage-safe temporal splits via spatial holdouts.",
    "Diagnostics: seasonal regime tracking and error distribution checks.",
  ],
  reproducibility: [
    "Config-driven experiments with fixed seeds.",
    "Data versioning and preprocessing checksums.",
    "Tracked runs, artifacts, and environment snapshots.",
  ],
  constraints: [
    "Operational latency limits and missing data.",
    "Distribution shift across basins and seasons.",
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
