import assert from "node:assert/strict";
import test from "node:test";

import { readChatStream } from "../src/lib/chat-stream";
import type { ChatStreamEvent } from "../src/lib/chat";

function chunked(text: string, size = 1) {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (let offset = 0; offset < bytes.length; offset += size) controller.enqueue(bytes.slice(offset, offset + size));
      controller.close();
    },
  });
}

test("SSE survives byte-sized UTF-8 chunks, CRLF frames, and comments", async () => {
  const events: ChatStreamEvent[] = [];
  await readChatStream(chunked(': keepalive\r\n\r\ndata: {"type":"delta","text":"Résumé 🌊"}\r\n\r\ndata: {"type":"done"}\r\n\r\n'), (event) => events.push(event));
  assert.deepEqual(events, [{ type: "delta", text: "Résumé 🌊" }, { type: "done" }]);
});

test("unexpected EOF cannot masquerade as a complete answer", async () => {
  await assert.rejects(readChatStream(chunked('data: {"type":"delta","text":"Partial"}\n\n'), () => {}), /before the answer finished/);
});

test("provider error is surfaced even after partial answer text", async () => {
  await assert.rejects(readChatStream(chunked('data: {"type":"delta","text":"Partial"}\n\ndata: {"type":"error","message":"Please retry."}\n\n', 13), () => {}), /Please retry/);
});

test("malformed stream payload is rejected", async () => {
  await assert.rejects(readChatStream(chunked('data: {"type":"delta","text":42}\n\n'), () => {}), /Invalid chat response/);
});

test("consumer failure cancels the network reader", async () => {
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) { controller.enqueue(new TextEncoder().encode('data: {"type":"delta","text":"Hello"}\n\n')); },
    cancel() { cancelled = true; },
  });
  await assert.rejects(readChatStream(stream, () => { throw new Error("Consumer stopped"); }), /Consumer stopped/);
  assert.equal(cancelled, true);
});
