import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTACT_LIMITS,
  createContactHandler,
  createContactRateLimiter,
  type ContactEmail,
} from "../src/lib/contact-server";

const valid = { name: "Ada Lovelace", email: "ada@example.com", subject: "Hello", message: "A real message." };

function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request("https://mitchelcarson.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function recorder(result: string | null = null) {
  const sent: ContactEmail[] = [];
  const send = async (email: ContactEmail) => {
    sent.push(email);
    return result;
  };
  return { sent, send };
}

const allowRequest = () => true;

test("a valid message is sent once with the visitor as reply-to", async () => {
  const { sent, send } = recorder();
  const response = await createContactHandler({ send, allowRequest })(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].replyTo, "ada@example.com");
  assert.equal(sent[0].subject, "[Portfolio] Hello");
  assert.match(sent[0].text, /A real message\./);
});

test("a provider error is reported as a failure, not success", async () => {
  const { send } = recorder("validation_error: API key is invalid");
  const response = await createContactHandler({ send, allowRequest })(request());
  assert.equal(response.status, 502);
  assert.ok((await response.json()).error);
});

test("a thrown send error is reported as a failure", async () => {
  const send = async () => {
    throw new Error("network down");
  };
  const response = await createContactHandler({ send, allowRequest })(request());
  assert.equal(response.status, 502);
});

test("missing, malformed, and oversized fields are rejected before sending", async () => {
  const cases: unknown[] = [
    { ...valid, name: " " },
    { ...valid, email: "not-an-email" },
    { ...valid, message: "" },
    { ...valid, message: 42 },
    { ...valid, name: "n".repeat(CONTACT_LIMITS.name + 1) },
    { ...valid, subject: "s".repeat(CONTACT_LIMITS.subject + 1) },
    { ...valid, message: "m".repeat(CONTACT_LIMITS.message + 1) },
    "not json",
    [],
  ];
  for (const body of cases) {
    const { sent, send } = recorder();
    const response = await createContactHandler({ send, allowRequest })(request(body));
    assert.equal(response.status, 400, JSON.stringify(body).slice(0, 60));
    assert.equal(sent.length, 0);
  }
});

test("an oversized body is rejected", async () => {
  const { sent, send } = recorder();
  const response = await createContactHandler({ send, allowRequest })(request({ ...valid, message: "m".repeat(20_000) }));
  assert.equal(response.status, 413);
  assert.equal(sent.length, 0);
});

test("line breaks cannot be smuggled into the subject", async () => {
  const { sent, send } = recorder();
  await createContactHandler({ send, allowRequest })(request({ ...valid, subject: "Hi\r\nBcc: someone@example.com" }));
  assert.equal(sent[0].subject, "[Portfolio] Hi Bcc: someone@example.com");
});

test("a filled honeypot reports success without sending", async () => {
  const { sent, send } = recorder();
  const response = await createContactHandler({ send, allowRequest })(request({ ...valid, website: "https://spam.example" }));
  assert.equal(response.status, 200);
  assert.equal(sent.length, 0);
});

test("cross-site submissions are refused", async () => {
  const { sent, send } = recorder();
  const response = await createContactHandler({ send, allowRequest })(request(valid, { "sec-fetch-site": "cross-site" }));
  assert.equal(response.status, 403);
  assert.equal(sent.length, 0);
});

test("the fourth message from one visitor in the window is limited", async () => {
  const { sent, send } = recorder();
  const handler = createContactHandler({ send, allowRequest: createContactRateLimiter(() => 0) });
  for (let i = 0; i < 3; i += 1) assert.equal((await handler(request())).status, 200);
  const limited = await handler(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "600");
  assert.equal(sent.length, 3);
  assert.equal((await handler(request(valid, { "x-forwarded-for": "198.51.100.9" }))).status, 200);
});

test("the contact limiter resets after its window and caps total volume", () => {
  let now = 0;
  const limiter = createContactRateLimiter(() => now);
  for (let i = 0; i < 20; i += 1) assert.equal(limiter(`visitor:${i}`), true);
  assert.equal(limiter("visitor:new"), false);
  now = 600_001;
  assert.equal(limiter("visitor:new"), true);
});
