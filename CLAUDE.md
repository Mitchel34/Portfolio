# Portfolio Codebase

## CRITICAL: Before Working

**Always pull latest before making changes:**
```bash
cd ~/Work/Portfolio && git pull origin master
```

The `~/Desktop/Portfolio` folder is iCloud-synced and causes git operations to hang indefinitely. **Always use `~/Work/Portfolio`** for any git commands (commit, push, pull).

## Stack

- Next.js 16 + TypeScript + Tailwind CSS 4
- Framer Motion for animations
- Resend for email (contact form)
- Deployed on Vercel from `master` branch

## Key Files

- `src/lib/content.ts` - Central config (site info, projects, tech stack, Calendly URL)
- `src/lib/seo.ts` - SEO metadata helpers
- `src/components/` - All UI components
- `src/app/api/contact/route.ts` - Contact form API endpoint

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly widget URL (e.g., `https://calendly.com/mitchel-carson/30min`) |
| `RESEND_API_KEY` | For contact form emails |

## Git Workflow

- **Production branch:** `master`
- Feature branches merge via PR to `master`
- Vercel auto-deploys from `master`

## Common Tasks

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # Run ESLint
```

## Calendly Integration

There are two Calendly integrations:
1. **Quick link buttons** - Use `site.calendlyUrl` from `content.ts` (opens external Calendly page)
2. **Inline widget** - `CalendlyEmbed` component uses `NEXT_PUBLIC_CALENDLY_URL` env var

Both should point to the same URL: `https://calendly.com/mitchel-carson/30min`

