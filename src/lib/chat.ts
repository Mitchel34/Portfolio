import { openSource, projects, research, site, talks, work } from "./content";

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

/** One suggestion per thing a visitor usually wants to know; `topic` is the short tag beside it. */
export const suggestions = [
  { topic: "Research", question: "What is HYDRA?" },
  { topic: "Engineering", question: "What did Mitchel build at USAA?" },
  { topic: "Projects", question: "What is Harmony?" },
  { topic: "Path", question: "How did he go from the Air Force to AI?" },
  { topic: "Hiring", question: "What roles is he looking for?" },
] as const;

export const suggestedQuestions = suggestions.map((suggestion) => suggestion.question);

/** Exact destinations already published by the portfolio; never a domain-wide allowlist. */
const publishedChatSources: readonly ChatSource[] = [
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
  { title: "Research and talks", href: "/#research" },
  { title: "Open-source projects", href: "/projects#open-source" },
  { title: work.greenspace.title, href: work.greenspace.href },
  ...openSource.map((entry) => ({ title: `${entry.name} on GitHub`, href: entry.url })),
  ...openSource.flatMap((entry) => entry.evidence?.map((link) => ({ title: link.label, href: link.href })) ?? []),
  ...projects.flatMap((project) => project.links?.map((link) => ({ title: link.label, href: link.href })) ?? []),
  ...talks.flatMap((talk) => talk.links?.map((link) => ({ title: link.label, href: link.href })) ?? []),
  { title: "Résumé PDF", href: site.resumeUrl },
  { title: "GitHub profile", href: site.github },
  { title: "LinkedIn profile", href: site.linkedin },
  { title: "Schedule a conversation", href: site.calendlyUrl },
  { title: "Email Mitchel", href: `mailto:${site.email}` },
];

// Keep the original source title when several public sections link to one URL.
const sourceHrefs = new Set<string>();
export const chatSources: readonly ChatSource[] = publishedChatSources.filter((source) => {
  if (sourceHrefs.has(source.href)) return false;
  sourceHrefs.add(source.href);
  return true;
});

export function getChatSource(href: string): ChatSource | undefined {
  href = href.trim();
  const exact = chatSources.find((source) => source.href === href);
  if (exact) return exact;

  // Models sometimes expand an internal link to its absolute site URL. Accept
  // only that same exact published path, preserving queries and fragments for
  // comparison rather than normalizing unknown paths into trusted ones.
  const absolutePath = /^https?:\/\/[^/?#]+(\/.*)$/.exec(href)?.[1];
  if (!absolutePath) return undefined;
  try {
    const url = new URL(href);
    if (url.origin !== new URL(site.url).origin || url.username || url.password) return undefined;
    return chatSources.find((source) => source.href.startsWith("/") && source.href === absolutePath);
  } catch {
    return undefined;
  }
}

export function isTrustedChatHref(href: string): boolean {
  return getChatSource(href) !== undefined;
}

// ---------------------------------------------------------------------------
// Answer text. Answers are plain text with two Markdown forms: [label](href)
// and **bold**. Anything else renders literally, and a link is only clickable
// when its href is on the allowlist above.
// ---------------------------------------------------------------------------

export type ChatAnswerSegment =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "link"; text: string; href: string };

const ANSWER_TOKEN = /\[([^\]\n]{1,120})\]\(\s*([^\s)]+)\s*\)|\*\*([^*\n]+)\*\*/g;

/** Hide a half-received link or bold marker at the end of a streaming answer. */
function trimIncompleteToken(text: string): string {
  return text
    .replace(/\[[^\]\n]{0,120}(?:\]\(\s*[^\s)]*\s*)?$/, "")
    .replace(/\*\*[^*\n]*$/, "")
    .replace(/\*$/, "");
}

/**
 * Split an answer into paragraphs of renderable segments. Each trusted
 * destination is linked once, at its first mention; a repeat, or a link that is
 * not on the allowlist, falls back to its label as plain text.
 */
