"use client";

import { ArrowRight, ArrowUp, MessageCircle, RotateCcw, Square } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { CHAT_MAX_MESSAGE_LENGTH, getChatSource, getPreparedChatAnswer, isTrustedChatHref, suggestedQuestions, type ChatMessage, type ChatSource } from "@/lib/chat";
import { readChatStream } from "@/lib/chat-stream";

type Message = ChatMessage & {
  id: number;
  status: "complete" | "streaming" | "error" | "stopped";
  sources?: ChatSource[];
  answerType?: "prepared" | "openai";
};

function Answer({ text }: { text: string }) {
  return text.split(/\n\s*\n/).map((paragraph, index) => {
    const parts: ReactNode[] = [];
    const pattern = /\[([^\]\n]{1,120})\]\(([^\s)]+)\)|\*\*([^*\n]+)\*\*/g;
    let start = 0;
    for (const match of paragraph.matchAll(pattern)) {
      parts.push(paragraph.slice(start, match.index));
      if (match[3]) {
        parts.push(<strong key={match.index} className="font-semibold">{match[3]}</strong>);
      } else if (isTrustedChatHref(match[2])) {
        parts.push(<Link key={match.index} href={match[2]} className="link-text text-primary">{match[1]}</Link>);
      } else {
        parts.push(match[1]);
      }
      start = match.index! + match[0].length;
    }
    parts.push(paragraph.slice(start));
    return <p key={index} className="whitespace-pre-wrap break-words">{parts}</p>;
  });
}

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

