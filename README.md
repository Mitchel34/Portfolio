# Mitchel Carson — Portfolio

Software engineer focused on applied AI and scientific computing, and a U.S. Air Force veteran. I flew on 50+ executive airlift missions with the 89th Airlift Wing, including Air Force Two, and I'm now an M.S. Artificial Intelligence student at the University of Texas at Austin researching watershed forecasting with deep learning.

**Live site:** [mitchelcarson.com](https://mitchelcarson.com)

---

## About

From 2020 to 2023 I was an Executive Missions Aviator in the U.S. Air Force's 89th Airlift Wing. I flew on 50+ executive airlift missions across 30+ countries, all completed with zero safety-related incidents, working directly onboard with distinguished visitors including the Vice President aboard Air Force Two and the Secretary of State. I also handled the mission administration: in-flight meal and beverage service, baggage logistics, crew hotels and ground transportation, visa applications, and subsistence billing. It was while serving that I chose to pursue AI, and the habits of that job came with me: preparation, clear communication, and a standard that does not move. I hold an active TS/SCI clearance.

I focus on applied AI that makes complex data useful to the people relying on it. HYDRA, motivated by experiencing Hurricane Helene in Boone, began as my senior honors thesis and continues as ongoing research on watershed dynamics and forecast reliability: NextGen reforecast generation software and Google Cloud data workflows, plus deep-learning post-processing for 1–18 hour streamflow forecasts comparing LSTM, Transformer, and Mamba-style models. Results are pending; a results manuscript for Water Resources Research is in preparation, a software paper for Environmental Modelling & Software is planned, and data tooling is public at [NextGen_Hydra](https://github.com/Mitchel34/NextGen_Hydra). At USAA I built Java and Spring Boot GraphQL APIs and reduced troubleshooting time by 30%.

I'm based in **Austin, Texas**, building across software engineering, applied AI, and scientific computing.

I'm open to **software engineering and applied AI roles**.

## Focus Areas

- Streamflow forecast post-processing with LSTM, Transformer, and Mamba-style state-space models
- Reforecast generation and data tooling for NOAA's NextGen framework
- Leakage-aware temporal evaluation by site and lead time
- Cloud research compute: Google Cloud (BigQuery, Cloud Storage) for hydrology; AWS for Harmony experiments
- Decision systems with bounded LLM autonomy: advisory nodes that can flag or veto, human approval for consequential actions

## Graduate Coursework

- **Completed:** AI Ethics, Machine Learning, Deep Learning, Reinforcement Learning
- **Fall 2026 (in progress):** Advances in Deep Learning; Optimization; Natural Language Processing
- **Current GPA:** 4.0/4.0 · **Expected graduation:** May 2027

## Talks, Workshops, and Writing

- **AGU26 scientific workshop (accepted, forthcoming):** [*Best Practices for AI and Agentic Workflows in Earth Science Research*](https://studio.m-anage.com/agu/agu26/meetingapp.cgi/Session/280856), SCIWS10, December 6, 2026. Presenters: Mitchel Carson (UT Austin) and Mohammad Ali Javidian (App State).
- **AGU26 poster (accepted, forthcoming):** [*Hydra: Identifying Data That Improve Local National Water Model Streamflow Estimates*](https://studio.m-anage.com/agu/agu26/meetingapp.cgi/Paper/2094875), December 2026.
- **Water Resources Research results manuscript (in preparation).**
- **Environmental Modelling & Software paper on the NextGen reforecast generation software (planned).**
- **Senior Honors Thesis (completed, December 2025):** runoff forecasting with deep learning, Appalachian State University.

## Site

The home page tells one story from top to bottom: a hero, then numbered sections for Service (the Air Force chapter), Path (a timeline from the Air Force through UT Austin), Work (HYDRA, USAA, Harmony, client work, open source), Research & Talks, Skills, and Contact. Every research output carries its current status (accepted, under review, in progress, completed), and all copy lives in `src/lib/content.ts`.

## Connect

- **Email:** mitchel.carson@gmail.com
- **LinkedIn:** [linkedin.com/in/mitchelcarson](https://www.linkedin.com/in/mitchelcarson)
- **GitHub:** [github.com/Mitchel34](https://github.com/Mitchel34)

---

## Stack

Built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion. Typeset in Newsreader and IBM Plex Sans/Mono. Deployed on Vercel.

## Ask about Mitchel

The home page includes a portfolio guide with suggested questions, streamed answers, and links to project and research pages. The hero retains the portrait, and an animated ASCII streamflow scene sits inside the featured HYDRA research card, replacing the former “Inside HYDRA” pipeline explorer. Water flows north to south (top to bottom); the scene pauses offscreen, supports reduced motion, and has a pause control.

The four suggested questions use prepared answers and trusted portfolio links entirely in the browser, with no API call or API cost. Typing the same questions (ignoring case, whitespace, and trailing punctuation) also uses the prepared answers. The server has the same shortcut for direct API requests. Prepared responses are labeled separately from OpenAI answers.

Custom questions use the official OpenAI SDK and Responses API through the same-origin Next.js route at `/api/chat`. The guide uses curated public portfolio content, has no tools or private-data access, and does not need a vector database. Research in progress remains labeled as such. Conversation history is held in the current browser tab. A custom question sends recent completed turns, including prepared answers, to OpenAI for context; the app does not persist them, and API calls use `store: false`. OpenAI's own data retention policies still apply.

### Local setup

```sh
npm ci
cp -n .env.example .env.local # Preserve existing local credentials.
# Set OPENAI_API_KEY in .env.local; optionally set OPENAI_CHAT_MODEL.
npm run dev
```

`OPENAI_API_KEY` must stay server-side. Prepared answers work without it. Custom questions show an unavailable message and links to projects/contact until the key is configured. The default model is `gpt-6-luna`; use `OPENAI_CHAT_MODEL` to select another model enabled for your OpenAI API project. No API key is committed.

### Hosting

Keep the chat in Next.js for the current Vercel deployment. Both platforms support streaming, but a separate Cloudflare Worker would introduce an additional service and cross-origin configuration without improving this small integration. A Worker becomes useful if the frontend moves to static hosting or the chat becomes a shared backend for several clients.

Configure `OPENAI_API_KEY` and optionally `OPENAI_CHAT_MODEL` in the deployment environment before deploying. Use a dedicated Portfolio API project when available, or an explicitly selected existing project, and set that project's monthly spend limit to **$5**, with **Enforce a hard limit** enabled in OpenAI's project Limits → Spend settings. Add spend alerts before the cap and keep automatic recharge off. Enforcement may lag slightly; a small overrun is possible. This dashboard setting must be verified separately from the code—it is not enforced by a local environment variable. See [OpenAI spend limits](https://developers.openai.com/api/docs/guides/spend-limits).

Set production platform rate limits as well. The built-in limiter is bounded and instance-local; it is a small safeguard, not a distributed quota or spending cap. Requests also have input/history limits, output limits, cancellation, and a timeout. Prepared answers remain available when custom AI responses are unavailable or the API project reaches its cap.

Before publishing custom answers, verify the account's hard-limit behavior separately. Passing the application tests or saving a dollar threshold does not establish a verified spending cutoff.

If the account's dashboard does not expose dollar-spend controls, `npm run configure:chat-budget -- --project-id YOUR_PORTFOLIO_PROJECT_ID` uses the [documented Admin API](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects/subresources/spend_limit/methods/update) to set exactly $5/month and read it back. It requires a separately authorized organization admin credential in the terminal-only `PORTFOLIO_OPENAI_ADMIN_KEY` environment variable. Never put that admin key in the app's `.env.local` or deployment environment. The helper checks the project's name, refuses unrelated projects, and reports success only after OpenAI returns `enforcement.status: enforcing` for the $5 threshold. `--verify-only` performs no write. The ordinary project inference key is insufficient for this admin endpoint.

For a confirmed existing project, pass its exact name with `--expected-project-name`, for example `--expected-project-name 'Default project'`. The helper verifies both the project ID and name before changing the limit; it does not infer a different project from the name.

### Validation

```sh
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Tests exercise request validation, stream parsing, cancellation, and upstream failures with a mock provider. They do not call OpenAI or establish live model access. A live answer requires a configured API key.

To check real answers before deployment, save the key in `.env.local`, restart the local server on port 3005, and run `npm run test:live-chat`. This explicitly makes three OpenAI-backed requests and incurs normal API usage. It checks streaming, trusted links, research status, and conversation history; review the printed public answers for factual accuracy. No key is printed. The test refuses custom provider URLs and nonlocal portfolio servers so a mock cannot be mistaken for live validation.
