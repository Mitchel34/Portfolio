import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import { loadEnvConfig } from "@next/env";

import {
  CHAT_MAX_MESSAGE_LENGTH,
  getChatSource,
  getPreparedChatAnswer,
  isTrustedChatHref,
  preparedAnswers,
  suggestions,
  type ChatMessage,
  type ChatSource,
} from "../src/lib/chat";
import { readChatStream } from "../src/lib/chat-stream";
import { openSource, talks, work } from "../src/lib/content";

loadEnvConfig(process.cwd());

// Run explicitly: this exercises the configured provider and can incur API usage.
// The deployed endpoint receives public questions only, never a local API key.
const base = new URL(process.env.CHAT_TEST_URL ?? "http://127.0.0.1:3005");
const production = base.href === "https://mitchelcarson.com/";
const local = ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)
  && ["http:", "https:"].includes(base.protocol)
  && !base.username && !base.password && base.pathname === "/" && !base.search && !base.hash;
if (!local && !production) {
  throw new Error("Live tests must target localhost or exactly https://mitchelcarson.com.");
}
if (local && !process.env.OPENAI_API_KEY?.trim()) {
  console.error("Add OPENAI_API_KEY to .env.local and restart the local server before running live tests.");
  process.exit(2);
}
if (local && process.env.OPENAI_BASE_URL) {
  throw new Error("Remove OPENAI_BASE_URL and restart the server so these tests use OpenAI directly.");
}

// Target a later case while debugging; production/default runs still cover all nine.
const startAtValue = process.env.CHAT_TEST_START_AT ?? "1";
if (!/^[1-9]$/.test(startAtValue) || startAtValue === "6") {
  throw new Error("CHAT_TEST_START_AT must be 1–5 or 7–9. Case 6 needs the case 5 conversation; start at 5 to test that follow-up.");
}
const startAt = Number(startAtValue);
const requestStarts: number[] = [];
const skippedCases: number[] = [];
let caseNumber = 0;
let httpRequests = 0;
let completedAnswers = 0;
let passedChecks = 0;

async function pause(milliseconds: number, reason: string) {
  console.log(JSON.stringify({ waitingMs: Math.ceil(milliseconds), reason }));
  // Keep each wait bounded even if the server sends a long Retry-After date.
  for (let remaining = milliseconds; remaining > 0; remaining -= 60_000) {
    await delay(Math.min(remaining, 60_000));
  }
}

async function paceRequests() {
  const now = Date.now();
  while (requestStarts.length && requestStarts[0] <= now - 60_000) requestStarts.shift();
  // Leave one request of headroom under the endpoint's eight-per-minute backstop.
  if (requestStarts.length >= 7) {
    await pause(Math.max(1, requestStarts[0] + 60_100 - now), "Pacing live questions");
    return paceRequests();
  }
  requestStarts.push(Date.now());
}

function retryAfterMs(value: string | null): number {
  if (value !== null && value.trim() && Number.isFinite(Number(value))) return Math.max(0, Number(value) * 1_000);
  const timestamp = value ? Date.parse(value) : NaN;
  return Number.isFinite(timestamp) ? Math.max(0, timestamp - Date.now()) : 60_000;
}

async function requestAnswer(messages: ChatMessage[]): Promise<{ response: Response; started: number }> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await paceRequests();
    const started = performance.now();
    httpRequests += 1;
    const response = await fetch(new URL("/api/chat", base), {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: base.origin },
      body: JSON.stringify({ messages }),
      redirect: "error",
      signal: AbortSignal.timeout(35_000),
    });
    if (response.status !== 429 || attempt === 1) return { response, started };
    const wait = retryAfterMs(response.headers.get("retry-after"));
    await response.body?.cancel();
    await pause(wait, "Rate limited; honoring Retry-After once");
  }
  throw new Error("No chat response received.");
}

