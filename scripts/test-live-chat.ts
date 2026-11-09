import assert from "node:assert/strict";
import { loadEnvConfig } from "@next/env";

import { getPreparedChatAnswer, isTrustedChatHref, type ChatMessage, type ChatSource } from "../src/lib/chat";
import { readChatStream } from "../src/lib/chat-stream";

loadEnvConfig(process.cwd());

// Run explicitly: this exercises the configured provider and can incur API usage.
// Credentials are read by the local server and are never sent to this endpoint.
const base = new URL(process.env.CHAT_TEST_URL ?? "http://127.0.0.1:3005");
if (!["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)) {
  throw new Error("Live smoke tests must target a local portfolio server.");
}
if (!process.env.OPENAI_API_KEY?.trim()) {
  console.error("Add OPENAI_API_KEY to .env.local and restart the local server before running live tests.");
  process.exit(2);
}
if (process.env.OPENAI_BASE_URL) {
  throw new Error("Remove OPENAI_BASE_URL and restart the server so these tests use OpenAI directly.");
}

async function answer(messages: ChatMessage[]) {
  assert.equal(getPreparedChatAnswer(messages.at(-1)!.content), undefined, "Live tests must use custom questions rather than prepared answers.");
  const started = performance.now();
  const response = await fetch(new URL("/api/chat", base), {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: base.origin },
    body: JSON.stringify({ messages }),
    signal: AbortSignal.timeout(35_000),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(`Chat returned ${response.status}: ${body?.error ?? "Request failed"}`);
  }
  assert.notEqual(response.headers.get("x-chat-answer-type"), "prepared", "A prepared answer cannot establish live provider access.");
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
  assert.ok(text.trim(), "OpenAI must return a nonempty completed answer.");
  assert.ok(deltas > 1, "The answer should arrive in multiple text deltas.");
  assert.ok(sources.length > 0 && sources.every((source) => isTrustedChatHref(source.href)), "Source chips must point to known portfolio pages.");
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    assert.ok(isTrustedChatHref(match[1]), `Unknown answer link: ${match[1]}`);
  }
  return { text, deltas, sources, firstTextMs, totalMs: Math.round(performance.now() - started) };
}

async function main() {
  const firstQuestion: ChatMessage = { role: "user", content: "What is HYDRA, what is its current research status, and where can I read its case study?" };
  const first = await answer([firstQuestion]);
  assert.match(first.text, /research|forecast/i);
  assert.match(first.text, /pending|in progress|ongoing|not yet/i);
  assert.ok(first.sources.some((source) => source.href === "/projects/hydra-temporal"));
  console.log(JSON.stringify({ check: "HYDRA status and project link", ...first }, null, 2));

  const followup = await answer([
    firstQuestion,
    { role: "assistant", content: first.text.slice(0, 1800) },
    { role: "user", content: "Does that mean he has already demonstrated a 48% improvement?" },
  ]);
  // Semantic review of this answer is still required; metadata confirms stream completion.
  console.log(JSON.stringify({ check: "Follow-up corrects unsupported performance premise — review answer", ...followup }, null, 2));

  const usaa = await answer([{ role: "user", content: "What did Mitchel build at USAA? Include a link." }]);
  assert.match(usaa.text, /GraphQL/i);
  assert.match(usaa.text, /Java|Spring/i);
  assert.ok(usaa.sources.some((source) => source.href === "/projects/usaa-risk-services"));
  console.log(JSON.stringify({ check: "USAA experience and project link", ...usaa }, null, 2));
  console.log("All three live requests completed; review the public answer text above for factual grounding.");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Live chat test failed.");
  process.exitCode = 1;
});
