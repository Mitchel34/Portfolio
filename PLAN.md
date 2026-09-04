# Career and Portfolio Operating Plan

Updated: 2026-09-04

This is the governing plan for the career work associated with Mitchel Carson's portfolio. It replaces the completed feature-specific implementation plan that previously lived here.

## Objective

Build a coherent career system that connects five activities:

1. Maintain a truthful, current public portfolio at `mitchelcarson.com`.
2. Maintain one evidence-backed master resume and produce role-specific variants from it.
3. Track target companies, roles, deadlines, applications, and follow-ups.
4. Coordinate career work with the Fall 2026 UT M.S. Artificial Intelligence workload.
5. Turn current work in HYDRA, AGU, Harmony, and graduate coursework into clear, bounded evidence of applied AI, research, and engineering capability.

## Current implementation status

As of 2026-09-04 (visual refresh branch `claude/personal-website-refresh-jffal0`):

- The site has been redesigned around an editorial "preprint" system: paper and ink tokens, Newsreader with IBM Plex Sans and Mono, numbered sections with a margin column, figure wells with captions, footnoted claims, and a three-state evidence glyph (confirmed / provisional / not yet) that labels every output.
- Home order is now Research, Open Source, Talks & Discussions, Projects, About, Graduate Study, Contact. Two sections are new: Open Source (verified public repositories, grouped, no vanity counts) and Talks & Discussions (AGU26 workshop, abstract, manuscript, thesis with status labels, plus discussion invitations and office hours).
- Positioning moved from "AI / Machine Learning Engineer" to "Machine Learning Engineer & Applied AI Researcher" with a research-first tagline; the Person schema job title stays factual (M.S. student). Confirm or revert this wording before release.
- The particle canvas, custom cursor, and graph menu were replaced by flat paper, a table-of-contents index, and one reduced-motion-safe fade.
- Open decisions from the refresh are listed under "Decisions to make together".

As of 2026-08-20:

- The local portfolio has been rewritten around the confirmed AI / Machine Learning Engineer headline.
- HYDRA is labeled as ongoing research and its 26-54% RMSE result is explicitly preliminary and relative to LSTM baselines.
- Harmony is framed as a modular software, validation, and reliability system.
- Completed and Fall 2026 coursework are separated on a dedicated page.
- A new one-page general resume has been generated and installed at every existing public resume path.
- Lint, production build, PDF/ATS extraction, link, and responsive visual checks pass locally.
- No production deployment has been made; preview and production review remain pending.

## Career narrative

The portfolio should present one connected story rather than a collection of unrelated projects:

> An applied AI and software engineer who builds reliable systems from research through delivery, with experience spanning production software, deep-learning research, high-stakes operations, and graduate AI study.

The story has five evidence pillars:

- **HYDRA and hydrologic research:** time-series forecasting, residual correction, temporal validation, reproducible experimentation, scientific communication, and domain collaboration.
- **AGU and research communication:** communicating technical work to hydrologists, environmental scientists, and broader scientific audiences. Public wording must distinguish submitted, accepted, presented, and published work.
- **Harmony:** modular data, forecasting, semantic-validation, policy-control, and simulation software with fail-safe system boundaries. Do not imply live execution, profitability, or validated investment performance.
- **UT M.S. AI coursework:** completed AI Ethics, Machine Learning, Deep Learning, and Reinforcement Learning, plus Fall 2026 study in Advances in Deep Learning, Optimization, and Natural Language Processing.
- **Production and operational experience:** USAA software engineering and Air Force mission experience as evidence of dependable delivery, cross-functional communication, and work in consequential environments.

## Target role lanes

These lanes were confirmed on 2026-08-20. Every target role should map to one primary lane.

1. **AI / Machine Learning Engineer** - primary site headline and default lane for early-career and graduate roles; emphasizes end-to-end systems, model evaluation, and production delivery.
2. **Research Engineer / Applied Scientist** - primary supporting lane; emphasizes HYDRA, scientific rigor, experiments, publications, and technical communication.
3. **ML Platform / Software Engineer** - primary supporting lane; emphasizes APIs, data pipelines, reproducibility, reliability, and production engineering.
4. **Mission-oriented AI / data roles** - secondary targeted lane for clearance- and defense-relevant opportunities.

## Source-of-truth rules

- `src/lib/content.ts` is the source of truth for public website copy.
- `public/resume.pdf` is the exact resume published by the site.
- `career/resumes/` is the local source of truth for master and tailored resume work.
- `career/companies.csv` is the local source of truth for companies and applications.
- `career/calendar.md` is the local source of truth for career milestones and workload decisions.
- `career/claims.csv` is the local claim ledger. No material metric, status, credential, course, publication, or availability statement should be published unless it has a current ledger entry.

The entire `career/` directory is intentionally ignored by Git because the website repository may be public. It may contain application strategy and working documents, but it must not contain account credentials, government identifiers, private references, interview recordings, or other unnecessary sensitive data.

## Eight-week roadmap

### Phase 1 - Foundation (August 20-30)

- Confirm target-role priority and geographic/remote constraints.
- Inventory current resumes, site claims, project evidence, coursework, and AGU status.
- Build the master resume content bank and resolve inconsistent HYDRA metrics.
- Decide whether and how to mention clearance, availability, and graduation timing.

