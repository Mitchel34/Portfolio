import { useSyncExternalStore } from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function read() {
  return window.matchMedia(MOTION_QUERY).matches;
}

/** True on the server and before hydration, so animations start paused until the preference is known. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, read, () => true);
}
