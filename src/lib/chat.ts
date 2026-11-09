/** Browser-safe chat contract. Secrets and model instructions live in chat-server.ts. */
export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatSource = { title: string; href: string };

export type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "sources"; sources: ChatSource[] }
  | { type: "done" }
  | { type: "error"; message: string };

export const CHAT_MAX_MESSAGE_LENGTH = 600;
export const CHAT_MAX_HISTORY_MESSAGES = 12;

export const suggestedQuestions = [
  "What is HYDRA?",
  "What did Mitchel build at USAA?",
  "How did the Air Force shape his work?",
  "What roles is Mitchel looking for?",
] as const;

/** Only these existing portfolio destinations can become clickable chat links. */
export const chatSources: readonly ChatSource[] = [
  { title: "HYDRA case study", href: "/projects/hydra-temporal" },
  { title: "USAA case study", href: "/projects/usaa-risk-services" },
  { title: "Harmony case study", href: "/projects/harmony" },
  { title: "All projects", href: "/projects" },
  { title: "Research", href: "/research" },
  { title: "Résumé", href: "/resume" },
  { title: "Contact Mitchel", href: "/contact" },
  { title: "About Mitchel", href: "/about" },
  { title: "Coursework", href: "/coursework" },
  { title: "Air Force service", href: "/#service" },
  { title: "Research and speaking", href: "/#research" },
];

export function getChatSource(href: string): ChatSource | undefined {
  return chatSources.find((source) => source.href === href);
}

export function isTrustedChatHref(href: string): boolean {
  return getChatSource(href) !== undefined;
}

export type PreparedChatAnswer = {
  question: string;
  content: string;
  sources: ChatSource[];
};

/** Curated public answers: available offline, without sending a provider request. */
export const preparedAnswers: readonly PreparedChatAnswer[] = [
  {
    question: suggestedQuestions[0],
    content: "HYDRA is Mitchel’s ongoing research into watershed forecasting with deep learning. It asks whether post-processing NOAA’s NextGen streamflow forecasts can make predictions more reliable 1–18 hours ahead, using only information available when each forecast was issued.\n\nResults are pending. The research manuscript is in preparation, and a paper about the reforecast generation software is planned. Explore the [HYDRA case study](/projects/hydra-temporal) or [research page](/research) for the methods and current status.",
    sources: [getChatSource("/projects/hydra-temporal")!, getChatSource("/research")!],
  },
  {
    question: suggestedQuestions[1],
    content: "During his software engineering internship at USAA, Mitchel built Java and Spring Boot GraphQL APIs for enterprise customer-data workflows. He also integrated data sources into an internal troubleshooting tool and built JavaScript comparison views.\n\nHis portfolio reports a 30% reduction in troubleshooting time from those API enhancements and comparison views. The [USAA case study](/projects/usaa-risk-services) covers the problem, approach, and results.",
    sources: [getChatSource("/projects/usaa-risk-services")!],
  },
  {
    question: suggestedQuestions[2],
    content: "Mitchel served as an Executive Missions Aviator in the U.S. Air Force’s 89th Airlift Wing from 2020 to 2023. His public service record describes 50+ executive airlift missions across 30+ countries, including Air Force Two, completed with zero safety-related incidents.\n\nThat work shaped his approach to engineering: prepare thoroughly, communicate clearly across teams, and build systems people can rely on. Read about his [Air Force service](/#service) and [path into software and applied AI](/about).",
    sources: [getChatSource("/#service")!, getChatSource("/about")!],
  },
  {
    question: suggestedQuestions[3],
    content: "Mitchel’s portfolio lists an interest in software engineering and applied AI roles, including scientific computing and teams where an active clearance matters. His background combines production API work at USAA, watershed forecasting research, and operational experience in the Air Force.\n\nExplore his [résumé](/resume) for experience and skills, or [contact Mitchel](/contact) to discuss a role or research collaboration. Availability and clearance details are portfolio-reported; confirm current details with him directly.",
    sources: [getChatSource("/resume")!, getChatSource("/contact")!],
  },
];

function normalizePreparedQuestion(question: string): string {
  return question.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ").replace(/[?!.,;:]+$/g, "").trim();
}

/** Exact normalized matches only; open-ended follow-ups always use the custom path. */
export function getPreparedChatAnswer(question: string): PreparedChatAnswer | undefined {
  const normalized = normalizePreparedQuestion(question);
  return preparedAnswers.find((answer) => normalizePreparedQuestion(answer.question) === normalized);
}