export function parseChatAnswer(content: string, options: { streaming?: boolean } = {}): ChatAnswerSegment[][] {
  const text = options.streaming ? trimIncompleteToken(content) : content;
  const linked = new Set<string>();
  const paragraphs: ChatAnswerSegment[][] = [];
  for (const paragraph of text.split(/\n\s*\n/)) {
    if (!paragraph.trim()) continue;
    const segments: ChatAnswerSegment[] = [];
    const push = (value: string) => {
      if (!value) return;
      const last = segments.at(-1);
      if (last?.type === "text") last.text += value;
      else segments.push({ type: "text", text: value });
    };
    let start = 0;
    for (const match of paragraph.matchAll(ANSWER_TOKEN)) {
      push(paragraph.slice(start, match.index));
      const [, label, href, strong] = match;
      const source = href ? getChatSource(href) : undefined;
      if (strong) {
        segments.push({ type: "strong", text: strong });
      } else if (source && !linked.has(source.href)) {
        linked.add(source.href);
        segments.push({ type: "link", text: label, href: source.href });
      } else {
        push(label);
      }
      start = match.index + match[0].length;
    }
    push(paragraph.slice(start));
    paragraphs.push(segments);
  }
  return paragraphs;
}

/** Trusted destinations an answer already links inline, in order of first mention. */
export function getInlineChatHrefs(content: string): string[] {
  return parseChatAnswer(content).flatMap((paragraph) =>
    paragraph.flatMap((segment) => (segment.type === "link" ? [segment.href] : [])),
  );
}

/** Related destinations worth offering after an answer: trusted, unique, and not already linked in its text. */
export function getUnlinkedChatSources(content: string, sources: readonly ChatSource[] = []): ChatSource[] {
  const seen = new Set(getInlineChatHrefs(content));
  return sources.flatMap((source) => {
    const trusted = getChatSource(source.href);
    if (!trusted || seen.has(trusted.href)) return [];
    seen.add(trusted.href);
    return [trusted];
  });
}

export type PreparedChatAnswer = {
  question: string;
  content: string;
  sources: ChatSource[];
};

function prepared(question: string, content: string): PreparedChatAnswer {
  // Sources are exactly the destinations linked in the text, so nothing is offered twice.
  return { question, content, sources: getInlineChatHrefs(content).map((href) => getChatSource(href)!) };
}

/** Curated public answers: available offline, without sending a provider request. */
export const preparedAnswers: readonly PreparedChatAnswer[] = [
  prepared(
    suggestions[0].question,
    `${research.summary}\n\n${research.scopeNote} The [research page](/research) and [HYDRA case study](/projects/hydra-temporal) cover the methods and current findings.`,
  ),
  prepared(
    suggestions[1].question,
    "As a software engineering intern at USAA in summer 2025, Mitchel built Java and Spring Boot GraphQL APIs for customer-data workflows used across enterprise channels. He also brought name and employment data from multiple sources into an internal troubleshooting tool, with JavaScript comparison views on top.\n\nThose API enhancements and comparison views cut troubleshooting time by 30%. The [USAA case study](/projects/usaa-risk-services) has the problem, approach, and results.",
  ),
  prepared(
    suggestions[2].question,
    "Harmony is a financial decision pipeline Mitchel is building to keep LLMs useful but bounded. Every step is declared in an explicit state graph and written to a tamper-evident log. LLMs sit in advisory nodes that can flag or veto a decision but cannot execute one, and each consequential action waits for human approval.\n\nIt is in active development and makes no live-execution or investment-performance claims. Read the [Harmony case study](/projects/harmony), or browse [all projects](/projects).",
  ),
  prepared(
    suggestions[3].question,
    "Mitchel served from 2020 to 2023 as an Executive Missions Aviator in the U.S. Air Force’s 89th Airlift Wing. He flew on 50+ executive airlift missions across 30+ countries, including Air Force Two, with zero safety-related incidents, and he decided to pursue AI while serving.\n\nAfter the Air Force he studied computer science at Appalachian State, interned at USAA, and began an M.S. in Artificial Intelligence at UT Austin. His senior honors thesis on runoff forecasting grew into HYDRA after he experienced Hurricane Helene in Boone. His [Air Force service](/#service) and the [About page](/about) tell the longer version.",
  ),
  prepared(
    suggestions[4].question,
    "Mitchel is open to software engineering and applied AI roles, including scientific computing. He brings production API work at USAA, ongoing forecasting research, and Air Force operations experience, and he holds an active TS/SCI clearance.\n\nThe [résumé](/resume) has the full record. To talk about a role or a research question, [contact Mitchel](/contact) directly. This guide can’t pass messages along.",
  ),
];

function normalizePreparedQuestion(question: string): string {
  return question.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ").replace(/[?!.,;:]+$/g, "").trim();
}

/** Exact normalized matches only; open-ended follow-ups always use the custom path. */
export function getPreparedChatAnswer(question: string): PreparedChatAnswer | undefined {
  const normalized = normalizePreparedQuestion(question);
  return preparedAnswers.find((answer) => normalizePreparedQuestion(answer.question) === normalized);
}