export function PortfolioChat() {
  const id = useId();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const request = useRef<AbortController | null>(null);
  const nextId = useRef(0);
  const transcript = useRef<HTMLDivElement>(null);
  const follow = useRef(true);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    const element = transcript.current;
    if (element && follow.current) element.scrollTop = element.scrollHeight;
  }, [messages]);

  async function ask(value: string, retry = false) {
    const text = value.trim();
    if (!text || text.length > CHAT_MAX_MESSAGE_LENGTH || request.current) return;
    const base = retry ? messages.slice(0, -2) : messages;
    const prepared = getPreparedChatAnswer(text);
    if (prepared) {
      const userId = nextId.current++;
      const answerId = nextId.current++;
      setMessages((current) => [...(retry ? current.slice(0, -2) : current),
        { id: userId, role: "user", content: text, status: "complete" },
        { id: answerId, role: "assistant", content: prepared.content, sources: prepared.sources, status: "complete", answerType: "prepared" },
      ]);
      setQuestion("");
      setError("");
      setAnnouncement("Prepared answer complete. Related portfolio links are available below the answer.");
      follow.current = true;
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    const userId = nextId.current++;
    const answerId = nextId.current++;
    setMessages([...base, { id: userId, role: "user", content: text, status: "complete" }, { id: answerId, role: "assistant", content: "", status: "streaming", answerType: "openai" }]);
    setQuestion("");
    setError("");
    setBusy(true);
    setAnnouncement("Preparing an answer.");
    follow.current = true;

    function update(patch: Partial<Message> | ((message: Message) => Partial<Message>)) {
      setMessages((current) => current.map((message) => message.id === answerId ? { ...message, ...(typeof patch === "function" ? patch(message) : patch) } : message));
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
        throw new Error(typeof data?.error === "string" ? data.error : "Chat is temporarily unavailable. Please try again shortly.");
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
      setAnnouncement("Answer complete. Related project links are available below the answer.");
    } catch (cause) {
      if (controller.signal.aborted) {
        update({ status: "stopped" });
        setAnnouncement("Answer stopped.");
      } else {
        const message = cause instanceof Error ? cause.message : "Something went wrong. Please try again.";
        setError(message);
        update({ status: "error" });
        setAnnouncement(message);
      }
    } finally {
      if (request.current === controller) request.current = null;
      setBusy(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void ask(question);
  }

  function reset() {
    if (request.current) return;
    setMessages([]);
    setError("");
    setAnnouncement("Conversation cleared.");
    input.current?.focus();
  }

  const last = messages.at(-1);
  const canRetry = last?.status === "error" || last?.status === "stopped";

  return (
    <section id="ask-mitchel" aria-labelledby={`${id}-title`} className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_8px_40px_-24px_rgba(15,27,45,0.35)]">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-7">
        <div>
          <p className="mono-label mb-2 flex items-center gap-2 text-primary"><MessageCircle aria-hidden="true" className="h-3.5 w-3.5" /> A different way to explore</p>
          <h2 id={`${id}-title`} className="font-serif text-[1.9rem] leading-tight tracking-tight sm:text-[2.15rem]">Ask about Mitchel<span className="text-primary">.</span></h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">The projects, the research, and the path between them. Pick a question or ask your own.</p>
        </div>
        {messages.length > 0 ? <button type="button" onClick={reset} disabled={busy} className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded px-2 py-2 text-xs text-muted-foreground transition hover:bg-surface hover:text-foreground disabled:opacity-40" aria-label="Clear conversation"><RotateCcw aria-hidden="true" className="h-3.5 w-3.5" /><span className="hidden sm:inline">Reset</span></button> : <span className="mono-label mt-1 hidden shrink-0 items-center gap-2 text-muted-foreground sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" /> Portfolio guide</span>}
      </div>

      {messages.length > 0 ? (
        <div ref={transcript} role="log" aria-live="off" aria-label="Conversation with Mitchel’s portfolio guide" aria-busy={busy} tabIndex={0} onScroll={() => { const element = transcript.current; if (element) follow.current = element.scrollHeight - element.scrollTop - element.clientHeight < 64; }} className="max-h-[24rem] space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
          {messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "ml-auto max-w-[92%] rounded-lg border border-border bg-surface px-4 py-3 sm:max-w-[80%]" : "max-w-3xl"}>
              <p className="mono-label mb-2 text-[10px] text-muted-foreground">{message.role === "user" ? "You" : message.answerType === "prepared" ? "Prepared answer" : "OpenAI"}</p>
              <div className="space-y-3 text-[15px] leading-relaxed text-foreground sm:text-base">
                {message.content ? <Answer text={message.content} /> : message.status === "streaming" ? <p className="flex items-center gap-2 text-muted-foreground"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none" /> Looking through the portfolio…</p> : <p className="text-muted-foreground">{message.status === "stopped" ? "Answer stopped." : "You can still explore the projects below."}</p>}
              </div>
              {message.sources?.length ? <div className="mt-4 flex flex-wrap gap-2">{message.sources.map((source) => <Link key={source.href} href={source.href} className="inline-flex items-center gap-2 rounded border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary hover:text-primary">{source.title}<ArrowRight aria-hidden="true" className="h-3 w-3" /></Link>)}</div> : null}
              {message.status === "stopped" && message.content ? <p className="mt-2 text-xs text-muted-foreground">Stopped before completion.</p> : null}
              {message.status === "error" && message.content ? <p className="mt-2 text-xs text-muted-foreground">This answer is incomplete.</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="px-5 pt-5 sm:px-7">
        <div className="grid gap-2 sm:grid-cols-2">
          {suggestedQuestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void ask(suggestion)} disabled={busy} className="group flex items-center justify-between gap-3 rounded border border-border bg-background/60 px-3.5 py-3 text-left text-sm text-muted-foreground transition hover:border-primary/50 hover:bg-surface hover:text-foreground disabled:cursor-wait disabled:opacity-50">{suggestion}<ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" /></button>)}
        </div>
      </div>

      {error ? <div role="alert" className="mx-5 mt-4 rounded border border-primary/25 bg-primary/5 px-4 py-3 text-sm leading-relaxed sm:mx-7"><p>{error}</p><div className="mt-2 flex flex-wrap items-center gap-4">{canRetry ? <button type="button" disabled={busy} onClick={() => void ask(messages.at(-2)?.content ?? "", true)} className="link-text font-medium text-primary">Try again</button> : null}<Link href="/projects" className="link-text text-primary">Explore projects</Link><Link href="/contact" className="link-text text-primary">Contact Mitchel</Link></div></div> : null}

      {!error && last?.status === "stopped" ? <div className="px-5 pt-4 sm:px-7"><button type="button" disabled={busy} onClick={() => void ask(messages.at(-2)?.content ?? "", true)} className="link-text text-sm font-medium text-primary">Try again</button></div> : null}

      <form onSubmit={submit} className="px-5 pb-4 pt-4 sm:px-7">
        <label htmlFor={`${id}-input`} className="sr-only">Your question about Mitchel</label>
        <div className="flex items-end gap-3 rounded-md border border-input bg-background px-3 py-2 transition focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <textarea ref={input} id={`${id}-input`} value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void ask(question); } }} maxLength={CHAT_MAX_MESSAGE_LENGTH} rows={1} placeholder="Ask about my work, research, or experience…" aria-describedby={`${id}-note`} className="max-h-32 min-h-10 flex-1 resize-y bg-transparent py-2 text-base leading-6 outline-none placeholder:text-muted-foreground focus-visible:outline-none" />
          {busy ? <button type="button" onClick={() => request.current?.abort()} aria-label="Stop answer" className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground transition hover:bg-primary-hover"><Square aria-hidden="true" className="h-3.5 w-3.5 fill-current" /></button> : <button type="submit" disabled={!question.trim()} aria-label="Send question" className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-35"><ArrowUp aria-hidden="true" className="h-5 w-5" /></button>}
        </div>
        <p id={`${id}-note`} className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[11px] leading-relaxed text-muted-foreground"><span>Suggested questions use prepared answers. Custom questions are sent to OpenAI.</span><span>History stays in this tab.</span></p>
      </form>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