### Phase 2 - Positioning and resume system (August 31-September 13)

- Produce a general Applied ML / AI Engineer resume.
- Produce reusable Research Engineer and ML/Software Engineer variants.
- Establish a repeatable company-and-job tailoring workflow.
- Verify ATS readability and rendered PDF quality.

### Phase 3 - Portfolio content update (September 14-27)

- Rewrite the home page around the unified career narrative.
- Expand HYDRA into a research case study with safe, sourced claims.
- Reframe Harmony around system architecture, validation, and risk controls.
- Add AGU activity and a coursework/learning section with explicit status labels.
- Update About, Research, Projects, Resume, metadata, and downloadable PDF together.

### Phase 4 - Release and application rhythm (September 28-October 11)

- Test responsive layout, links, accessibility, metadata, and the production build.
- Review a Vercel preview before changing production.
- Publish only after a final claim and resume audit.
- Begin a sustainable application cadence that fits the verified course calendar.

### Phase 5 - Iterate from evidence (October 12 onward)

- Review application response rates by role lane and resume variant.
- Refine positioning based on job descriptions and interview feedback.
- Add project or coursework evidence only when it becomes complete and demonstrable.
- Keep the site, resume, LinkedIn, and application answers consistent.

## Weekly operating rhythm

Until the Fall 2026 syllabi and personal calendar are reviewed, use this as a proposal rather than a fixed commitment:

- One 30-minute weekly review to update deadlines, next actions, and course conflicts.
- Two 60-90 minute application/tailoring blocks on weekdays.
- One 2-3 hour deep-work block for portfolio or master-resume work.
- A maximum weekly application target set only after the academic workload is visible.
- No career deadline may silently displace a graded assignment or exam; conflicts are resolved in `career/calendar.md`.

## Resume workflow

1. Capture verified facts and bullets in the master content bank.
2. Save the job description and map it to one role lane.
3. Select only supportable experience and keywords.
4. Create a role-specific resume; do not overwrite the master.
5. Check text extraction, links, spelling, visual rendering, and one-page density.
6. Record the exact version in `career/companies.csv` before applying.
7. Update `public/resume.pdf` only when intentionally changing the general public resume.

Recommended application filename:

`Mitchel_Carson_<Lane>_<Company>_<Role>_<YYYY-MM-DD>.pdf`

## Website backlog

### Must have

- Current positioning, education status, availability, and resume.
- HYDRA, AGU, and Harmony descriptions with bounded status language.
- A coursework section separating completed, current, and planned courses.
- Clear role-relevant calls to action and working contact links.
- Consistent claims across home, About, Projects, Research, Resume, README, metadata, and structured data.

### Strong additions

- Dedicated case-study structure: problem, contribution, evidence, validation, limitations, and current status.
- A research/publications/presentations area that can evolve from submitted work to accepted or published work without rewriting the whole site.
- A compact learning timeline for graduate coursework and selected artifacts.
- Downloadable general resume plus role-lane landing pages if they become useful.

### Deferred unless evidence supports them

- Profit or performance claims for Harmony.
- Publication, presentation, grant, or award claims that have not reached that status.
- Generic skill lists disconnected from a project, course, or work example.
- A production deploy before the resume and claim ledger agree with the site.

## Release gate for mitchelcarson.com

A portfolio release is complete only when:

- all public claims are current and supported;
- the published PDF is the intended general resume;
- `npm run lint` and `npm run build` pass;
- desktop and mobile layouts are visually reviewed;
- links, downloads, contact actions, metadata, and structured data are checked;
- a preview deployment is reviewed; and
- Mitchel explicitly approves the production content and release.

## Decisions to make together

1. Define remote/hybrid and relocation constraints within the confirmed Austin, Texas location context.
2. Confirm current AGU abstract, travel-grant, manuscript, and presentation statuses.
3. Decide whether Harmony's repository can be linked publicly; the public framing is now software architecture, validation, and reliability.
4. Set a realistic weekly application cadence after the fall course deadlines are mapped.
5. Reconcile the HYDRA headline metric. The site and resume say "26–54% lower RMSE than the LSTM baselines tested"; the public manuscript draft reports RMSE reductions relative to raw National Water Model output at three gauges, with and without lagged gauge observations, and does not report an LSTM comparison. Record the provenance of every public number in the claim ledger and publish one canonical sentence everywhere (site, resume, README, repository README).
6. Confirm the clearance descriptor on the site matches current status wording, and confirm the AGU26 abstract title, the honors thesis title, and whether a public thesis presentation should be listed under Talks.
7. Regenerate `public/mitchelcarson_resume.pdf`: the current PDF still lists the older Fall 2026 course plan and the previous headline, so the resume page carries a caption noting the mismatch until it is replaced.
8. Confirm the tooling named in the HYDRA stack (Hydra configuration, MLflow, BigQuery acquisition) is either visible in the public repository or described as private infrastructure.

## Immediate next milestone

Review the visual refresh branch (preview deployment, desktop and mobile, both themes), resolve decisions 5 through 8 above, regenerate the resume PDF, then merge to `master`. In parallel, follow the private career memo delivered with the refresh: settle manuscript status and authorship with co-authors, add the missing baselines the manuscript needs, and decide the Fall 2027 PhD lane by early October.
