import { Resend } from "resend";

import { CONTACT_LIMITS, HONEYPOT_FIELD } from "./contact-limits";
import { createRateLimiter, visitorKey } from "./rate-limit";

const FROM_ADDRESS = "Portfolio Contact <contact@mitchelcarson.com>";
const TO_ADDRESS = "mitchel.carson@gmail.com";

const MAX_BODY_BYTES = 16_000;

export { CONTACT_LIMITS, HONEYPOT_FIELD };

export type ContactEmail = { from: string; to: string; replyTo: string; subject: string; text: string };
/** Resolves with an error message when the provider rejects the send, or null on success. */
export type SendContactEmail = (email: ContactEmail) => Promise<string | null>;

type ContactHandlerOptions = {
  send?: SendContactEmail;
  allowRequest?: (key: string) => boolean;
};

/** Three messages per visitor and twenty overall in ten minutes. */
export function createContactRateLimiter(now: () => number = Date.now) {
  return createRateLimiter({ windowMs: 600_000, perKey: 3, global: 20 }, now);
}

const rateLimit = createContactRateLimiter();

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function singleLine(value: string) {
  return value.replace(/[\r\n\t]+/g, " ").trim();
}

/** Resend reports failures in its return value instead of throwing, so the result must be checked. */
const sendWithResend: SendContactEmail = async (email) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey?.trim()) return "RESEND_API_KEY is not set";
  const { error } = await new Resend(apiKey).emails.send(email);
  return error ? `${error.name}: ${error.message}` : null;
};

/** Injecting the sender and limiter keeps the tests offline. */
export function createContactHandler(options: ContactHandlerOptions = {}) {
  return async function handleContact(request: Request): Promise<Response> {
    if (request.headers.get("sec-fetch-site") === "cross-site") {
      return json({ error: "Please use the contact form on Mitchel’s portfolio." }, 403);
    }

    let fields: Record<string, unknown>;
    try {
      const text = await request.text();
      if (text.length > MAX_BODY_BYTES) return json({ error: "The message is too large." }, 413);
      const body: unknown = JSON.parse(text);
      if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
      fields = body as Record<string, unknown>;
    } catch {
      return json({ error: "The message could not be read. Please try again." }, 400);
    }

    const read = (key: string) => (typeof fields[key] === "string" ? (fields[key] as string) : "");
    const name = singleLine(read("name"));
    const email = read("email").trim();
    const subject = singleLine(read("subject"));
    const message = read("message").trim();

    if (!name || !email || !message) {
      return json({ error: "Name, email, and message are required." }, 400);
    }
    if (email.length > CONTACT_LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email address." }, 400);
    }
    if (name.length > CONTACT_LIMITS.name || subject.length > CONTACT_LIMITS.subject) {
      return json({ error: "Name or subject is too long." }, 400);
    }
    if (message.length > CONTACT_LIMITS.message) {
      return json({ error: `Message must be ${CONTACT_LIMITS.message.toLocaleString("en-US")} characters or fewer.` }, 400);
    }

    // Report success so the bot learns nothing, but send no email.
    if (read(HONEYPOT_FIELD).trim()) return json({ success: true });

    if (!(options.allowRequest ?? rateLimit)(visitorKey(request))) {
      const response = json({ error: "Too many messages right now. Please try again later or email me directly." }, 429);
      response.headers.set("Retry-After", "600");
      return response;
    }

    try {
      const failure = await (options.send ?? sendWithResend)({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        replyTo: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
      if (failure) throw new Error(failure);
    } catch (error) {
      console.error("Contact form error:", error);
      return json({ error: "Failed to send message. Please try again or email me directly." }, 502);
    }

    return json({ success: true });
  };
}
