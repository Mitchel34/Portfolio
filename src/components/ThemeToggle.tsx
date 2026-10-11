"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsClient } from "@/lib/useIsClient";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();

  if (!mounted) {
    return <div className="h-11 w-11" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
