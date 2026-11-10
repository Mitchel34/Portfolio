"use client";

import { ArrowRight, ArrowUp, RotateCcw, Square } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import {
  CHAT_MAX_MESSAGE_LENGTH,
  getChatSource,
  getInlineChatHrefs,
  getPreparedChatAnswer,
  getUnlinkedChatSources,
  parseChatAnswer,
  suggestions,
  type ChatMessage,
  type ChatSource,
} from "@/lib/chat";
import { readChatStream } from "@/lib/chat-stream";
import { guide } from "@/lib/content";
import { cn } from "@/lib/utils";

type Message = ChatMessage & {
  id: number;
  status: "complete" | "streaming" | "error" | "stopped";
  sources?: ChatSource[];
  answerType?: "prepared" | "openai";
  /** Why the answer failed, shown with a retry beside the answer it belongs to. */
  error?: string;
};

type Exchange = { question: Message; answer: Message };

const COUNTER_THRESHOLD = CHAT_MAX_MESSAGE_LENGTH - 100;

const inlineLinkClass = "link-text text-primary decoration-primary/50 hover:decoration-primary";
const actionClass =
  "link-text inline-flex min-h-8 items-center gap-1.5 font-medium text-foreground hover:text-primary hover:decoration-primary";

/** Only send completed question/answer pairs back to the provider. */
function historyFor(messages: Message[]): ChatMessage[] {
  const history: ChatMessage[] = [];
  for (let index = 0; index < messages.length - 1; index += 2) {
    const user = messages[index];
    const assistant = messages[index + 1];
    if (user.role === "user" && assistant.role === "assistant" && assistant.status === "complete" && assistant.content) {
      history.push({ role: "user", content: user.content }, { role: "assistant", content: assistant.content.slice(0, 1800) });
    }
  }
  return history.slice(-8);
}

function toExchanges(messages: Message[]): Exchange[] {
  const exchanges: Exchange[] = [];
  for (let index = 0; index < messages.length - 1; index += 2) {
    exchanges.push({ question: messages[index], answer: messages[index + 1] });
  }
  return exchanges;
}

function AnswerText({ text, streaming }: { text: string; streaming: boolean }) {
  const paragraphs = parseChatAnswer(text, { streaming });
  return paragraphs.map((segments, index) => (
    <p
      key={index}
      className={cn("whitespace-pre-wrap break-words", streaming && index === paragraphs.length - 1 && "guide-caret")}
    >
      {segments.map((segment, position) => {
        if (segment.type === "link") {
          return (
            <Link key={position} href={segment.href} className={inlineLinkClass}>
              {segment.text}
            </Link>
          );
        }
        if (segment.type === "strong") {
          return (
            <strong key={position} className="font-semibold">
              {segment.text}
            </strong>
          );
        }
        return segment.text;
      })}
    </p>
  ));
}

