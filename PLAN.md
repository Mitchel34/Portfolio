# Portfolio Feature Implementation Plan

## Overview
Four features to implement on branch `claude/add-dark-mode-3MBQP`:
1. Contact form (Resend)
2. Animated skill tags (Framer Motion)
3. Per-project OG image generation (next/og)
4. Inline Calendly embed for Zoom appointments

---

## 0. Prerequisites (manual steps before deployment)

### Resend (contact form email)
1. Sign up at **resend.com** (free — 3,000 emails/month)
2. Verify your domain: Resend dashboard → Domains → Add `mitchelcarson.com` → add the 3 DNS records it provides
3. Generate an API key: Resend dashboard → API Keys → Create
4. Add to Vercel env vars: `RESEND_API_KEY=re_...`
5. Add to local `.env.local`: `RESEND_API_KEY=re_...`

### Calendly (Zoom appointments)
1. Sign up at **calendly.com** (free tier is enough)
2. Connect Zoom: Calendly Settings → Integrations → Video Conferencing → Zoom → Connect
3. Create an event type (e.g., "30-Minute Chat") — Zoom link will be auto-generated for each booking
4. Copy your booking URL (e.g., `https://calendly.com/mitchel-carson/30min`)
5. Add to Vercel env vars: `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/mitchel-carson/...`
6. Add to local `.env.local`: `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/mitchel-carson/...`

---

## 1. Install Dependencies

```bash
npm install resend
```

No other packages needed:
- `framer-motion` already installed
- `next/og` is built into Next.js (already used in `opengraph-image.tsx`)
- Calendly uses a CDN script — no npm package needed

---

## 2. Contact Form with Resend

### 2a. API Route — `/src/app/api/contact/route.ts`
- POST endpoint
- Validates required fields: `name`, `email`, `message` (subject optional)
- Uses Resend SDK to send email to `mitchel.carson@gmail.com`
- Returns JSON `{ success: true }` or `{ error: "..." }` with appropriate status codes
- Rate limit protection: check `Content-Type` header, reject non-JSON bodies
- Server-side only — `RESEND_API_KEY` never exposed to client

### 2b. ContactForm component — `/src/components/ContactForm.tsx`
- Client component (`"use client"`)
- Controlled form: name, email, subject, message fields
- Inline validation (required fields, email format) — no external library, keep it simple
- Submit state: idle → submitting → success/error
- On success: show a confirmation message, reset form
- On error: show an error banner
- Styled with existing design tokens (card background, primary color buttons, border colors)
- Framer Motion entrance animation (matches existing `fadeInUp` pattern)

### 2c. Update contact page — `/src/app/contact/page.tsx`
- Replace the current static email/social links layout
- Keep the social links (LinkedIn, GitHub) as secondary actions
- Add `<ContactForm />` as the primary section
- Add `<CalendlyEmbed />` below the form (see Feature 4)

---

## 3. Animated Skill Tags

### 3a. Update `ProjectCard.tsx`
- Wrap the tech stack tag list in a `motion.div` container with `variants` using `staggerChildren: 0.06`
- Wrap each individual tag `<span>` in a `motion.span` with:
  - initial: `{ opacity: 0, scale: 0.85, y: 8 }`
  - animate: `{ opacity: 1, scale: 1, y: 0 }`
  - transition: `{ duration: 0.3, ease: "easeOut" }`
- Use `whileInView` with `viewport={{ once: true, margin: "-40px" }}` so animation triggers as card scrolls into view
- No change to visual appearance — only the entrance animation is added

### 3b. Update `FeaturedProject.tsx`
- Apply the same stagger pattern to the tech stack tags in the featured project section
- Slightly longer stagger (`0.08`) and softer animation since featured project is larger/more prominent

---

## 4. Per-Project OG Image Generation

### 4a. Dynamic project OG — `/src/app/projects/[slug]/opengraph-image.tsx`
- `export const runtime = 'edge'`
- `export const size = { width: 1200, height: 630 }`
- Receives `{ params: { slug } }` prop
- Calls `getProjectBySlug(slug)` to get project title, description, and tech stack
- Returns `ImageResponse` with layout matching the existing global `opengraph-image.tsx` style:
  - Same warm gradient background
  - Project title in Fraunces serif font (large)
  - Project description in Sora (smaller, muted color)
  - Tech stack shown as pill badges (2–4 tags, truncated if more)
  - "mitchelcarson.com" branding in bottom-right corner
  - Blue accent dot / pill matching global OG style
- Graceful fallback: if slug not found, renders generic image with site name

### 4b. Update SEO metadata in `/src/app/projects/[slug]/page.tsx`
- The existing `generateMetadata` function returns `createPageMetadata(...)`
- After adding `opengraph-image.tsx` at the same route level, Next.js automatically picks it up
- No changes to `seo.ts` needed — Next.js file-based OG image convention handles it

---

## 5. Calendly Embed (Zoom Appointments)

### 5a. CalendlyEmbed component — `/src/components/CalendlyEmbed.tsx`
- Client component (`"use client"`)
- Uses `useEffect` to inject the Calendly widget script into `document.head` (idempotent — checks if already added)
- Renders a container `<div>` with class `calendly-inline-widget` and `data-url={process.env.NEXT_PUBLIC_CALENDLY_URL}`
- Sets a fixed height (650px) which is Calendly's recommended minimum for inline embeds
- Styled wrapper: card background, rounded corners, subtle border — matches the site's card design
- Hides Calendly's own scrollbar; integrates cleanly into the page
- Shows a skeleton/loading placeholder while the script loads
- Wraps in a section with a heading: "Schedule a Zoom Call" + brief description

### 5b. Add to contact page — `/src/app/contact/page.tsx`
- Section order: ContactForm → CalendlyEmbed
- Section heading above CalendlyEmbed: "Or book a time directly"
- Framer Motion entrance animation on the section wrapper

---

## 6. File Change Summary

| File | Action | Feature |
|------|--------|---------|
| `src/app/api/contact/route.ts` | Create | Contact form |
| `src/components/ContactForm.tsx` | Create | Contact form |
| `src/components/CalendlyEmbed.tsx` | Create | Calendar |
| `src/app/projects/[slug]/opengraph-image.tsx` | Create | OG images |
| `src/app/contact/page.tsx` | Update | Contact form + Calendar |
| `src/components/ProjectCard.tsx` | Update | Animated tags |
| `src/components/FeaturedProject.tsx` | Update | Animated tags |
| `.env.local` | Create | Resend + Calendly keys |
| `package.json` | Update | Add `resend` |

---

## 7. Implementation Order

1. `npm install resend`
2. Animated skill tags (self-contained, no env vars needed — ship first)
3. Per-project OG images (no env vars needed)
4. Contact form API route + component
5. Calendly embed component
6. Update contact page to wire everything together
7. Commit and push to `claude/add-dark-mode-3MBQP`