async function answer(messages: ChatMessage[]) {
  assert.equal(getPreparedChatAnswer(messages.at(-1)!.content), undefined, "Live tests must use custom questions rather than prepared answers.");
  assert.ok(messages.at(-1)!.content.length <= CHAT_MAX_MESSAGE_LENGTH, "The live question must fit the public input limit.");
  const { response, started } = await requestAnswer(messages);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(`Chat returned ${response.status}: ${body?.error ?? "Request failed"}`);
  }
  assert.notEqual(response.headers.get("x-chat-answer-type"), "prepared", "A prepared answer cannot establish live provider access.");
  assert.match(response.headers.get("content-type") ?? "", /text\/event-stream/i);
  assert.ok(response.body, "The response must have a streaming body.");
  let text = "";
  let deltas = 0;
  let firstTextMs = 0;
  let sources: ChatSource[] = [];
  await readChatStream(response.body, (event) => {
    if (event.type === "delta") {
      if (!deltas) firstTextMs = Math.round(performance.now() - started);
      deltas += 1;
      text += event.text;
    }
    if (event.type === "sources") sources = event.sources;
  });
  completedAnswers += 1;
  assert.ok(text.trim(), "OpenAI must return a nonempty completed answer.");
  assert.ok(deltas > 1, "The answer should arrive in multiple text deltas.");
  assert.ok(sources.length > 0 && sources.every((source) => isTrustedChatHref(source.href)), "Source chips must point to exact published destinations.");
  const linkedHrefs: string[] = [];
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    assert.ok(isTrustedChatHref(match[1]), `Unknown answer link: ${match[1]}`);
    const publishedSource = getChatSource(match[1]);
    assert.ok(publishedSource, `Unknown answer destination: ${match[1]}`);
    linkedHrefs.push(publishedSource.href);
  }
  return { text, deltas, sources, linkedHrefs, firstTextMs, totalMs: Math.round(performance.now() - started) };
}

type Answer = Awaited<ReturnType<typeof answer>>;

function hasDestination(result: Answer, href: string) {
  assert.ok(result.linkedHrefs.includes(href) || result.sources.some((source) => source.href === href), `Missing public destination: ${href}`);
}

function normalized(text: string) {
  return text.normalize("NFKC").replace(/[\u2010-\u2015\u2212]/g, "-").replace(/[\u2018\u2019]/g, "'");
}

function naturalVoice(result: Answer, short = false) {
  assert.doesNotMatch(result.text, /(?:the|his|Mitchel[’']s)\s+(?:public\s+)?(?:profile|portfolio)\s+(?:says|reports|lists|describes|does(?:n[’']t| not)\s+(?:say|describe|list))|according to (?:the |his )?(?:profile|portfolio)|based on (?:the )?(?:provided|supplied) (?:profile|context)|as an AI(?: language model)?/i,
    "Answers should speak directly rather than narrating the supplied profile.");
  if (short) assert.ok(result.text.trim().split(/\s+/).length <= 120, "A simple question should get a short answer.");
}

async function check(name: string, messages: ChatMessage[], validate: (result: Answer) => void) {
  caseNumber += 1;
  if (caseNumber < startAt) {
    skippedCases.push(caseNumber);
    console.log(JSON.stringify({ check: name, case: caseNumber, skipped: true }));
    return undefined;
  }
  const result = await answer(messages);
  // Always print the answer before semantic checks so failures remain inspectable.
  console.log(JSON.stringify({ check: name, case: caseNumber, ...result }));
  try {
    naturalVoice(result);
    validate(result);
  } catch (cause) {
    throw new Error(`${name}: ${cause instanceof Error ? cause.message : "Answer validation failed"}`);
  }
  passedChecks += 1;
  return result;
}

function question(content: string): ChatMessage[] {
  return [{ role: "user", content }];
}

function repository(name: string) {
  const entry = openSource.find((item) => item.name === name);
  assert.ok(entry, `Missing published repository: ${name}`);
  return entry.url;
}

