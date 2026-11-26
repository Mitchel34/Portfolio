export type RateLimitOptions = {
  /** Length of each counting window in milliseconds. */
  windowMs: number;
  /** Requests allowed per key in one window. */
  perKey: number;
  /** Requests allowed across all keys in one window. */
  global: number;
  /** Cap on tracked keys, so a flood of distinct keys cannot grow memory. */
  maxKeys?: number;
};

/** A small per-instance backstop, not a distributed limit across serverless replicas. */
export function createRateLimiter(options: RateLimitOptions, now: () => number = Date.now) {
  const { windowMs, perKey, global: globalLimit, maxKeys = 2_000 } = options;
  const windows = new Map<string, { count: number; reset: number }>();
  return (key: string): boolean => {
    const time = now();
    for (const [entryKey, entry] of windows) if (entry.reset <= time) windows.delete(entryKey);
    if (!windows.has(key) && windows.size >= maxKeys) return false;
    const global = windows.get("__global") ?? { count: 0, reset: time + windowMs };
    const visitor = windows.get(key) ?? { count: 0, reset: time + windowMs };
    if (global.count >= globalLimit || visitor.count >= perKey) return false;
    global.count += 1;
    visitor.count += 1;
    windows.set("__global", global);
    windows.set(key, visitor);
    return true;
  };
}

/** The first forwarded address, as set by the hosting proxy. */
export function visitorKey(request: Request): string {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous";
  return `visitor:${address.slice(0, 128)}`;
}
