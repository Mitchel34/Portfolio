# AI guide knowledge

Reviewed November 10, 2026. The guide serves a versioned public snapshot; it does not browse, read private workspaces, or synchronize itself with project activity.

`src/lib/content.ts` owns the public facts. `buildChatProfile()` in `src/lib/chat-knowledge.ts` includes all case studies, GreenSpace client work, every listed repository, coursework, toolkit, service, research, talks, and public contact details. Prepared HYDRA answers use the same research summary as generated answers. Exact published destinations form the link allowlist; a known domain does not authorize arbitrary paths.

## Research sources and boundaries

- [DirectFlow protocol](https://github.com/Mitchel34/hydra-directflow/blob/main/docs/primary-training-protocol-v1.md): current inputs, four model families, PyTorch backends, temporal splits, and simulated availability conventions.
- [Saved-model assessment](https://github.com/Mitchel34/hydra-directflow/blob/main/reports/assessment-firstpass-v1/README.md): frozen-checkpoint assessment without retraining or transform refits; site/model-dependent results; independent H1–18 forecasts versus matched NWM H1–16 support. This report supersedes the older sealed-assessment language in that repository’s root README.
- [Peak diagnostics](https://github.com/Mitchel34/hydra-directflow/blob/main/reports/assessment-event-diagnostics-v1/README.md): extreme-peak underprediction in the assessed saved models. These later diagnostics supersede the first-pass report’s then-pending event-analysis status.
- [NextGen Reforecast Software](https://github.com/Mitchel34/nextgen-reforecast-software): a separate planning/provenance package, local browser prototype, and qualified diagnostic execution path. Hosted automatic execution and scientific release remain unfinished. Engineering tests do not establish forecast skill or campaign speedup.

DirectFlow predicts discharge directly; NWM is an external comparator. Revised historical USGS observations and a simulated two-hour delay do not reconstruct original publication availability. Weather-plus-soil is a joint input comparison. No universal improvement, verified 48% gain, live forecasting service, or completed publication is claimed. The accepted AGU abstract’s ERA5 framing is kept distinct from the current issued-HRRR experiment.

GreenSpace, Harmony, USAA, smaller repositories, coursework, and biography use their existing public portfolio records. The three ML systems labs use their public READMEs and pinned results reports linked in each shared repository record. Their synthetic evaluations do not establish production reliability or performance. No private Harmony repository URL or operational performance was inferred. Accepted conference dates do not prove a presentation was delivered after the date passes.

## Updating and validation

When public project facts change, update shared content and this review record from the owning source. Keep current findings separate from planned work and older research phases. Deploy the updated content; the running guide does not learn from conversations.

Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`. With the local server running on port 3005, `npm run test:live-chat` makes nine real provider calls. `CHAT_TEST_URL=https://mitchelcarson.com npm run test:live-chat` checks the production endpoint without sending local credentials. Both forms incur provider usage.

The live cases cover the three public ML systems labs (quantization, batch contracts, and agent replay), GreenSpace, smaller repositories, this website and its prepared/custom paths, a complete project overview, DirectFlow status and coverage, an unsupported-performance follow-up, Harmony autonomy, and AGU dates and program links. Streaming, completion, exact source URLs, and basic natural phrasing are checked automatically. Read the printed answers to assess grounding, clarity, and repeated caveats; keyword checks alone do not establish answer quality.
