import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { configureChatBudget, verifyChatBudget } from "../scripts/configure-chat-budget";

const active = { threshold_amount: 500, currency: "USD", interval: "month", enforcement: { status: "enforcing" } };

test("budget verification rejects alerts, inactive settings, and wrong amounts", () => {
  assert.doesNotThrow(() => verifyChatBudget(active));
  for (const invalid of [null, {}, { ...active, threshold_amount: 5 }, { ...active, enforcement: { status: "inactive" } }, { ...active, currency: "EUR" }]) {
    assert.throws(() => verifyChatBudget(invalid), /not confirmed/);
  }
});

test("budget setup targets only Portfolio and reads back enforcement before success", async () => {
  const calls: { url: string; method?: string; body?: unknown }[] = [];
  const request: typeof fetch = async (target, init) => {
    calls.push({ url: String(target), method: init?.method, body: init?.body ? JSON.parse(String(init.body)) : undefined });
    return Response.json(String(target).endsWith("spend_limit") ? active : { id: "proj_test", name: "Portfolio" });
  };
  assert.equal((await configureChatBudget("proj_test", "offline-admin-placeholder", false, request)).enforcement, "enforcing");
  assert.deepEqual(calls.map(({ method }) => method), ["GET", "POST", "GET"]);
  assert.deepEqual(calls[1].body, { threshold_amount: 500, currency: "USD", interval: "month" });
  assert.ok(calls.every(({ url }) => url.startsWith("https://api.openai.com/v1/organization/projects/proj_test")));
});

test("an explicitly confirmed Default project is supported without weakening ID/name or enforcement checks", async () => {
  const methods: string[] = [];
  const request: typeof fetch = async (target, init) => {
    methods.push(init?.method ?? "GET");
    assert.equal(init?.redirect, "error");
    assert.ok(init?.signal instanceof AbortSignal);
    return Response.json(String(target).endsWith("spend_limit") ? active : { id: "proj_default", name: "Default" });
  };
  assert.deepEqual(await configureChatBudget("proj_default", "offline-admin-placeholder", false, request, "Default"), {
    project: "Default", projectId: "proj_default", monthlyLimitUsd: 5, enforcement: "enforcing",
  });
  assert.deepEqual(methods, ["GET", "POST", "GET"]);

  let writes = 0;
  const mismatch = (project: { id: string; name: string }): typeof fetch => async (_target, init) => {
    if (init?.method === "POST") writes += 1;
    return Response.json(project);
  };
  await assert.rejects(configureChatBudget("proj_default", "offline-admin-placeholder", false, mismatch({ id: "proj_other", name: "Default" }), "Default"), /not the expected Default/);
  await assert.rejects(configureChatBudget("proj_default", "offline-admin-placeholder", false, mismatch({ id: "proj_default", name: "Other work" }), "Default"), /not the expected Default/);
  assert.equal(writes, 0);
  const inactive: typeof fetch = async (target) => Response.json(String(target).endsWith("spend_limit") ? { ...active, enforcement: { status: "inactive" } } : { id: "proj_default", name: "Default" });
  await assert.rejects(configureChatBudget("proj_default", "offline-admin-placeholder", true, inactive, "Default"), /not confirmed/);
});

test("the helper cannot mutate an unrelated project or mistake inactive enforcement for success", async () => {
  let writes = 0;
  const wrongProject: typeof fetch = async (_url, init) => {
    if (init?.method === "POST") writes++;
    return Response.json({ id: "proj_test", name: "Other work" });
  };
  await assert.rejects(configureChatBudget("proj_test", "offline-admin-placeholder", false, wrongProject), /not the expected Portfolio/);
  assert.equal(writes, 0);
  const inactive: typeof fetch = async (target) => Response.json(String(target).endsWith("spend_limit") ? { ...active, enforcement: { status: "inactive" } } : { id: "proj_test", name: "Portfolio" });
  await assert.rejects(configureChatBudget("proj_test", "offline-admin-placeholder", true, inactive), /not confirmed/);
});

test("budget CLI executes through a symlink instead of silently succeeding without work", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "chat-budget-cli-"));
  try {
    const entry = path.join(directory, "budget-setup.ts");
    symlinkSync(fileURLToPath(new URL("../scripts/configure-chat-budget.ts", import.meta.url)), entry);
    const result = spawnSync(process.execPath, ["--import", "tsx", entry, "--project-id", "proj_test"], {
      cwd: process.cwd(),
      env: { ...process.env, PORTFOLIO_OPENAI_ADMIN_KEY: "" },
      encoding: "utf8",
      timeout: 10_000,
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Set PORTFOLIO_OPENAI_ADMIN_KEY privately/);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