async function main() {
  // These checks are offline: suggestions must remain curated and free of provider calls.
  assert.equal(preparedAnswers.length, suggestions.length);
  for (const [index, prepared] of preparedAnswers.entries()) {
    assert.equal(prepared.question, suggestions[index].question);
    assert.equal(getPreparedChatAnswer(`  ${prepared.question.toUpperCase()}  `), prepared);
    assert.equal(getPreparedChatAnswer(`${prepared.question} Tell me more about the implementation.`), undefined);
    assert.ok(prepared.sources.length > 0 && prepared.sources.every((source) => isTrustedChatHref(source.href)));
  }
  console.log(JSON.stringify({ check: "Prepared exact matches — offline", count: preparedAnswers.length, target: base.origin }));

  await check("GreenSpace client work and live site", question("What did Mitchel do for GreenSpace Lawn Care? Can I see the site?"), (result) => {
    assert.match(result.text, /GreenSpace/i);
    assert.match(result.text, /website|web site/i);
    assert.match(result.text, /built|launch|deliver|develop/i);
    assert.match(result.text, /social media/i);
    hasDestination(result, work.greenspace.href);
    naturalVoice(result, true);
  });

  await check("Smaller open-source projects and repository links", question("What are MazeApp and Bayesian_Network, and how do they differ from HYDRA? Link their code."), (result) => {
    assert.match(result.text, /MazeApp/i);
    assert.match(result.text, /maze|A\s*\*|A[- ]star|DFS/i);
    assert.match(result.text, /Bayesian/i);
    assert.match(normalized(result.text), /D[- ]?separation|inference|probabilistic/i);
    assert.match(result.text, /HYDRA|forecast|hydrolog|research/i);
    hasDestination(result, repository("MazeApp"));
    hasDestination(result, repository("Bayesian_Network"));
  });

  await check("Portfolio implementation and custom versus prepared answers", question("How was this portfolio website built, and do all AI guide questions call OpenAI?"), (result) => {
    assert.match(result.text, /Next\.?js/i);
    assert.match(result.text, /React/i);
    assert.match(result.text, /Tailwind/i);
    assert.match(result.text, /OpenAI/i);
    assert.match(result.text, /prepared|curated|suggested/i);
    assert.match(result.text, /custom|typed|free[- ]form/i);
    hasDestination(result, repository("Portfolio"));
  });

  await check("Overview covers research, industry, systems, client work and open source", question("Give me a quick overview of all his project groups, including client work, smaller open-source projects, and this website."), (result) => {
    for (const name of ["HYDRA", "USAA", "Harmony", "GreenSpace"]) assert.match(result.text, new RegExp(name, "i"));
    assert.match(result.text, /portfolio|this (?:site|website)/i);
    assert.match(normalized(result.text), /open[- ]source|coursework|MazeApp|Bayesian/i);
    assert.match(result.text, /GraphQL|API|Java|Spring/i);
    hasDestination(result, "/projects");
  });

  const hydraQuestion: ChatMessage = {
    role: "user",
    content: "What has HYDRA's DirectFlow study actually evaluated so far? Name the four model families, distinguish saved-checkpoint assessment from completed research, and explain the H1–18 forecast target versus H1–16 matched NWM coverage. Link to the research.",
  };
  const hydra = await check("Current HYDRA assessment, model families and separate forecast coverage", [hydraQuestion], (result) => {
    const text = normalized(result.text);
    assert.match(text, /LSTM|long[- ]short[- ]term memory/i);
    assert.match(text, /Transformer/i);
    assert.match(text, /GRU[-\s+/]*Transformer|Transformer[-\s+/]*GRU/i);
    assert.match(text, /Mamba\s*-?\s*2[-\s+/]*Transformer|Transformer[-\s+/]*Mamba\s*-?\s*2/i);
    assert.match(text, /saved[\s\S]{0,30}(?:checkpoint|model)|checkpoint[\s\S]{0,40}(?:assess|evaluat)|assess[\s\S]{0,40}checkpoint/i);
    assert.match(text, /(?:H\s*)?1\s*(?:-|to|through)\s*(?:H\s*)?18/i);
    assert.match(text, /(?:H\s*)?1\s*(?:-|to|through)\s*(?:H\s*)?16/i);
    assert.match(text, /NWM|National Water Model/i);
    assert.match(text, /ongoing|in progress|not (?:yet )?(?:complete|final)|not a completed|not complete|incomplete|review.*continue|preparation.*continue|not.*research is finished/i);
    hasDestination(result, "/research");
  });

  await check("Follow-up rejects a blanket 48% improvement", [
    hydraQuestion,
    // Empty only when starting at 7–9, when this entire case is skipped before any request.
    { role: "assistant", content: hydra?.text.slice(0, 1_800) ?? "" },
    { role: "user", content: "So did HYDRA beat NWM everywhere by 48%?" },
  ], (result) => {
    const text = normalized(result.text);
    assert.match(text, /\bno\b|\bnot\b|cannot|can't|doesn't|unsupported|hasn't|has not/i);
    assert.match(text, /mixed|var(?:y|ie|ied)|site|gauge|lead|blanket|everywhere|across all/i);
    hasDestination(result, "/projects/hydra-temporal");
    naturalVoice(result, true);
  });

  await check("Harmony LLM nodes advise and require human approval", question("Can Harmony's LLM nodes execute financial actions on their own?"), (result) => {
    const text = normalized(result.text);
    assert.match(text, /\bno\b|cannot|can't|never|not allowed/i);
    assert.match(text, /advis|review|flag|veto/i);
    assert.match(text, /human|person|approval/i);
    hasDestination(result, "/projects/harmony");
    naturalVoice(result, true);
  });

  await check("AGU26 upcoming presentations, dates and official programs", question("What is Mitchel presenting at AGU26, and on what dates? Include the official program links."), (result) => {
    const text = normalized(result.text);
    assert.match(text, /workshop/i);
    assert.match(text, /poster/i);
    assert.match(text, /December\s+6\b|\b6\s+December|Dec\.?\s+6\b/i);
    assert.match(text, /December\s+11\b|\b11\s+December|Dec\.?\s+11\b/i);
    assert.match(text, /2026/);
    assert.match(text, /accepted|upcoming|scheduled|present(?:ing|er)|will\b/i);
    for (const id of ["agu26-workshop", "agu26-poster"]) {
      const program = talks.find((talk) => talk.id === id)?.links?.find((link) => link.href.startsWith("https://studio.m-anage.com/"));
      assert.ok(program, `Missing official program link for ${id}`);
      hasDestination(result, program.href);
    }
  });

  await check("ML systems labs demonstrate bounded synthetic checks, not production performance", question("What do quantized-linear-inference-lab, batch-inference-contract-guard, and agent-replay-bench demonstrate? Are these production performance benchmarks? Link the projects."), (result) => {
    const text = normalized(result.text);
    for (const name of ["quantized-linear-inference-lab", "batch-inference-contract-guard", "agent-replay-bench"]) {
      assert.ok(text.toLowerCase().includes(name), `Missing ML systems lab: ${name}`);
      hasDestination(result, repository(name));
    }
    assert.match(text, /int[- ]?8|8[- ]bit|per[- ]tensor|per[- ](?:output[- ])?row/i);
    assert.match(text, /prediction[- ]?ID|score[- ]?vector|correspondence|missing|duplicate|mismatch/i);
    assert.match(text, /deterministic|offline|toy tools|trace/i);
    assert.match(text, /synthetic|toy|fixture/i);
    assert.match(text, /(?:not|no|do not|does not|doesn't|cannot|can't|rather than)[\s\S]{0,120}(?:production|speed|performance|reliability|trained[- ]model)/i);
    assert.doesNotMatch(text, /\b\d+(?:\.\d+)?\s*(?:x|×|times)\s*(?:faster|speed[- ]?up)|\b\d+(?:\.\d+)?\s*%\s*(?:faster|speed|latency|throughput|performance)/i,
      "Synthetic lab checks do not establish a numerical production speedup.");
  });

  console.log(JSON.stringify({ status: "passed", totalCases: caseNumber, httpRequests, completedAnswers, passedChecks, skippedCases }));
  console.log("Review the printed answers for factual grounding, natural phrasing, and repeated caveats; automated checks do not replace semantic review.");
}

main().catch((error: unknown) => {
  console.error(JSON.stringify({ status: "failed", httpRequests, completedAnswers, passedChecks, skippedCases }));
  console.error(error instanceof Error ? error.message : "Live chat test failed.");
  process.exitCode = 1;
});
