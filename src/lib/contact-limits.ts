export const CONTACT_LIMITS = { name: 120, email: 254, subject: 200, message: 5_000 } as const;
/** Hidden form field real visitors never fill in; bots that do are dropped silently. */
export const HONEYPOT_FIELD = "website";
