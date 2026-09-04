"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { StatusLabel } from "@/components/StatusLabel";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

const labelClass = "mono-label text-muted-foreground";
const inputClass =
  "h-11 w-full rounded-[2px] border border-input bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60";
const textareaClass =
  "min-h-40 w-full resize-y rounded-[2px] border border-input bg-card px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60";

export function ContactForm() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = formState === "submitting";
  const initial = reduce ? false : { opacity: 0, y: 12 };

  function validate(): string | null {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!message.trim()) return "Message is required.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setFormState("error");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setFormState("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <motion.div
        initial={initial}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="border-y border-border py-6"
      >
        <StatusLabel status="delivered" prefix="Message sent" />
        <p className="mt-2 text-body-sm text-muted-foreground">Thanks for reaching out. I’ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setFormState("idle")}
          className="link-text mt-3 text-body-sm font-medium text-foreground hover:text-primary hover:decoration-primary"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="cf-name" className={labelClass}>
            Name *
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="cf-email" className={labelClass}>
            Email *
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="cf-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="cf-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isSubmitting}
          placeholder="What's this about?"
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="cf-message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
          rows={5}
          placeholder="Tell me about your project, role, or idea..."
          className={textareaClass}
        />
      </div>

      {formState === "error" && (
        <p role="alert" className="text-footnote text-primary">
          {errorMessage}
        </p>
      )}

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </motion.form>
  );
}