export function PortfolioChat() {
  const id = useId();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const request = useRef<AbortController | null>(null);
  const nextId = useRef(0);
  const panel = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const latest = useRef<HTMLLIElement>(null);
  /** Set when a question came from a button that is about to leave the page. */
  const focusAnswer = useRef(false);

  useEffect(() => () => request.current?.abort(), []);

  const latestQuestionId = messages.at(-2)?.id;
  useEffect(() => {
    if (latestQuestionId === undefined) return;
    // The newest answer always opens directly under the question box. Bring that
    // spot back into view when the question was asked from further down the page.
    const box = form.current?.getBoundingClientRect();
    if (box && (box.top < 72 || box.bottom > window.innerHeight)) {
      panel.current?.scrollIntoView({ block: "start" });
    }
    if (focusAnswer.current) {
      focusAnswer.current = false;
      latest.current?.focus({ preventScroll: true });
    }
  }, [latestQuestionId]);

  async function ask(value: string, options: { retry?: boolean; fromButton?: boolean } = {}) {
    const text = value.trim();
    if (!text || text.length > CHAT_MAX_MESSAGE_LENGTH || request.current) return;
    const base = options.retry ? messages.slice(0, -2) : messages;
    const userId = nextId.current++;
    const answerId = nextId.current++;
    focusAnswer.current = Boolean(options.fromButton);
    setQuestion("");

    const prepared = getPreparedChatAnswer(text);
    if (prepared) {
      setMessages([
        ...base,
        { id: userId, role: "user", content: text, status: "complete" },
        { id: answerId, role: "assistant", content: prepared.content, sources: prepared.sources, status: "complete", answerType: "prepared" },
      ]);
      setAnnouncement("Prepared answer ready below the question box.");
      return;
    }

    const controller = new AbortController();
    request.current = controller;
    // A cleared conversation abandons its request; nothing from it may land afterwards.
    const current = () => request.current === controller;
    setMessages([
      ...base,
      { id: userId, role: "user", content: text, status: "complete" },
      { id: answerId, role: "assistant", content: "", status: "streaming", answerType: "openai" },
    ]);
    setBusy(true);
    setAnnouncement("Working on an answer.");

    function update(patch: Partial<Message> | ((message: Message) => Partial<Message>)) {
      if (!current()) return;
      setMessages((existing) =>
        existing.map((message) =>
          message.id === answerId ? { ...message, ...(typeof patch === "function" ? patch(message) : patch) } : message,
        ),
      );
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...historyFor(base), { role: "user", content: text }] }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(typeof data?.error === "string" ? data.error : "The AI guide is temporarily unavailable. Please try again shortly.");
      }
      if (!response.body) throw new Error("The answer could not be streamed. Please try again.");
      await readChatStream(response.body, (event) => {
        if (event.type === "delta") update((message) => ({ content: message.content + event.text }));
        if (event.type === "sources") {
          const sources = event.sources.flatMap((source) => {
            const trusted = getChatSource(source.href);
            return trusted ? [trusted] : [];
          });
          update({ sources });
        }
      });
      update({ status: "complete" });
      if (current()) setAnnouncement("Answer ready below the question box.");
    } catch (cause) {
      if (!current()) return;
      if (controller.signal.aborted) {
        update({ status: "stopped" });
        setAnnouncement("Answer stopped.");
      } else {
        // The alert beside the answer announces itself; the status line stays quiet.
        update({ status: "error", error: cause instanceof Error ? cause.message : "Something went wrong. Please try again." });
        setAnnouncement("");
      }
    } finally {
      if (current()) {
        request.current = null;
        setBusy(false);
      }
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void ask(question);
  }

  function stop() {
    request.current?.abort();
  }

  function reset() {
    const active = request.current;
    request.current = null;
    active?.abort();
    setBusy(false);
    setMessages([]);
    setQuestion("");
    setAnnouncement("Conversation cleared.");
    input.current?.focus();
  }

  function retry() {
    void ask(messages.at(-2)?.content ?? "", { retry: true, fromButton: true });
  }

  const exchanges = toExchanges(messages).reverse();
  const asked = new Set(messages.filter((message) => message.role === "user").map((message) => message.content));
  const remaining = suggestions.filter((suggestion) => !asked.has(suggestion.question));
  const hasConversation = exchanges.length > 0;
  const nearLimit = question.length >= COUNTER_THRESHOLD;

  return (
    <section
      ref={panel}
      id="ask-mitchel"
      aria-labelledby={`${id}-title`}
      className="sheet scroll-mt-24 rounded-[4px] border border-foreground bg-card"
    >
      <div className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mono-label flex items-center gap-2 text-primary">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-primary" />
              {guide.label}
            </p>
            <h2 id={`${id}-title`} className="mt-1.5 font-serif text-[1.625rem] leading-tight tracking-[-0.01em] text-foreground sm:text-[2rem]">
              {guide.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={reset}
            className={cn(
              "mono-label -mr-2 inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-[2px] px-2 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
              !hasConversation && "invisible",
            )}
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            Clear<span className="sr-only"> conversation</span>
          </button>
        </div>
        <p className="mt-1 text-footnote text-muted-foreground sm:mt-1.5">
          <span className="hidden sm:inline">{guide.intro.source} </span>
          {guide.intro.notLive}
        </p>

        <form ref={form} onSubmit={submit} className="mt-3 sm:mt-4">
          <label htmlFor={`${id}-input`} className="sr-only">
            Question for the AI guide
          </label>
          <div className="flex items-end gap-2 rounded-[4px] border border-input bg-background py-1 pr-1 pl-3.5 sm:py-1.5 sm:pr-1.5 transition-colors focus-within:border-foreground focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
            <textarea
              ref={input}
              id={`${id}-input`}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  void ask(question);
                }
              }}
              maxLength={CHAT_MAX_MESSAGE_LENGTH}
              rows={1}
              enterKeyHint="send"
              placeholder={guide.placeholder}
              aria-describedby={`${id}-note`}
              className="field-sizing-content max-h-36 min-h-11 flex-1 resize-none bg-transparent py-2.5 text-base leading-6 text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none"
            />
            {busy ? (
              <button
                type="button"
                onClick={stop}
                aria-label="Stop answer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-foreground text-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Square aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Send question"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-primary text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                <ArrowUp aria-hidden="true" className="h-5 w-5" />
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="min-h-[15.5rem] px-4 pt-3 sm:px-6">
        {hasConversation ? (
          <ol reversed aria-label="Answers, newest first" aria-busy={busy} className="divide-y divide-border">
            {exchanges.map(({ question: asking, answer }, index) => {
              const isLatest = index === 0;
              const streaming = answer.status === "streaming";
              const settled = !streaming && Boolean(answer.content);
              const related = settled ? getUnlinkedChatSources(answer.content, answer.sources) : [];
              const linked = new Set(getInlineChatHrefs(answer.content));

              return (
                <li
                  key={asking.id}
                  ref={isLatest ? latest : undefined}
                  tabIndex={isLatest ? -1 : undefined}
                  className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2 gap-y-2 py-4 outline-none first:pt-2"
                >
                  <span aria-hidden="true" className="mono-label pt-1 text-muted-foreground">Q</span>
                  <p className="font-serif text-[1.1875rem] leading-snug break-words text-foreground">
                    <span className="sr-only">You asked: </span>
                    {asking.content}
                  </p>

                  <span aria-hidden="true" className="mono-label pt-0.5 text-primary">A</span>
                  <div className="min-w-0">
                    <p className="mono-label text-[0.6875rem] text-muted-foreground">
                      {guide.label}
                      {answer.answerType === "prepared"
                        ? " · prepared answer"
                        : answer.content
                          ? " · generated by OpenAI"
                          : streaming
                            ? " · asking OpenAI"
                            : ""}
                    </p>
                    <div className="mt-2 space-y-3 text-body-sm text-foreground">
                      {answer.content ? (
                        <AnswerText text={answer.content} streaming={streaming} />
                      ) : streaming ? (
                        <p className="flex items-center gap-2.5 text-muted-foreground">
                          <span aria-hidden="true" className="guide-dots flex gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          </span>
                          Reading the site
                        </p>
                      ) : null}
                    </div>

                    {related.length ? (
                      <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-footnote">
                        <span className="mono-label text-muted-foreground">Related</span>
                        {related.map((source) => (
                          <Link key={source.href} href={source.href} className={actionClass}>
                            {source.title}
                            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                          </Link>
                        ))}
                      </p>
                    ) : null}

                    {answer.status === "stopped" ? (
                      <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-footnote text-muted-foreground">
                        {answer.content ? "Stopped before the answer finished." : "Stopped before the answer started."}
                        {isLatest ? (
                          <button type="button" onClick={retry} className={actionClass}>
                            Try again
                          </button>
                        ) : null}
                      </p>
                    ) : null}

                    {answer.status === "error" ? (
                      <div role="alert" className="mt-3 border-l-2 border-primary pl-3 text-footnote">
                        <p className="text-foreground">
                          {answer.content ? "This answer was cut off. " : ""}
                          {answer.error}
                        </p>
                        <p className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          {isLatest ? (
                            <button type="button" onClick={retry} className={actionClass}>
                              Try again
                            </button>
                          ) : null}
                          {linked.has("/projects") ? null : (
                            <Link href="/projects" className={actionClass}>
                              Browse the projects
                            </Link>
                          )}
                          {linked.has("/contact") ? null : (
                            <Link href="/contact" className={actionClass}>
                              Contact Mitchel
                            </Link>
                          )}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <ul aria-label="Suggested questions" className="divide-y divide-border border-y border-border">
            {suggestions.map((suggestion) => (
              <li key={suggestion.question}>
                <button
                  type="button"
                  onClick={() => void ask(suggestion.question, { fromButton: true })}
                  className="group flex min-h-11 w-full items-center gap-3 py-2 text-left text-body-sm text-foreground transition-colors hover:text-primary"
                >
                  <span className="mono-label hidden w-24 shrink-0 text-muted-foreground transition-colors group-hover:text-primary sm:block">
                    {suggestion.topic}
                  </span>
                  <span className="flex-1">{suggestion.question}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasConversation && remaining.length ? (
        <div className="border-t border-border px-4 py-3 sm:px-6">
          <p className="mono-label text-muted-foreground" id={`${id}-next`}>Ask next</p>
          <ul aria-labelledby={`${id}-next`} className="mt-2 flex flex-wrap gap-2">
            {remaining.map((suggestion) => (
              <li key={suggestion.question}>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void ask(suggestion.question, { fromButton: true })}
                  className="inline-flex min-h-9 items-center rounded-[2px] border border-border px-3 text-left text-footnote text-foreground transition-colors hover:border-foreground hover:bg-surface disabled:cursor-wait disabled:opacity-50"
                >
                  {suggestion.question}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p
        id={`${id}-note`}
        className="border-t border-border px-4 py-3 text-[0.75rem] leading-relaxed text-muted-foreground sm:px-6"
      >
        {guide.privacy}
        {nearLimit ? (
          <span className="mono-label ml-2 whitespace-nowrap text-foreground">
            {question.length}/{CHAT_MAX_MESSAGE_LENGTH}
          </span>
        ) : null}
      </p>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
