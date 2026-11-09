import type { ChatStreamEvent } from "./chat";

/** Parse SSE across arbitrary network/UTF-8 boundaries, including CRLF frames. */
export async function readChatStream(
  body: ReadableStream<Uint8Array>,
  onEvent: (event: ChatStreamEvent) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  function consume(frame: string) {
    const data = frame.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
    if (!data) return;
    const event = JSON.parse(data) as ChatStreamEvent;
    if (!event || typeof event !== "object" || !("type" in event)) throw new Error("Invalid chat response.");
    if (event.type === "delta" && typeof event.text !== "string") throw new Error("Invalid chat response.");
    if (event.type === "error") throw new Error(event.message || "The answer was interrupted. Please try again.");
    if (event.type === "done") done = true;
    onEvent(event);
  }

  try {
    while (true) {
      const chunk = await reader.read();
      buffer += decoder.decode(chunk.value, { stream: !chunk.done });
      let boundary: RegExpExecArray | null;
      while ((boundary = /\r?\n\r?\n/.exec(buffer))) {
        consume(buffer.slice(0, boundary.index));
        buffer = buffer.slice(boundary.index + boundary[0].length);
      }
      if (chunk.done) break;
      if (buffer.length > 64_000) throw new Error("The chat response was too large.");
    }
    if (buffer.trim()) consume(buffer);
    if (!done) throw new Error("The connection ended before the answer finished. Please try again.");
  } finally {
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
