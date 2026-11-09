import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";

const MONTHLY_CENTS = 500;

/** Fail closed: an alert or an inactive threshold is not an enforced $5 cap. */
export function verifyChatBudget(value: unknown) {
  const limit = value as { threshold_amount?: number; currency?: string; interval?: string; enforcement?: { status?: string } } | null;
  if (limit?.threshold_amount !== MONTHLY_CENTS || limit.currency !== "USD" || limit.interval !== "month" || limit.enforcement?.status !== "enforcing") {
    throw new Error("OpenAI has not confirmed an enforced $5 USD monthly limit. Do not treat the budget as configured.");
  }
}

export async function configureChatBudget(
  projectId: string,
  adminKey: string,
  verifyOnly = false,
  request: typeof fetch = fetch,
  expectedProjectName = "Portfolio",
) {
  if (!/^proj_[a-zA-Z0-9]+$/.test(projectId)) throw new Error("Provide the expected project ID using --project-id.");
  if (!expectedProjectName.trim() || expectedProjectName.length > 100 || /[\x00-\x1f\x7f]/.test(expectedProjectName)) {
    throw new Error("Provide the exact expected project name using --expected-project-name.");
  }
  if (!adminKey.trim()) throw new Error("Set PORTFOLIO_OPENAI_ADMIN_KEY privately in your terminal; do not put an admin key in .env.local.");
  const url = `https://api.openai.com/v1/organization/projects/${projectId}`;

  async function call(target: string, method = "GET", body?: unknown) {
    const response = await request(target, {
      method,
      redirect: "error",
      signal: AbortSignal.timeout(15_000),
      headers: { Authorization: `Bearer ${adminKey.trim()}`, "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const code = data?.error?.code;
      const safeCode = typeof code === "string" && /^[a-zA-Z0-9_]+$/.test(code) ? ` (${code})` : "";
      throw new Error(`OpenAI admin request returned HTTP ${response.status}${safeCode}. The $5 cap has not been verified.`);
    }
    return response.json();
  }

  const project = await call(url);
  if (project.id !== projectId || (project.name ?? project.title) !== expectedProjectName) {
    throw new Error(`This is not the expected ${expectedProjectName} project. No spending setting was changed.`);
  }
  if (!verifyOnly) await call(`${url}/spend_limit`, "POST", { threshold_amount: MONTHLY_CENTS, currency: "USD", interval: "month" });
  verifyChatBudget(await call(`${url}/spend_limit`));
  return { project: expectedProjectName, projectId, monthlyLimitUsd: 5, enforcement: "enforcing" };
}

function isDirectInvocation() {
  if (!process.argv[1]) return false;
  try { return fileURLToPath(import.meta.url) === realpathSync(process.argv[1]); }
  catch { return false; }
}

if (isDirectInvocation()) {
  const index = process.argv.indexOf("--project-id");
  const nameIndex = process.argv.indexOf("--expected-project-name");
  void configureChatBudget(
    index >= 0 ? process.argv[index + 1] ?? "" : "",
    process.env.PORTFOLIO_OPENAI_ADMIN_KEY ?? "",
    process.argv.includes("--verify-only"),
    fetch,
    nameIndex >= 0 ? process.argv[nameIndex + 1] ?? "" : "Portfolio",
  )
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error: unknown) => {
      // Print only our own sanitized errors; never dump request headers or credentials.
      const message = error instanceof Error ? error.message : "Budget setup failed. The cap is not verified.";
      const secret = process.env.PORTFOLIO_OPENAI_ADMIN_KEY;
      console.error(secret ? message.replaceAll(secret, "[redacted]") : message);
      process.exitCode = 1;
    });
}
