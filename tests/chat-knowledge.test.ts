import assert from "node:assert/strict";
import test from "node:test";

import { buildChatProfile } from "../src/lib/chat-knowledge";
import { getPreparedChatAnswer } from "../src/lib/chat";
import { selectChatSources } from "../src/lib/chat-server";
import { coursework, openSource, projects, research, talks, work } from "../src/lib/content";

const sourcesFor = (content: string) => selectChatSources([{ role: "user", content }]).map((source) => source.href);

test("the custom guide knows every published project group and its useful details", () => {
  const profile = buildChatProfile();
  assert.deepEqual(profile.openSource, openSource);
  assert.deepEqual(profile.clientWork, [work.greenspace]);
  assert.deepEqual(profile.coursework, coursework);
  assert.deepEqual(profile.talks, talks);
  for (const project of projects) {
    const known = profile.projects.find((entry) => entry.slug === project.slug)!;
    assert.deepEqual(known.caseStudy, project.caseStudy);
    assert.deepEqual(known.learnings, project.learnings);
    assert.deepEqual(known.links, project.links);
  }
  assert.match(profile.openSource.find((entry) => entry.name === "Portfolio")!.what, /OpenAI Responses API/);
});

test("prepared and generated HYDRA answers share the reviewed research facts", () => {
  const prepared = getPreparedChatAnswer("What is HYDRA?")!.content;
  assert.ok(prepared.includes(research.summary));
  assert.ok(prepared.includes(research.scopeNote));
  assert.equal(buildChatProfile().research.reviewedAt, research.reviewedAt);
  assert.match(research.summary, /saved-model assessment.*complete/);
  assert.match(research.evaluation.join(" "), /H1–16/);
  assert.match(research.constraints.join(" "), /simulated.*revised historical USGS/);
  assert.match(research.nextGenSoftware.limits, /Hosted.*unfinished/);
});

test("named smaller projects get their own sources instead of unrelated main research", () => {
  for (const name of ["MazeApp", "Bayesian_Network", "hydra-nwm-streamflow-correction", "Runoff_Forcasting"]) {
    const entry = openSource.find((entry) => entry.name === name)!;
    const selected = sourcesFor(`What is ${name}, and how does it differ from his main research?`);
    assert.ok(selected.includes(entry.url), name);
    if (["MazeApp", "Bayesian_Network", "Runoff_Forcasting"].includes(name)) {
      assert.ok(!selected.includes("/projects/hydra-temporal"), `${name} should not inherit generic research links`);
    }
  }
  assert.ok(sourcesFor("What client website work has Mitchel done?").includes(work.greenspace.href));
  assert.ok(sourcesFor("How was this website built?").includes(openSource.find((entry) => entry.name === "Portfolio")!.url));
});

test("a client-work follow-up retains its source and a new named project replaces it", () => {
  const history = [
    { role: "user" as const, content: "Tell me about GreenSpace Lawn Care" },
    { role: "assistant" as const, content: "Mitchel built its website." },
  ];
  const followup = selectChatSources([...history, { role: "user", content: "Can I see it?" }]);
  assert.equal(followup[0].href, work.greenspace.href);
  const changed = selectChatSources([...history, { role: "user", content: "What does MazeApp use?" }]);
  assert.ok(changed.some((source) => source.href.endsWith("/MazeApp")));
  assert.ok(!changed.some((source) => source.href === work.greenspace.href));
});

test("explicit subject changes replace the previous project's related links", () => {
  const after = (previous: string, content: string) => selectChatSources([
    { role: "user", content: previous },
    { role: "assistant", content: "A completed answer." },
    { role: "user", content },
  ]).map((source) => source.href);
  assert.deepEqual(after("Explain HYDRA", "What did he do with enterprise APIs?"), ["/projects/usaa-risk-services"]);
  assert.ok(after("Explain GreenSpace", "What is his research about?").includes("/research"));
  assert.ok(!after("Explain GreenSpace", "What is his research about?").includes(work.greenspace.href));
  assert.deepEqual(sourcesFor("Has he built websites for clients?"), [work.greenspace.href]);
  assert.equal(sourcesFor("Give me an overview of all his projects including this website")[0], "/projects");
  assert.ok(!sourcesFor("What has HYDRA's DirectFlow study evaluated?").includes("/coursework"));
});
