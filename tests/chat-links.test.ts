import assert from "node:assert/strict";
import test from "node:test";

import { chatSources, getChatSource, getUnlinkedChatSources, isTrustedChatHref, parseChatAnswer } from "../src/lib/chat";
import { openSource, projects, site, talks, work } from "../src/lib/content";

test("the guide can link every published client, repository, and conference destination", () => {
  const published = [
    work.greenspace.href,
    ...openSource.map((entry) => entry.url),
    ...openSource.flatMap((entry) => entry.evidence?.map((link) => link.href) ?? []),
    ...projects.flatMap((project) => project.links?.map((link) => link.href) ?? []),
    ...talks.flatMap((talk) => talk.links?.map((link) => link.href) ?? []),
    "/projects#open-source",
    site.resumeUrl,
    site.github,
    site.linkedin,
    site.calendlyUrl,
    `mailto:${site.email}`,
  ];
  for (const href of published) {
    assert.ok(isTrustedChatHref(href), `Published destination is unavailable to the guide: ${href}`);
    assert.equal(parseChatAnswer(`[Read more](${href})`).flat()[0].type, "link");
  }
});

test("public sources remain unique and preserve existing source titles", () => {
  assert.equal(chatSources.length, new Set(chatSources.map((source) => source.href)).size);
  assert.equal(getChatSource("/research")?.title, "Research");
  assert.equal(getChatSource("/projects/hydra-temporal")?.title, "HYDRA case study");
});

test("absolute internal links resolve to the same exact published source and deduplicate", () => {
  for (const source of chatSources.filter((entry) => entry.href.startsWith("/"))) {
    const absolute = `${site.url}${source.href}`;
    assert.equal(getChatSource(absolute), source);
    for (const text of [
      `[First](${source.href}) and [Again](${absolute})`,
      `[First](${absolute}) and [Again](${source.href})`,
    ]) {
      const links = parseChatAnswer(text).flat().filter((segment) => segment.type === "link");
      assert.deepEqual(links, [{ type: "link", text: "First", href: source.href }]);
      assert.deepEqual(getUnlinkedChatSources(text, [{ title: source.title, href: absolute }]), []);
    }
  }
});

test("link markup can surround an exact known destination with whitespace", () => {
  assert.equal(getChatSource(" /research ")?.href, "/research");
  assert.deepEqual(parseChatAnswer("Read [the research]( /research ).").flat().filter((segment) => segment.type === "link"), [
    { type: "link", text: "the research", href: "/research" },
  ]);
  assert.equal(getChatSource(" https://evil.example "), undefined);
  assert.equal(parseChatAnswer("See [the research]( /rese", { streaming: true }).flat().map((segment) => segment.text).join(""), "See ");
});

test("trust stays limited to exact published URLs, including on known domains", () => {
  for (const href of [
    "https://github.com/Mitchel34/unpublished-project",
    `${openSource[0].url}/issues/new`,
    `${work.greenspace.href}?redirect=https://example.com`,
    "https://www.greenspacelawncare.us.evil.example/",
    "https://studio.m-anage.com/agu/agu26/meetingapp.cgi/Paper/9999999",
    "https://example.com",
    `${site.url}/projects?redirect=https://example.com`,
    `${site.url}/unpublished-project`,
    `${site.url}/unknown/../projects`,
    `${site.url}/projects/`,
    "https://user:password@mitchelcarson.com/projects",
    "https://mitchelcarson.com.evil.example/projects",
    "http://mitchelcarson.com/projects",
    "//github.com/Mitchel34/Portfolio",
    "javascript:alert(1)",
  ]) {
    assert.equal(isTrustedChatHref(href), false, href);
    assert.deepEqual(parseChatAnswer(`[Unknown](${href})`).flat().filter((segment) => segment.type === "link"), []);
  }
});
